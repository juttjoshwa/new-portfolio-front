import React, { useRef, useState } from "react";
import "./Contact.css";
import { motion as m, useScroll, useTransform } from "framer-motion";
import Robot from "../../Asset/robot.png";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import axios from "axios";

const Contact = () => {
  var Linked = "https://www.linkedin.com/in/yashwa-shahzad/";
  var git = "https://github.com/juttjoshwa";
  var gmail = "juttjoshwa@gmail.com";
  // var Insta = "https://www.instagram.com/juttjoshwa2019/?hl=en";

  const [copied, setcopied] = useState(false);
  const [name, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [des, setdes] = useState("");
  const [load, setload] = useState(false);

  const CopiedOrNot = () => {
    setcopied(!copied);
  };

  const newTab = (url) => {
    window.open(url);
  };

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

  let inputBack;
  const darkinputBack = {
    backgroundColor: "transparent",
    color: "#fff",
  };
  if (mode === "dark") {
    inputBack = darkinputBack;
  }

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
    type: "spring",
  });
  const scallProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1.1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 4]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        return toast.error("name is required");
      }
      if (!contact) {
        return toast.error("contact is required");
      }
      if (!des) {
        return toast.error("Description is required");
      } 
      setload(true);
      await axios.post("/message/makemessage", {
        name: name,
        contact: contact,
        des: des,
      });
      toast("Thanks dear i'll get back to you", {
        duration: 5000,
      });
      setcontact("");
      setdes("");
      setname("");
      setload(false);
    } catch (error) {
      toast.error(error.message || "something went wrong");
      setload(false);
    }
  };

  return (
    <m.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, type: "spring", damping: 8 }}
      id="contact"
      style={darkcolorHero}
      className="Contact-section"
    >
      <div className="heading-container-contact">
        <m.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", damping: 8, delay: 2 }}
          src={Robot}
          alt="cute-robot"
          className="robot-contact"
        />
        <h1 style={headingHero}>Get in touch</h1>
      </div>
      <div className="both-section-contact">
        <m.div className="from-section-contact">
          <m.form
            onSubmit={HandleSubmit}
            style={{
              scale: scallProgress,
              opacity: opacityProgress,
            }}
            ref={ref}
            encType="multipart/form-data"
          >
            <input
              value={name}
              required
              onChange={(e) => {
                setname(e.target.value);
              }}
              style={inputBack}
              type="text"
              placeholder="Your name"
            />
            <input
              value={contact}
              required
              onChange={(e) => {
                setcontact(e.target.value);
              }}
              style={inputBack}
              type="text"
              placeholder="Your Contact or LinkedIn"
            />
            <textarea
              value={des}
              onChange={(e) => {
                setdes(e.target.value);
              }}
              style={inputBack}
              required
              type="tel"
              placeholder="Lets make something new..."
            />
            <button type="submit">{load ? "Loading" : "Submit..."}</button>
          </m.form>
        </m.div>
        <div className="btn-section-contact">
          <m.button
            initial={{ scale: 1, x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1, type: "spring", damping: 8 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgb(51, 57, 150)",
              color: "white",
            }}
            className="linkedIn-contact"
            onClick={() => newTab(Linked)}
          >
            link
          </m.button>

          <m.button
            initial={{ scale: 1, x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1, type: "spring", damping: 8 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgb(51, 57, 150)",
              color: "white",
            }}
            className="gitHub-contact"
            onClick={() => newTab(git)}
          >
            git
          </m.button>
          <CopyToClipboard text={gmail}>
            <m.button
              initial={{ scale: 1, x: 100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1, type: "spring", damping: 8 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgb(51, 57, 150)",
                color: "white",
              }}
              className="Gmail-contact"
              onClick={CopiedOrNot}
            >
              {copied ? "Copied" : "Gmail"}
            </m.button>
          </CopyToClipboard>
        </div>
      </div>
    </m.div>
  );
};

export default Contact;
