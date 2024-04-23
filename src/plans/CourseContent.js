//Fetches course content from Strapi to display

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/notificationSlice";

const CourseContent = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0); //state to manage current page
  const [pages, setPages] = useState([]);
  const { moduleId } = useParams(); //fetching the module id from url, idea from AI
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const returnPath = location.state?.returnPath || "/"; // returns back to previous page after completing course

  //main function, to fetch course content depending on module id
  // extensive testing done through Postman to view content blocks array and how to extract it successfully

  useEffect(() => {
    if (moduleId) {
      axios
        .get(
          `http://localhost:1337/api/contents/${moduleId}?populate[ContentBlocks]=*`
        )
        .then((response) => {
          const contentBlocks =
            response.data.data.attributes.ContentBlocks || []; //extracting array of content blocks from the request,
          let tempPages = []; //storing the pages temporarily
          let currentPageBlocks = []; //storing the content block for the current page

          //check if block is a text block and that it has a heading
          //iterate over array and start a new page whenever we encounter a heading using forEach
          // whenever there is no heading, it will add content to the current page
          // once a heading is detected, a new page is created, and content will be added there
          contentBlocks.forEach((block, index) => {
            if (
              block.__component === "content-blocks.text" &&
              block.content[0]?.type === "heading"
            ) {
              //if it has a heading, start a new page , adding the current block
              if (currentPageBlocks.length) tempPages.push(currentPageBlocks); //pushes current page block
              currentPageBlocks = [block]; //starts a new page with current block
            } else {
              currentPageBlocks.push(block); //if there is no heading, the content will simply be added to current page
            }
          });

          //after iterating through all blocks, any remaining blocks are added as a last page, to the tempPages array
          if (currentPageBlocks.length) tempPages.push(currentPageBlocks);
          setPages(tempPages); //organises all the pages now that tempPages has also been included
        })
        .catch((error) => console.error("Error fetching content:", error));
    }
  }, [moduleId]); // module id is a dependency array: as we can click on different modules, it needs to continuously execute the useEffect to fetch the updated course content

  // AI and Strapi Docs used to debug renderPageContent

  //function to render the content for each page
  //pageBlock is the contentblock stored in each page
  const renderPageContent = (pageBlocks) => {
    return pageBlocks.map((block, index) => {
      switch (block.__component) {
        //for content blocks of type text, it iterates over its content array
        case "content-blocks.text":
          // as it has a nested content structure, we map over it and check its type as either paragraph or heading
          return block.content.map((contentItem, contentIndex) => {
            if (contentItem.type === "paragraph") {
              return (
                // a paragraph will be generated with <p> tags in JSX
                <p key={contentIndex} className="mb-4">
                  {contentItem.children.map((child) => child.text).join("")}
                </p>
              );
            } else if (contentItem.type === "heading") {
              return (
                // a heading will be generated with <h1> tags in JSX
                <h1 key={contentIndex} className="text-2xl font-bold mb-4">
                  {contentItem.children.map((child) => child.text).join("")}
                </h1>
              );
            } else {
              return null;
            }
          });
        // if content block is of type video, we generate an iframe element to embed the video content.
        case "content-blocks.video":
          const embedUrl = block.url.replace("watch?v=", "embed/"); //makes sure to replace url to embed so it can be embedded here
          return (
            <iframe
              key={index}
              src={embedUrl}
              title={`Video ${index}`}
              width="560"
              height="315"
              allowFullScreen
              className="my-4"
            ></iframe>
          );

        default:
          return null;
      }
    });
  };

  //deals with user navigating to the next pges
  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      const newPageIndex = currentPageIndex + 1; //increments the page to move to the next page
      setCurrentPageIndex(newPageIndex);

      // Calculate progress as you move to the next page
      const progress = ((newPageIndex + 1) / pages.length) * 100;
      updateProgress(progress); //function called to update progress on server
    }
  };

  //function to update progress within the module
  const updateProgress = async (progress) => {
    // moduleId is obtained from useParams() at the start of component, thanks to AI figuring out how to obtain this as module is stored in Strapi but progress stored in MongoDB
    try {
      const response = await axios.post(
        "http://localhost:5000/api/progress/update",
        {
          moduleId: moduleId,
          progress: progress,
          completed: progress >= 100,
        },
        { withCredentials: true }
      );

      console.log("Progress update response:", response.data);
    } catch (error) {
      console.error("Progress update error:", error);
    }
  };

  //function called once reaching final page, sets module as complete
  const completeCourse = () => {
    updateProgress(100); // sets progress to 100
    dispatch(
      showNotification({
        //displays notification to user
        message: "Congrats for completing this module, 50XP added!",
      })
    );
    navigate(returnPath); // Redirect user to the the previous page i.e the plan page they started the module on
  };

  //Page Lists and resize feature implemented thanks to AI
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 bg-gray-800 text-white p-4">
        <button
          onClick={() => navigate(returnPath)}
          className="mb-4 px-4 py-2 font-semibold rounded-md bg-blue-500 hover:bg-blue-700 text-white"
        >
          Back to Plan
        </button>
        <h2 className="text-lg font-semibold border-b border-gray-600 pb-2">
          Pages
        </h2>
        <ul>
          {/* maps through the pages to display all the pages */}
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
      <div className="flex flex-1 flex-col">
        <div className="p-4">
          {/* renders current page content */}
          {pages[currentPageIndex] &&
            renderPageContent(pages[currentPageIndex])}
        </div>
        <div className="mt-auto">
          <div className="flex justify-center items-end py-4 space-x-4 mr-8">
            {currentPageIndex > 0 && (
              <button
                onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
                className="px-4 py-2 font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-700"
              >
                Previous
              </button>
            )}
            {/* displays next button unless at final page, which displays complete course */}
            {currentPageIndex < pages.length - 1 ? (
              <button
                onClick={handleNextPage}
                className="px-4 py-2 font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-700"
              >
                Next
              </button>
            ) : currentPageIndex === pages.length - 1 ? (
              <button
                onClick={completeCourse}
                className="px-4 py-2 font-semibold rounded-md text-white bg-green-500 hover:bg-green-700"
              >
                Complete Course
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
