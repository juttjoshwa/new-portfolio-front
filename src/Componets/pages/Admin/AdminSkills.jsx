import React, { useEffect, useState } from "react";
import "./AdminSkills.css";
import { motion as m } from "framer-motion";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const AdminSkills = () => {
  const mode = useSelector((state) => state.modeChange);
  let darkcolorHero;
  const darkstyleHero = {
    backgroundColor: "rgb(21, 14, 39)",
  };
  if (mode === "dark") {
    darkcolorHero = darkstyleHero;
  }

  let messagecontainer;
  const darkmessagecontainer = {
    backgroundColor: "rgb(36, 21, 21)",
  };
  if (mode === "dark") {
    messagecontainer = darkmessagecontainer;
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

  const [skills, setskills] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // Define an abort controller for canceling the request if needed
    const abortController = new AbortController();
    const fetchData = async () => {
      setloading(true);
      try {
        await axios
          .get("/make/getskills", {
            signal: abortController.signal,
          })
          .then((resulte) => {
            // toast.success("skills ok");
            setskills(resulte.data.AllSkills);
            setloading(false);
            console.log(skills);
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

  const fetchData = async () => {
    setloading(true);
    try {
      await axios
        .get("/make/getskills")
        .then((resulte) => {
          // toast.success("skills ok");
          setskills(resulte.data.AllSkills);
          setloading(false);
          console.log(skills);
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

  const DeleteSkills = async (id) => {
    setloading(true);
    try {
      const res = await axios.delete(`/make/deleteskill?id=${id}`);
      fetchData();
      toast.success("Skill removed successfully");
      setloading(false);
    } catch (error) {
      toast.error(error);
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div style={darkcolorHero} className="admin-skill-page">
      <div className="heading-message-container">
        <h1 style={headingHero}>All skills</h1>
      </div>
      <div style={messagecontainer} className="message-box-container">
        {skills && (
          <div className="message-box">
            {skills.map((msg) => (
              <m.div
                key={msg._id}
                transition={{ duration: 1, type: "spring", damping: 8 }}
                className="card-box"
              >
                {msg.skillName}
                {"       "}
                <m.button
                  onClick={() => DeleteSkills(msg._id)}
                  transition={{ duration: 1, type: "spring", damping: 8 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {loading ? "Loading..." : "Delete message"}
                </m.button>
              </m.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSkills;
