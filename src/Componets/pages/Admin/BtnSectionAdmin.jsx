import React, { useState } from "react";
import "./AdminPage.css";
import { motion as m } from "framer-motion";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const BtnSectionAdmin = () => {
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

  const [nameP, setnameP] = useState("");
  const [desp, setdesp] = useState("");
  const [urlp, seturlp] = useState("");
  const [file, setfile] = useState("");
  const [skillname, setskillname] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingSkill, setloadingSkill] = useState(false);

  const HandleSubmitProject = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", nameP);
      formData.append("des", desp);
      formData.append("url", urlp);
      formData.append("fi", file);
      const res = await axios.post("make/makePro", formData);
      toast.success("Project Uploaded successfully");
      setloading(false);
      setnameP("");
      setdesp("");
      seturlp("");
      setfile("");
    } catch (error) {
      toast.error(error.response.data);
      setloading(false);
    }
  };

  const HandleSubmitSkill = async (e) => {
    setloadingSkill(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("skill", skillname);
      const res = await axios.post("/make/makeskill", formData);
      toast.success("Skill added successfully");
      setloadingSkill(false);
      setskillname("");
    } catch (error) {
      toast.error(error.response.data);
      setloadingSkill(false);
    }
  };

  return (
    <div style={darkcolorHero} className="Btn-section-admin">
      <div className="btn-all-container">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            layout: {
              duration: 1,
              type: "spring",
            },
          }}
          layout
          className="btn-container1"
        >
          <m.button whileHover={{ scale: 1.1 }}>Create new project +</m.button>
          <form onSubmit={HandleSubmitProject} encType="multipart/form-data">
            <div className="mb-3">
              <label
                style={headingHero}
                for="exampleInputEmail1"
                className="form-label fw-bold fs-4"
              >
                Project Name
              </label>
              <input
                value={nameP}
                onChange={(e) => {
                  setnameP(e.target.value);
                }}
                required
                type="name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label
                style={headingHero}
                for="exampleInputPassword1"
                className="form-label fw-bold fs-4"
              >
                Description
              </label>
              <textarea
                value={desp}
                onChange={(e) => {
                  setdesp(e.target.value);
                }}
                required
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label style={headingHero} className="form-label fw-bold fs-4">
                Project Url
              </label>
              <input
                value={urlp}
                onChange={(e) => {
                  seturlp(e.target.value);
                }}
                required
                type="text"
                className="form-control"
              />
            </div>
            <div className="input-group mb-3">
              <input
                required
                type="file"
                onChange={(e) => {
                  setfile(e.target.files[0]);
                }}
                className="form-control"
                id="inputGroupFile02"
              />
              <label className="input-group-text " for="inputGroupFile02">
                Upload
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              {loading ? "loading" : "Create new Project"}
            </button>
          </form>
        </m.div>
        <div className="btn-container2">
          <m.button whileHover={{ scale: 1.1 }}>Create new skills +</m.button>
          <form onSubmit={HandleSubmitSkill} encType="multipart/form-data">
            <div className="mb-3">
              <label
                style={headingHero}
                for="exampleInputEmail1"
                className="form-label fw-bold fs-4"
              >
                Skill name
              </label>
              <input
                value={skillname}
                onChange={(e) => {
                  setskillname(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {loadingSkill ? "Loading..." : "Create new skill"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BtnSectionAdmin;
