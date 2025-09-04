import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Star, ArrowRight } from "lucide-react";

const LatestBooks = () => {
  const latestBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      publishedDate: "2023-11-15",
      price: 22.99,
      cover:
        "https://m.media-amazon.com/images/I/71Jk3baRVBL._AC_UF1000,1000_QL80_.jpg",
      isNew: true,
    },
    {
      id: 2,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      publishedDate: "2023-10-28",
      price: 25.5,
      cover:
        "https://m.media-amazon.com/images/I/71f3z5lKZoL._AC_UF1000,1000_QL80_.jpg",
      isNew: true,
    },
    {
      id: 3,
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      publishedDate: "2023-09-12",
      price: 18.75,
      cover:
        "https://m.media-amazon.com/images/I/91DfS+2C+YL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 4,
      title: "Beautiful World, Where Are You",
      author: "Sally Rooney",
      publishedDate: "2023-08-05",
      price: 20.99,
      cover:
        "https://m.media-amazon.com/images/I/71g40mlbinL._AC_UF1000,1000_QL80_.jpg",
    },
  ];

  // Format date as "Month Year" (e.g., "Nov 2023")
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="flex items-center text-muted mb-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">FRESHLY ADDED</span>
            </div>
            <h2 className="text-3xl font-bold text-primary">Latest Releases</h2>
          </div>
          <Link
            to="/new-releases"
            className="flex items-center text-primary font-medium mt-4 md:mt-0 hover:text-accent transition-colors group"
          >
            Browse all new arrivals
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestBooks.map((book) => (
            <div key={book.id} className="group relative">
              {/* New Release Badge */}
              {book.isNew && (
                <div className="absolute top-3 right-3 bg-accent text-white text-xs font-medium px-2 py-1 rounded-full z-10">
                  NEW
                </div>
              )}

              {/* Book Cover */}
              <Link to={`/book/${book.id}`} className="block mb-4">
                <div className="relative aspect-[2/3] bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              {/* Book Details */}
              <div className="px-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-primary line-clamp-2 pr-2">
                    {book.title}
                  </h3>
                  <span className="text-sm text-muted whitespace-nowrap mt-0.5">
                    {formatDate(book.publishedDate)}
                  </span>
                </div>
                <p className="text-sm text-muted mb-3">{book.author}</p>

                {/* Rating & Price */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-xs text-muted">4.8</span>
                  </div>
                  <span className="font-medium text-primary">
                    ${book.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/new-releases"
            className="inline-flex items-center px-5 py-2.5 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
          >
            View All New Releases
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;
