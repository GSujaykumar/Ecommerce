import React from "react";

const CategoryCard = ({ title, image }) => {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] cursor-pointer">

      <img
        src={image}
        alt={title}
        className="h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      <div className="absolute bottom-10 left-10">
        <h3 className="text-3xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/80">Shop Now →</p>

      </div>

    </div>
  );
};

export default CategoryCard;  

