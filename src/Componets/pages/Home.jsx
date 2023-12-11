import React, { useEffect, useState } from "react";
import "./Home.css";
import { motion as m } from "framer-motion";
import Moon from "../../Asset/moon.png";
import Arrow from "../../Asset/down arrow.png";
import Navbar from "../Nav/navbar";
import { useSelector } from "react-redux";
import Skills from "./Skills";
import About from "./About";
import Contact from "./Contact";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, [loading]);

  const mode = useSelector((state) => state.modeChange);
  let darkcolorHero;
  const darkstyleHero = {
    backgroundColor: "rgb(21, 14, 39)",
  };
  if (mode === "dark") {
    darkcolorHero = darkstyleHero;
  }

  let headingHero;
  const darkHeadingHero = {
    color: "rgb(221, 221, 245)",
  };
  if (mode === "dark") {
    headingHero = darkHeadingHero;
  }

  let ArrowHero;
  const DarkArrowHero = {
    filter: "invert(100%)",
  };
  if (mode === "dark") {
    ArrowHero = DarkArrowHero;
  }
  const [mousePosition, setmousePosition] = useState({
    x: null,
    y: null,
  });

  const all_position = (event) => {
    return setmousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", all_position);
    return () => {
      document.removeEventListener("mousemove", all_position);
    };
  });

  let verticalPO = mousePosition.x / 150.55555555555554;
  let horizontalPO = mousePosition.y / 86.85714285714286;
  let result1 = verticalPO;
  let result2 = horizontalPO;
  let roundedResult1 = result1.toFixed(2);
  let roundedResult2 = result2.toFixed(2);

  if (roundedResult1 === 0.0) {
    return (roundedResult1 = -20);
  }
  if (roundedResult2 === 0.0) {
    return (roundedResult2 = -20);
  }

  let pupil_1 = document.getElementsByClassName("pupil-1");
  let pupil_2 = document.getElementsByClassName("pupil-2");
  // console.log(pupil);

  let pupilArr_2 = Array.from(pupil_2);
  pupilArr_2.forEach((currentPosition) => {
    currentPosition.style.transform = `translate(${roundedResult1}px,${roundedResult2}px)`;
  });

  let pupilArr = Array.from(pupil_1);
  pupilArr.forEach((currentPosition) => {
    currentPosition.style.transform = `translate(${roundedResult1}px,${roundedResult2}px)`;
  });

  if (loading === true) {
    return <Loader />;
  } else {
    return (
      <m.div
        initial={{ translateX: 100, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: 100, opacity: 0 }}
        transition={{ duration: 0, type: "spring", delay: 0, damping: 8 }}
      >
        <Navbar />
        <div id="home" style={darkcolorHero} className="Main-home">
          <div className="text-side">
            <div className="text-container mt-5">
              <h1 style={headingHero} className="Sign-main-heading">
                Hi,i'm
              </h1>
              <h3 style={headingHero} className="p-text-area">
                full Stack Web.developer from Lahore,
              </h3>
              <h4 style={headingHero} className="p-text-area">
                {" "}
                To make your web dev.simplified...
              </h4>
              <div className="btn-section mt-5">
                <button>
                  <a
                    style={{
                      listStyle: "none",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    href="#contact"
                  >
                    Hire me
                  </a>
                </button>
                <button>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Recent Projects
                  </Link>
                </button>
              </div>
              <div style={headingHero} className="Scroll-arrow">
                Scroll Down{" "}
                <img
                  src={Arrow}
                  alt="arrow"
                  style={ArrowHero}
                  className="Arrow"
                />
              </div>
            </div>
          </div>
          <div className="image-side">
            <div className="both-image-index">
              <div className="eye-left">
                <div className="pupil-1"></div>
              </div>
              <div className="eye-right">
                <div className="pupil-2"></div>
              </div>
              <img src={Moon} alt="Avatar" className="avatar-image" />
            </div>
          </div>
        </div>
        <About />
        <Skills />
        <Contact />
        <Footer />
      </m.div>
    );
  }
};

export default Home;
