import { Book } from "../models/book.model.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const buildSummary = (query, books) => {
  if (!books || books.length === 0) {
    return query
      ? `No strong matches for "${query}" yet. Try a shorter query or a different category.`
      : "No recommendations available yet. Add more books to improve suggestions.";
  }

  if (!query) {
    return "Top picks based on rating and recency.";
  }

  return `Top picks for "${query}" based on title, author, and category matches.`;
};

const generateGeminiSummary = async (query, books) => {
  if (!process.env.GEMINI_API_KEY) {
    return buildSummary(query, books);
  }

  const prompt = [
    "You are a bookstore assistant.",
    "Write a 2-3 sentence summary of why these books match the user query.",
    "Keep it concise and avoid formatting.",
    `Query: ${query || "general recommendations"}`,
    "Books:",
    ...books.map(
      (book, index) =>
        `${index + 1}. ${book.title} by ${book.author} (${book.category})`,
    ),
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 120,
        },
      }),
    },
  );

  if (!response.ok) {
    return buildSummary(query, books);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || buildSummary(query, books);
};

const getBookConcierge = asyncHandler(async (req, res) => {
  const { query, limit } = req.body;
  const search = query?.trim();
  const maxResults = Math.min(Number(limit) || 8, 20);

  const filter = {};
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  const books = await Book.find(filter)
    .sort({ averageRating: -1, createdAt: -1 })
    .limit(maxResults);

  const summary = await generateGeminiSummary(search, books);

  return res.json(
    new ApiResponse(
      200,
      {
        query: search || "",
        recommendations: books,
        summary,
      },
      "AI concierge results",
    ),
  );
});

// Get AI-generated summary for a specific book
const getBookSummary = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  // Find the book by slug
  const book = await Book.findOne({ slug }).lean();

  if (!book) {
    return res.status(404).json(new ApiResponse(404, null, "Book not found"));
  }

  if (!process.env.GEMINI_API_KEY) {
    // Return a fallback summary if no API key is provided
    return res.json(
      new ApiResponse(
        200,
        {
          bookId: book._id,
          title: book.title,
          summary: `${book.title} by ${book.author} is a ${book.category} book. ${book.description ? book.description.substring(0, 150) : "Explore this great read from our collection."}.`,
        },
        "Book summary",
      ),
    );
  }

  // Generate AI summary using Gemini
  const prompt = [
    "You are a book expert. Write a compelling 3-4 sentence summary/description for this book that helps readers understand its value and why they should read it.",
    "Be engaging, informative, and avoid spoilers.",
    "Keep it concise and conversational.",
    "",
    `Book: ${book.title}`,
    `Author: ${book.author}`,
    `Category: ${book.category}`,
    `Description: ${book.description || "No description provided"}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }),
      },
    );

    let summary;
    if (response.ok) {
      const data = await response.json();
      summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    }

    if (!summary) {
      summary = `${book.title} by ${book.author} is a compelling ${book.category} book. ${book.description || "A must-read from our collection."}`;
    }

    return res.json(
      new ApiResponse(
        200,
        {
          bookId: book._id,
          title: book.title,
          author: book.author,
          summary,
        },
        "Book summary generated successfully",
      ),
    );
  } catch (error) {
    console.error("Error generating book summary:", error);
    // Fallback summary on error
    const fallbackSummary = `${book.title} by ${book.author} is a ${book.category} book. ${book.description || "Explore this great read from our collection."}`;
    return res.json(
      new ApiResponse(
        200,
        {
          bookId: book._id,
          title: book.title,
          author: book.author,
          summary: fallbackSummary,
        },
        "Book summary (fallback)",
      ),
    );
  }
});

export { getBookConcierge, getBookSummary };
