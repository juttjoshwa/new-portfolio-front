import React, { useEffect, useState } from "react";
import "./UserPage.css";
import { motion as m } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import TEst from "../../../Asset/instagram(4).jpg";
import { useSelector } from "react-redux";

const UserProjects = () => {
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

  let ArrowHero;
  const DarkArrowHero = {
    filter: "invert(100%)",
  };
  if (mode === "dark") {
    ArrowHero = DarkArrowHero;
  }
  const [project, setproject] = useState({});
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    try {
      setloading(true);
      const res = await axios
        .get("/make/getallprojects", {})
        .then((res) => {
          // toast.success("skills ok");
          setproject(res.data.allprojects);
          setloading(false);
        })
        .catch((err) => {
          toast.error(err.message);
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

  useEffect(() => {
    // Define an abort controller for canceling the request if needed
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setloading(true);
        const res = await axios
          .get("/make/getallprojects", {
            signal: abortController.signal,
          })
          .then((res) => {
            // toast.success("skills ok");
            setproject(res.data.allprojects);
            setloading(false);
          })
          .catch((err) => {
            toast("Welcome");
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

    fetchData();

    // Cleanup function
    return () => {
      // Cancel the request when the component is unmounted or dependencies change
      abortController.abort();
    };
  }, []);

  console.log(project);

  return (
    <div className="container-user-projects">
      <h1>Projects</h1>
      <m.div
        initial={{ x: "-12rem" }}
        whileInView={{ x: "0rem" }}
        transition={{ duration: 3, type: "spring", damping: 8 }}
        className="under-line"
      ></m.div>
      <div className="Project-card-section">
        <div className="Project-section-user">
          {project.length > 0 ? (
            <div className="card-section-user card-body">
              {project.map((projectItem) => (
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  key={projectItem._id}
                >
                  <img
                    src={projectItem.images.url}
                    className="card-img-top"
                    alt="image"
                  />
                  <div className="card-body">
                    <h4 className="card-title fs-1">{projectItem.name}</h4>
                    <p className="card-text fs-5">{projectItem.description}</p>
                  </div>

                  <div className="card-body">
                    <a href="#" className="card-link btn btn-primary fs-6">
                      Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <m.div className="no-project-card1">No projects available.</m.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProjects;
