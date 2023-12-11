import React from "react";
import "./UserPage.css";
import { motion as m } from "framer-motion";
import { Fragment } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import UserProjects from "./UserProjects";

const UserPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Fragment>
      <div className="container-user-project">
        <div className="nav-btn-user-project">
          <button>
            <Link to="/">
              <FaLongArrowAltLeft className="backarrow" />
            </Link>
          </button>
        </div>
        <div className="section-user-project1">
          <div className="content">
            <div className="main-text-container">
              <h1 className="text-user-project">Hi there !</h1>
              <m.div
                transition={{
                  duration: 7,
                  type: "spring",
                  damping: 6,
                  delay: 0.1,
                }}
                animate={{
                  height: "100%",
                  scale: "1.1",
                  top: isMobile ? "19.5rem" : "11rem",
                }}
                className="bubble-1"
              ></m.div>
              <h3>scroll down</h3>
            </div>
          </div>
        </div>
        <UserProjects />
      </div>
    </Fragment>
  );
};

export default UserPage;
