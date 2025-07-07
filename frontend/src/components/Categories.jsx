import React from "react";
import { categories } from "../assets/assets"; // Assuming you already have categories in your assets
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center hover:shadow-lg transition"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/category/${category.text.toLowerCase()}`);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-110 transition duration-300 max-w-28"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
