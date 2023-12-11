// Importing React, useEffect, useState, useSelector for managing component state and Redux state.
import React, { useEffect, useState } from "react";

// Importing the motion component from "framer-motion" for animation effects.
import { motion } from "framer-motion";

// Importing axios for making HTTP requests and useSelector for accessing Redux state.
import axios from "axios";
import { useSelector } from "react-redux";

// Importing the main CSS file for the Skills component.
import "./Skills.css";

// Functional component representing the Skills section of the application.
const Skills = () => {
  // State variables for handling loading state and fetched skills data.
  const [loading, setloading] = useState(false);
  const [skills, setSkills] = useState(null);

  // Accessing Redux state for the modeChange value.
  const mode = useSelector((state) => state.modeChange);

  // Conditional styling for dark mode background color.
  let darkcolorHero;
  const darkstyleHero = {
    backgroundColor: "rgb(21, 14, 39)",
  };
  if (mode === "dark") {
    darkcolorHero = darkstyleHero;
  }

  // Conditional styling for dark mode heading color.
  let headingHero;
  const darkHeadingHero = {
    color: "rgb(221, 221, 245)",
  };
  if (mode === "dark") {
    headingHero = darkHeadingHero;
  }

  // useEffect hook for fetching skills data when the component mounts.
  useEffect(() => {
    // Define an abort controller for canceling the request if needed.
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setloading(true);
        // Making a GET request to fetch skills data with the provided cancel token.
        await axios
          .get("http://localhost:4000/api/make/getskills", {
            signal: abortController.signal,
          })
          .then((resulte) => {
            // Setting the fetched skills data and updating loading state.
            setSkills(resulte.data.AllSkills);
            setloading(false);
          })
          .catch((err) => {
            setloading(false);
          });
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled");
        } else {
          console.error(err);
        }
      }
    };

    // Invoking the fetchData function.

    fetchData();

    // Cleanup function to cancel the request when the component is unmounted or dependencies change.
    return () => {
      abortController.abort();
    };
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount.

  // Rendering the Skills component structure.
  return (
    <>
      <div style={darkcolorHero} className="skills-container">
        <div className="heading-container">
          {/* Heading with motion animation and conditional styling for dark mode. */}
          <motion.h3
            transition={{
              duration: 3,
              ease: "circInOut",
              type: "spring",
              damping: 9,
            }}
            whileHover={{ scale: 1.1, cursor: "pointer" }}
            className="Skills"
            style={headingHero}
          >
            Skills
          </motion.h3>
        </div>
        <div className="skills-section">
          <div className="line-section">
            <div className="bracket-section1"></div>
          </div>
          <div className="api-fetching-skill1">
            {skills && (
              // Displaying a loading message or the list of skills based on the loading state.
              <ul className="skillName">
                {skills.map((skill) => (
                  <motion.li
                    transition={{
                      duration: 3,
                      ease: "circInOut",
                      type: "spring",
                      damping: 9,
                    }}
                    whileHover={{ scale: 1.1, cursor: "pointer" }}
                    className="skillName1"
                    style={headingHero}
                    key={skill._id}
                  >
                    {loading ? <div>Loading</div> : <>{skill.skillName}</>}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Exporting the Skills component as the default export.
export default Skills;
