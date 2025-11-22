import React from "react";
import { Star, ChevronLeft, ChevronRight, Quote, BookOpen, TrendingUp, Shield } from "lucide-react";

const Testimonials = ({ reviews, currentPage, totalPages, onPageChange }) => {
  const hasReviews = reviews && reviews.length > 0;

  // Story mode content for tech bookstore
  const storyContent = {
    title: "Your Gateway to Tech Knowledge",
    subtitle: "Curated resources for developers, by developers",
    story: "As a developer, I know the struggle of finding quality learning resources. This bookstore was built to solve that problem—bringing together the best tech books across multiple domains, all in one place with a seamless shopping experience.",
    mission: "Whether you're mastering a new framework, diving into AI, or leveling up your system design skills, every book here is carefully selected to help you grow as a developer.",
    features: [
      {
        icon: BookOpen,
        title: "Curated Collection",
        desc: "Only the highest-rated and most relevant tech books make it to our catalog"
      },
      {
        icon: TrendingUp,
        title: "Latest Releases",
        desc: "Stay updated with the newest books on emerging technologies"
      },
      {
        icon: Shield,
        title: "Secure Checkout",
        desc: "Your data is protected with industry-standard security"
      }
    ],
    categories: [
      "Programming Languages",
      "Web Development",
      "Data Science & AI",
      "Cybersecurity & Networking",
      "Cloud & DevOps",
      "Computer Science Fundamentals"
    ]
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Our Story Section - Always Visible */}
        <div className="mb-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-3">
              {storyContent.title}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {storyContent.subtitle}
            </p>
          </div>

          {/* Main Story Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block p-3 bg-primary/10 rounded-lg mb-4">
                  <BookOpen className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Built for Developers</h3>
                <p className="text-lg text-muted leading-relaxed mb-6">
                  {storyContent.story}
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-accent">
                  <p className="text-primary italic">
                    {storyContent.mission}
                  </p>
                </div>
              </div>

              {/* Categories Preview */}
              <div className="bg-primary rounded-xl p-6 text-secondary">
                <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {storyContent.categories.map((category, idx) => (
                    <div 
                      key={idx} 
                      className="bg-secondary/10 backdrop-blur rounded-lg p-3 hover:bg-secondary/20 transition-colors"
                    >
                      <div className="text-sm font-medium">{category}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-secondary/20">
                  <p className="text-sm opacity-70">
                    ...and many more specialized topics
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {storyContent.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="inline-block p-3 bg-primary/10 rounded-lg mb-3">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-primary mb-2 text-lg">{feature.title}</h4>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section - Show if reviews exist */}
        {hasReviews ? (
          <div>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Quote className="h-8 w-8 text-accent rotate-180" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-3">
                What Our Readers Say
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Don't just take our word for it - hear from our community of
                passionate readers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews?.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review?.rating
                            ? "text-accent fill-accent"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-primary italic mb-6 relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-accent/20" />
                    {review?.comment}
                    <Quote className="absolute -bottom-2 -right-2 h-6 w-6 text-accent/20 rotate-180" />
                  </p>

                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 overflow-hidden">
                      {review?.userInfo?.avatar ? (
                        <img
                          src={review?.userInfo?.avatar}
                          alt={review?.userInfo?.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-primary">
                        {review?.userInfo?.fullName}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation and stats */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <button
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="p-2 rounded-full bg-primary/10 text-primary hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    onPageChange(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">10K+</p>
                  <p className="text-sm text-muted">Happy Readers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">98%</p>
                  <p className="text-sm text-muted">Recommend Us</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Call to Action - Show only when no reviews */
          <div className="bg-primary rounded-xl p-8 text-secondary shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Start Your Learning Journey Today</h3>
              <p className="opacity-80 mb-4">Join thousands of developers upgrading their skills</p>
              <button className="bg-accent text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-lg">
                Browse Books
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-12 pt-6 border-t border-secondary/20">
              <div className="text-center">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm opacity-70">Tech Books</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">6</p>
                <p className="text-sm opacity-70">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm opacity-70">Secure</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;