import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

const convertRichTextToHTML = (blocks) => {
  return blocks
    .map((block) => {
      // Handle paragraphs
      if (block.type === "paragraph") {
        return `<p>${block.children.map((child) => child.text).join("")}</p>`;
      }
      // Handle different levels of headings
      else if (block.type === "heading") {
        const level = block.level || 1; // Assuming there's a level field; adjust as needed
        return `<h${level}>${block.children
          .map((child) => child.text)
          .join("")}</h${level}>`;
      }
      // You can add more conditions here for other types of blocks
      return "";
    })
    .join("");
};

const ArticleContent = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:1337/api/article-contents/${id}?populate=*`
        );
        if (data.data) {
          const articleData = {
            title: data.data.attributes.Title,
            content: convertRichTextToHTML(data.data.attributes.Content),
            imageUrl: data.data.attributes.image.data
              ? `http://localhost:1337${data.data.attributes.image.data.attributes.formats.large.url}`
              : process.env.PUBLIC_URL + "/images/not_found.png",
            author: data.data.attributes.Author,
            published: new Date(
              data.data.attributes.Published
            ).toLocaleDateString(),
            tags: data.data.attributes.Tags
              ? data.data.attributes.Tags.split(", ")
              : [],
          };
          setArticle(articleData);
        }
      } catch (error) {
        console.error("Failed to fetch article content:", error);
      }
    };

    fetchArticleContent();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <article className="max-w-2xl px-6 py-24 mx-auto space-y-16 dark:bg-gray-100 dark:text-gray-900">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt="Header"
          className="w-full h-96 object-cover"
        />
      )}
      <div className="w-full mx-auto space-y-4">
        <h1 className="text-5xl font-bold leading-none">{article.title}</h1>
        <div className="flex flex-wrap space-x-2 text-sm dark:text-gray-600">
          {article.tags.map((tag) => (
            <span key={tag} className="p-1 ">
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-sm dark:text-gray-600">
          by <span className="">{article.author}</span> on
          <time dateTime={article.published}> {article.published}</time>
        </p>
      </div>
      <div
        className="dark:text-gray-800"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(article.content),
        }}
      />
    </article>
  );
};

export default ArticleContent;
