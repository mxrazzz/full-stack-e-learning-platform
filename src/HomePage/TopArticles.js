// TopArticles.js
import React from "react";
import { useNavigate } from "react-router-dom";

const articles = [
  {
    id: 5,
    title: "Ramadan 2024",
    summary: "An overview of Ramadan, the holy month for the Muslims",
    imageUrl: "/images/ramadan-article.jpg",
  },
  {
    id: 6,
    title: "5 Profound Characteristics of our Prophet ﷺ ",
    summary:
      "Learn about the great character of Muhammad ﷺ & how to implement it in your life",
    imageUrl: "/images/muhammad-article.jpg",
  },
  {
    id: 7,
    title: "Why Islam?",
    summary:
      "Here we will talk about reasons why people choose to embrace Islam and leave behind old lifestyles",
    imageUrl: "/images/why-islam-article.png",
  },
  // Add more articles as needed
];
const TopArticles = () => {
  const navigate = useNavigate();

  const onViewAll = () => {
    navigate("/articles"); // Assuming you have a route set up for "/articles"
  };
  return (
    <div className="bg-[#333333] p-6">
      {" "}
      {/* Dark gray background */}
      <h2 className="text-4xl font-semibold text-white mb-4">Top Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col max-w-sm rounded-md shadow-md overflow-hidden h-full cursor-pointer"
            onClick={() => navigate(`/articles/${article.id}`)} // Navigate to article detail page
          >
            <img
              src={article.imageUrl}
              alt="Article"
              className="object-cover object-center w-full h-48"
            />
            <div className="flex flex-col flex-1 p-4 justify-between bg-[#004080]">
              {" "}
              {/* Adjusted card content background */}
              <h3 className="text-xl font-semibold text-white">
                {article.title}
              </h3>
              <p className="text-white text-opacity-90 mt-2">
                {article.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-4 py-2 px-4 bg-[#004080] text-white font-semibold rounded self-center hover:bg-[#002D62]"
        onClick={onViewAll}
      >
        View All Articles
      </button>
    </div>
  );
};
export default TopArticles;
