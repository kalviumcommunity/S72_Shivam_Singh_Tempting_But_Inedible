import React from "react";

const InedibleItem = ({ name, description, imageUrl }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-xs bg-white">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default InedibleItem;
