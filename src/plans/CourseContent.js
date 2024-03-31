import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import DOMPurify from "dompurify";

const CourseContent = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pages, setPages] = useState([]);
  const { moduleId } = useParams();

  useEffect(() => {
    if (moduleId) {
      axios
        .get(
          `http://localhost:1337/api/contents/${moduleId}?populate[ContentBlocks]=*`
        )
        .then((response) => {
          const contentBlocks =
            response.data.data.attributes.ContentBlocks || [];
          let tempPages = [];
          let currentPageBlocks = [];

          contentBlocks.forEach((block, index) => {
            // Assuming that a 'text' block with a 'heading' type indicates a new page
            if (
              block.__component === "content-blocks.text" &&
              block.content[0]?.type === "heading"
            ) {
              if (currentPageBlocks.length) tempPages.push(currentPageBlocks);
              currentPageBlocks = [block];
            } else {
              currentPageBlocks.push(block);
            }
          });

          if (currentPageBlocks.length) tempPages.push(currentPageBlocks);
          setPages(tempPages);
        })
        .catch((error) => console.error("Error fetching content:", error));
    }
  }, [moduleId]);

  const renderPageContent = (pageBlocks) => {
    return pageBlocks.map((block, index) => {
      switch (block.__component) {
        case "content-blocks.text":
          // Since the text block has a nested content structure, we map over it to render paragraphs and headings.
          return block.content.map((contentItem, contentIndex) => {
            if (contentItem.type === "paragraph") {
              return (
                <p key={contentIndex} className="mb-4">
                  {contentItem.children.map((child) => child.text).join("")}
                </p>
              );
            } else if (contentItem.type === "heading") {
              return (
                <h1 key={contentIndex} className="text-2xl font-bold mb-4">
                  {contentItem.children.map((child) => child.text).join("")}
                </h1>
              );
            } else {
              return null; // Other types can be added as needed
            }
          });

        case "content-blocks.video":
          // Make sure your video URL is an embeddable URL.
          const embedUrl = block.url.replace("watch?v=", "embed/");
          return (
            <iframe
              key={index}
              src={embedUrl}
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen
              className="my-4"
            ></iframe>
          );

        default:
          return null; // Handle any other types as needed
      }
    });
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-semibold border-b border-gray-600 pb-2">
          Pages
        </h2>
        <ul>
          {pages.map((_, index) => (
            <li
              key={index}
              className={`p-2 hover:bg-gray-700 cursor-pointer ${
                index === currentPageIndex ? "bg-gray-600" : ""
              }`}
              onClick={() => setCurrentPageIndex(index)}
            >
              Page {index + 1}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        {pages[currentPageIndex] && renderPageContent(pages[currentPageIndex])}
      </div>
      <div className="flex-1 flex justify-center items-end py-4">
        {currentPageIndex > 0 && (
          <button
            onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
            className="px-6 py-2 font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-700 mr-4"
          >
            Previous
          </button>
        )}
        {currentPageIndex < pages.length - 1 && (
          <button
            onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
            className="px-6 py-2 font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-700 mr-4"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
