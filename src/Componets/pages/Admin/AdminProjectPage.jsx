import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import "./AdminPage.css";
import { motion as m } from "framer-motion";

const AdminProjectPage = () => {
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

    fetchData();

    // Cleanup function
    return () => {
      // Cancel the request when the component is unmounted or dependencies change
      abortController.abort();
    };
  }, []);

  const DeleteProject = async (id, dew) => {
    try {
      const res = await axios.delete(`/make/deleteproject?id=${id}&dew=${dew}`);
      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.message || "Failed to delete message");
    }
  };

  return (
    <div style={darkcolorHero} className="Project-section-admin">
      {project.length > 0 ? (
        <div className="card-section-admin">
          {project.map((projectItem) => (
            <div
              key={projectItem._id}
              className="card"
              style={{
                width: "33rem",
                marginLeft: "3rem",
                marginRight: "3rem",
              }}
            >
              {/* Replace the following placeholders with the actual data from your projectItem */}
              <m.img
                transition={{ duration: 1, type: "spring", damping: 8 }}
                whileHover={{ scale: 1.1 }}
                src={projectItem.images.url}
                className="card-img-top"
                alt="Project"
              />
              <div className="card-body">
                <h3 className="card-title">{projectItem.name}</h3>
                <p className="card-text">{projectItem.description}</p>
                <m.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1, type: "spring", damping: 8 }}
                  onClick={() => window.open(projectItem.Url, "_blank")}
                  className="btn btn-primary"
                >
                  Lets see website
                </m.button>
                <m.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() =>
                    DeleteProject(projectItem._id, projectItem.images.url)
                  }
                  transition={{ duration: 1, type: "spring", damping: 8 }}
                  className="btn btn-danger"
                >
                  Delete Project
                </m.button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <m.div  className="no-project-card">
          No projects available.
        </m.div>
      )}
    </div>
  );
};

export default AdminProjectPage;
