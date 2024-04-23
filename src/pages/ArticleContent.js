// fetching & displaying article content from Strapi
// using https://docs.strapi.io/dev-docs/api/rest/populate-select
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

// converts rich text into HTML (as data fetched is in rich text)
// AI generated function
const convertRichTextToHTML = (blocks) => {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") {
        return `<p>${block.children.map((child) => child.text).join("")}</p>`;
      }
      // Handle different levels of headings
      else if (block.type === "heading") {
        const level = block.level || 1;
        return `<h${level}>${block.children
          .map((child) => child.text)
          .join("")}</h${level}>`;
      }

      return "";
    })
    .join("");
};
//end of AI generated function

// fetches the article content from Strapi
const ArticleContent = () => {
  const { id } = useParams(); //retrieves article ID from url
  const [article, setArticle] = useState(null); //storing article data

  useEffect(() => {
    const fetchArticleContent = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:1337/api/article-contents/${id}?populate=*`
        );
        //if data exists
        if (data.data) {
          const articleData = {
            title: data.data.attributes.Title,
            content: convertRichTextToHTML(data.data.attributes.Content),
            //AI generated code to fetch image
            imageUrl: data.data.attributes.image.data
              ? `http://localhost:1337${data.data.attributes.image.data.attributes.formats.large.url}`
              : process.env.PUBLIC_URL + "/images/not_found.png",
            //end of AI generated
            author: data.data.attributes.Author,

            published: new Date(
              data.data.attributes.Published
            ).toLocaleDateString(), //formatting the date
            tags: data.data.attributes.Tags
              ? data.data.attributes.Tags.split(", ")
              : [], //splitting tags with a comma
          };
          setArticle(articleData);
        }
      } catch (error) {
        console.error("Failed to fetch article content:", error);
      }
    };

    fetchArticleContent();
  }, [id]);

  //if no article then will just display loading
  if (!article) {
    return <div>Loading...</div>;
  }

  // divs fixed with AI generation
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
          {/* all the tags from the map is displayed with a # attached in front of it */}
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
          __html: DOMPurify.sanitize(article.content), // HTML content is "sanitized" to prevent any malicious attacks
        }}
      />
    </article>
  );
};

export default ArticleContent;
