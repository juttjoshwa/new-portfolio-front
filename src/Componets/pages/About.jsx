import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./About.css";
import Hello from "../../Asset/pngegg.png";
import Cute from "../../Asset/smile.png";
import { useSelector } from "react-redux";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const imageSize = isMobile
    ? { width: "80px", height: "80px" }
    : { width: "70px", height: "70px" };
  console.log(isMobile);
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
  let YashwaImg;
  const DarkYashwaImg = {
    filter: "invert(80%)",
  };
  if (mode === "dark") {
    YashwaImg = DarkYashwaImg;
  }
  let t_section_about;
  const dark_t_section_about = {
    backgroundImage: "radial-gradient(circle, #fff 2px, transparent 2px)",
    backgroundSize: "20px 20px",
  };
  if (mode === "dark") {
    t_section_about = dark_t_section_about;
  }

  let ArrowHero;
  const DarkArrowHero = {
    filter: "invert(100%)",
  };
  if (mode === "dark") {
    ArrowHero = DarkArrowHero;
  }

  let mebtn;
  const DarkMebtn = {
    color: "rgb(51,57,150)",
  };
  if (mode === "dark") {
    mebtn = DarkMebtn;
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
    type: "spring",
  });
  const scallProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 1]);

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

  let pupil_1 = document.getElementsByClassName("b-section-about");
  let pupil_2 = document.getElementsByClassName("b-section-about");
  // console.log(pupil);

  let pupilArr_2 = Array.from(pupil_2);
  pupilArr_2.forEach((currentPosition) => {
    currentPosition.style.transform = `translate(${roundedResult1}px,${roundedResult2}px)`;
  });

  let pupilArr = Array.from(pupil_1);
  pupilArr.forEach((currentPosition) => {
    currentPosition.style.transform = `translate(${roundedResult1}px,${roundedResult2}px)`;
  });

  return (
    <div id="about" style={darkcolorHero} className="About-Main">
      <motion.div className="heading-container-about">
        <motion.img
          className="cute-hello"
          initial={{ y: 100, x: -10, opacity: 0, width: 0, height: 0 }}
          transition={{ duration: 2, damping: 8, type: "spring", delay: 2 }}
          whileInView={{
            y: 0,
            x: 0,
            opacity: 1,
            width: isMobile ? "45px" : "70px",
            height: isMobile ? "45px" : "70px",
          }}
          exit={{ opacity: 0, width: 0, height: 0 }}
          style={ArrowHero}
          src={Hello}
          alt="Hii-message"
          viewport={{ once: false }}
        />

        <motion.img
          initial={{
            opacity: 0.2,
            translateY: 50,
            translateX: 7,
            width: isMobile ? "60px" : "80px",
            height: isMobile ? "60px" : "80px",
          }}
          viewport={{ once: false }}
          whileInView={{
            opacity: 1,
            translateY: 10,
            width: isMobile ? "50px" : "70px",
            height: isMobile ? "50px" : "70px",
          }}
          transition={{ duration: 1, type: "spring", damping: 8 }}
          src={Cute}
          alt="cute"
          className="cute"
        />

        <h1 style={headingHero}>
          About{" "}
          <span style={mebtn} className="About-me-cute">
            Me
          </span>
        </h1>
      </motion.div>
      <div className="text-section-about">
        <motion.div
          style={{
            scale: scallProgress,
            opacity: opacityProgress,
          }}
          ref={ref}
          className="t-section-about"
        >
          <p className="text-paragraph">
            With a dynamic two-year journey in the MERN stack, I'm Yashwa, a
            results-driven developer. Proficient in MongoDB, Express.js, React,
            and Node.js, I specialize in crafting end-to-end web applications.
            My expertise lies in creating seamless user experiences, robust
            APIs, and scalable solutions. From e-commerce to content management,
            I've navigated diverse projects, honing my problem-solving skills.
            My commitment to staying current ensures cutting-edge, future-proof
            solutions. Let's connect and explore how my passion and skills can
            elevate your projects. 🌐💻 #MERNStack #WebDevelopment #Innovation
          </p>
        </motion.div>
        <div style={t_section_about} className="b-section-about"></div>
        {/* <div className="b-section-about1"></div> */}
      </div>
    </div>
  );
};

export default About;
