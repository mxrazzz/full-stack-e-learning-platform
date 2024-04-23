// Fetching and displaying all articles from Strapi
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]); //storing articles that are fetched
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // API will fetch all info with populate=* and destructuring it inside 'data'
        const { data } = await axios.get(
          "http://localhost:1337/api/articles?populate=*"
        );
        //storing articles inside map with all necessary details
        //AI helped debug and gave solution on how to successfully store it using a map
        const formattedArticles = data.data.map((article) => ({
          id: article.id,
          title: article.attributes.Title,
          summary: article.attributes.Summary,
          // used AI to fetch images from Strapi
          imageUrl: article.attributes.Image.data
            ? `http://localhost:1337${article.attributes.Image.data.attributes.url}`
            : process.env.PUBLIC_URL + "/images/not_found.png", // Use a default image from the public folder
        }));
        setArticles(formattedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // Used mixture of my own work and AI to smoothen overall layout
  return (
    <div className="bg-[#333333] p-6">
      <h2 className="text-4xl font-semibold text-white mb-4">All Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col max-w-md rounded-md shadow-md overflow-hidden h-full cursor-pointer"
            onClick={() => navigate(`/articles/${article.id}`)} //navigate to the article user clicked
          >
            <img
              src={article.imageUrl}
              alt="Article"
              className="object-cover object-center w-full h-48"
            />
            <div className="flex flex-col flex-1 p-4 justify-between bg-[#004080]">
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
    </div>
  );
};

export default Articles;
