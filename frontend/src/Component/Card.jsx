import React from "react";
import { motion } from 'framer-motion'
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Card = ({ books }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found. Add some books to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {books.map((book) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-4 h-full flex flex-col">
                <h2 className="text-lg font-medium text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{book.auther}</p>
                
                {Number.isInteger(book.publishYear) && (
                  <div className="mt-auto">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {book.publishYear}
                    </span>
                  </div>
                )}

                <div className="flex justify-end space-x-2 mt-3 pt-3 border-t border-gray-100">
                  <Link 
                    to={`/books/details/${book._id}`}
                    className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
                    aria-label="Details"
                  >
                    <IoIosInformationCircleOutline className="text-xl" />
                  </Link>
                  <Link 
                    to={`/books/edit/${book._id}`}
                    className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
                    aria-label="Edit"
                  >
                    <PiPencilSimpleLineLight className="text-xl" />
                  </Link>
                  <Link 
                    to={`/books/delete/${book._id}`}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Delete"
                  >
                    <MdDeleteOutline className="text-xl" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;