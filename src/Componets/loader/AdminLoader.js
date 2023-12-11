import React, { useEffect, useState } from "react";
import "./Loader.css";
import { motion as m } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLoader = () => {
  const [loading, setloading] = useState(true);
  const nevi = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get("/me", {
          cancelToken: source.token,
        });
        // handleSaveData(response.data);
        if (response) {
          setloading(false);
        }
        if (loading === false) {
          console.log("ok g");
          return nevi("/admin");
        }
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

  useEffect(() => {
    return nevi("/admin");
  }, [loading]);

  return (
    <m.div
      initial={{ translateX: -500, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 100, opacity: 0 }}
      transition={{ duration: 1.5, type: "spring", delay: 0.5 }}
      className="Loader-section"
    >
      <span class="loader"></span>
    </m.div>
  );
};

export default AdminLoader;
