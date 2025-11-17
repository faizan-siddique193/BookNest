import React from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Globe,
  BrainCircuit,
  ShieldCheck,
  Cloud,
  BookOpenCheck,
} from "lucide-react";
import Breadcrumb from "./book/booklisting/Breadcrumb";


// book Categories
const bookCategories = [
  {
    id: 1,
    slug: "programming-languages",
    name: "Programming Languages",
    icon: Code2,
    description: "Learn popular coding languages and their uses.",
  },
  {
    id: 2,
    slug: "web-development",
    name: "Web Development",
    icon: Globe,
    description: "Frontend, backend, and fullstack web technologies.",
  },
  {
    id: 3,
    slug: "data-science-ai",
    name: "Data Science & AI",
    icon: BrainCircuit,
    description: "Data analysis, ML, and artificial intelligence.",
  },
  {
    id: 4,
    slug: "cybersecurity-networking",
    name: "Cybersecurity & Networking",
    icon: ShieldCheck,
    description: "Protect systems and master secure networking.",
  },
  {
    id: 5,
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    icon: Cloud,
    description: "CI/CD, cloud platforms, and deployment tools.",
  },
  {
    id: 6,
    slug: "computer-science-fundamentals",
    name: "Computer Science Fundamentals",
    icon: BookOpenCheck,
    description: "Core CS concepts, theory, and principles.",
  },
];

const Categories = () => {
  return (
    <section
      id="categories"
      className="  bg-background"
    >
      <div className="text-primary pl-10 pt-4 mb-10">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Books", path: "/books" },
            { label: "categories", path: "#" },
          ]}
        />
      </div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">
            Browse Our Categories
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Discover books organized by your interests. Find your next favorite
            read in our curated collections.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookCategories.map((category) => (
            <Link
              key={category?.id}
              to={`/books/category/${category?.slug}`}
              className="group bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-accent/10 transition-colors">
                  <category.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                </div>
              </div>
              <h3 className="font-semibold text-primary mb-1">
                {category?.name}
              </h3>
              {/* TODO:OPTIONAL */}
              {/* <p className="text-xs text-muted mb-2">{category?.count} titles</p> */}
              <p className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 h-10 transition-opacity">
                {category?.description}
              </p>
            </Link>
          ))}
        </div>

        {/* TODO: View All Button */}
        {/* <div className="text-center mt-10">
          <Link
            to="/categories"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Categories;
