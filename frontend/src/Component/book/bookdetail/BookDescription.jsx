import React from "react";

const BookDescription = ({description}) => {
  return (
    <div className="prose max-w-none text-primary">
      <p>{description}</p>
      <h3 className="text-xl font-bold mt-6 mb-3">Key Features</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Considered the definitive novel of the Jazz Age</li>
        <li>Explores themes of idealism, decadence, and the American Dream</li>
        <li>Features some of Fitzgerald's most elegant and evocative prose</li>
        <li>
          Iconic characters that have become archetypes in American literature
        </li>
      </ul>
    </div>
  );
};

export default BookDescription;
