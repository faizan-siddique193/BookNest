import React from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Book Club Organizer",
      content: "BookNest has completely transformed how my book club discovers new reads. The personalized recommendations are spot-on, and our members love the diverse selection. We've discovered so many gems we would have otherwise missed!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Torres",
      role: "Literature Professor",
      content: "As an academic, I appreciate the depth of BookNest's collection. I regularly find rare scholarly works alongside popular titles. Their packaging is always secure, and books arrive in perfect condition. A true haven for bibliophiles.",
      rating: 4
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Audiobook Listener",
      content: "The audiobook experience on BookNest is exceptional. The app is intuitive, the narration quality is superb, and I love that I can switch seamlessly between reading and listening. Their subscription is the best value I've found.",
      rating: 5
    },
    {
      id: 4,
      name: "David Chen",
      role: "Parent & Educator",
      content: "Finding quality children's books has never been easier. My kids love the colorful recommendations, and I appreciate the educational value ratings. The quick delivery means we never run out of bedtime stories!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Quote className="h-8 w-8 text-accent rotate-180" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-3">What Our Readers Say</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Don't just take our word for it - hear from our community of passionate readers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-accent fill-accent' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <p className="text-primary italic mb-6 relative">
                <Quote className="absolute -top-2 -left-2 h-6 w-6 text-accent/20" />
                {testimonial.content}
                <Quote className="absolute -bottom-2 -right-2 h-6 w-6 text-accent/20 rotate-180" />
              </p>
              
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation and stats */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-accent/20 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-accent/20 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">4.8/5</p>
              <p className="text-sm text-muted">Average Rating</p>
            </div>
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
    </section>
  );
};

export default Testimonials;