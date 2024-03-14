import React from "react";
import "../styles/TopCategories.css";

function TopCategories() {
  // Placeholder data for categories
  const categories = Array.from({ length: 8 }).map((_, index) => ({
    id: index,
    name: `Category ${index + 1}`,
    imageUrl: `https://via.placeholder.com/100`,
  }));

  return (
    <section className="top-categories">
      <h2>Top Categories</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.imageUrl} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopCategories;
