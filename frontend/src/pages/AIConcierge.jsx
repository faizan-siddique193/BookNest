import React, { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";
import Breadcrumb from "../Component/book/booklisting/Breadcrumb";
import BookGrid from "../Component/book/booklisting/BookGrid";

const AIConcierge = () => {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!query.trim()) {
      toast.info("Tell me what kind of books you want.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/ai/concierge", {
        query: query.trim(),
        limit: 8,
      });

      setSummary(response.data?.data?.summary || "");
      setRecommendations(response.data?.data?.recommendations || []);
    } catch (error) {
      toast.error("AI concierge is unavailable right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "AI Concierge", path: "/ai-concierge" },
          ]}
        />

        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-xl">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                AI Book Concierge
              </h1>
              <p className="text-sm text-muted">
                Describe what you want, and I will recommend books.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. beginner-friendly backend JavaScript"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-primary focus:ring-2 focus:ring-accent outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-white font-medium hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching
                </>
              ) : (
                "Get Recommendations"
              )}
            </button>
          </form>

          {summary && (
            <div className="mt-5 rounded-xl bg-accent/10 px-4 py-3 text-sm text-primary">
              {summary}
            </div>
          )}
        </div>

        <div className="mt-8">
          {recommendations.length > 0 ? (
            <BookGrid books={recommendations} viewMode="grid" />
          ) : (
            <div className="text-center text-muted">
              No recommendations yet. Try a new prompt.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIConcierge;
