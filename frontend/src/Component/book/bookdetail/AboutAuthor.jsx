import React from "react";

const AboutAuthor = ({ book }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/4">
        {/* author image */}
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-square max-w-[200px]" />
      </div>
      <div className="md:w-3/4">
        <h2 className="text-2xl font-bold text-primary mb-4">{book?.author}</h2>
        <div className="prose max-w-none text-primary">
          <p>{book?.authorBio}</p>
          <h3 className="text-xl font-bold mt-6 mb-3">Other Notable Works</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>This Side of Paradise (1920)</li>
            <li>The Beautiful and Damned (1922)</li>
            <li>Tender Is the Night (1934)</li>
            <li>The Last Tycoon (1941, unfinished)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
