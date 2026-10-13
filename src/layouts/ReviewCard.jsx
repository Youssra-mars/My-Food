import React from "react";

const ReviewCard = ({ img, name }) => {
  return (
    <div className="w-full md:w-1/3 bg-white border-2 border-gray-100 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
      {/* Image + Name */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={img}
          alt={name}
          className="w-24 h-24 object-cover rounded-full border-4 border-[#F4511F] mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>

      {/* Review text */}
      <p className="text-gray-600 text-sm leading-relaxed">
        My Food never disappoints. The menu has so many tasty options, and everything is made with care. Great place for both dine-in and takeout!
      </p>
    </div>
  );
};

export default ReviewCard;
