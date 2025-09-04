import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-5">
              <Book className="h-8 w-8 text-accent mr-2" />
              <h2 className="text-2xl font-bold">BookNest</h2>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your ultimate destination for discovering, exploring, and purchasing books from around the world. 
              We bring stories to life and connect readers with their next favorite book.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">Stay Updated</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-l-lg bg-primary-light border border-gray-600 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-r-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5 border-b border-gray-700 pb-2">Explore</h3>
            <ul className="space-y-3">
              {['Home', 'Books', 'Bestsellers', 'New Releases', 'Deals', 'Categories'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-5 border-b border-gray-700 pb-2">Support</h3>
            <ul className="space-y-3">
              {['Contact Us', 'FAQ', 'Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-5 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">123 Book Street, Literary District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-accent mr-3" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-accent mr-3" />
                <span className="text-gray-300">support@booknest.com</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                  { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                  { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                  { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="bg-primary-light hover:bg-accent p-2 rounded-full transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 bg-primary-light rounded-lg">
              <Truck className="h-10 w-10 text-accent mb-3" />
              <h4 className="font-medium mb-1">Free Shipping</h4>
              <p className="text-sm text-gray-300">On orders over $50</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-primary-light rounded-lg">
              <Shield className="h-10 w-10 text-accent mb-3" />
              <h4 className="font-medium mb-1">Secure Payment</h4>
              <p className="text-sm text-gray-300">100% protected</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-primary-light rounded-lg">
              <CreditCard className="h-10 w-10 text-accent mb-3" />
              <h4 className="font-medium mb-1">Easy Returns</h4>
              <p className="text-sm text-gray-300">30-day guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-primary-dark py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-400 mr-4">We accept:</span>
              <div className="inline-flex space-x-3">
                {['visa', 'mastercard', 'amex', 'paypal', 'applepay'].map((method) => (
                  <div 
                    key={method} 
                    className="bg-white w-12 h-8 rounded-md flex items-center justify-center"
                  >
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-5" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-6">
              <Link to="#" className="text-gray-400 hover:text-accent text-sm">Privacy Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-accent text-sm">Terms of Service</Link>
              <Link to="#" className="text-gray-400 hover:text-accent text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-primary-darker py-4 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} BookNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;