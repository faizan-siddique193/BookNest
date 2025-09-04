import React from "react";

const ReviewsList = ({ reviews }) => {
  return (
    <div className="md:col-span-2">
      <div id="reviews" className="space-y-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex items-center mb-3">
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 mr-3" />
              <div>
                <h4 className="font-medium text-primary">{rev.name}</h4>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rev.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">{rev.date}</span>
                </div>
              </div>
            </div>
            <p className="text-primary">{rev.comment}</p>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-primary mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-primary mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReview({ ...review, rating: star })}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-primary mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              value={review.name}
              onChange={(e) => setReview({ ...review, name: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-primary mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsList;
