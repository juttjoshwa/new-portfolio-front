import React, { useEffect, useState } from "react";
import Navbar from "../../Nav/navbar";
import "./AdminPage.css";
import { motion as m } from "framer-motion";
import { useSelector } from "react-redux";
import DownArrow from "../../../Asset/down arrow.png";
import BtnSectionAdmin from "./BtnSectionAdmin";
import AdminProjectPage from "./AdminProjectPage";
import MessagesPageAdmin from "./MessagesPageAdmin";
import AdminSkills from "./AdminSkills";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const mode = useSelector((state) => state.modeChange);
  const token = useSelector((state) => state.Authentication);

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

  const [loading, setloading] = useState(true);
  const nevi = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios
          .get("/me", {
            cancelToken: source.token,
          })
          .catch((err) => {
            return nevi("/login");
          });
        // handleSaveData(response.data);
      } catch (error) {
        console.log(error);
        if (axios.isCancel(error)) {
          // Request was canceled
          console.log("Request canceled:", error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cancel the Axios request when the component is unmounted
      source.cancel("Component unmounted");
    };
  }, []); // Include dependencies if needed

  return (
    <m.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, type: "spring" }}
      exit={{ y: 0, opacity: 0 }}
      className="admin-page-section"
      style={darkcolorHero}
    >
      <Navbar />
      <div className="heading-container-admin">
        <m.h1
          initial={{ y: 100, overflow: "hidden", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, damping: 8, type: "spring", delay: 2 }}
          exit={{ y: 0, opacity: 0 }}
          className="text"
          style={headingHero}
        >
          Welcome to admin page
        </m.h1>
      </div>
      <div className="image-container-admin">
        <m.img
          style={YashwaImg}
          src={DownArrow}
          alt="down arrow"
          className="down-arrow-admin"
        />
      </div>
      <BtnSectionAdmin />
      <AdminProjectPage />
      <MessagesPageAdmin />
      <AdminSkills />
    </m.div>
  );
};

export default AdminPage;
