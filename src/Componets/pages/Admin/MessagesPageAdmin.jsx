import React, { useEffect, useState } from "react";
import "./MessagesPageAdmin.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion as m } from "framer-motion";
import toast from "react-hot-toast";

const MessagesPageAdmin = () => {
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



  const [messages, setmessages] = useState("");
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    try {
      setloading(true);
       await axios
        .get("/message/getmessage")
        .then((resulte) => {
          // toast.success("skills ok");
          setmessages(resulte.data.message);
          setloading(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setloading(false);
        });
    } catch (err) {
      if (err.name === "AbortError") {
        toast.error("Request was canceled");
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
         await axios
          .get("/message/getmessage", {
            signal: abortController.signal,
          })
          .then((resulte) => {
            // toast.success("skills ok");
            setmessages(resulte.data.message);

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

  const DeleteMessage = async (id) => {
    try {
      const res = await axios.delete(`/message/delmessage?id=${id}`);
      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.message || "Failed to delete message");
    }
  };

  return (
    <div style={darkcolorHero} className="message-section">
      <div className="heading-message-container">
        <h1 style={headingHero}>All messages from recruiter</h1>
      </div>
      <div style={messagecontainer} className="message-box-container">
        {messages && (
          <div className="message-box">
            {messages.map((msg) => (
              <m.div
                key={msg._id}
                transition={{ duration: 1, type: "spring", damping: 8 }}
                className="card-box"
              >
                <p>User name : {msg.name}</p>
                <p>User Contact : {msg.Contact}</p>
                <p>User Description : {msg.description}</p>
                <m.button
                  onClick={() => DeleteMessage(msg._id)}
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

export default MessagesPageAdmin;
