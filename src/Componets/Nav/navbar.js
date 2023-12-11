import React, { Fragment } from "react";
import "./Nav.css";
import lightImg from "../../Asset/Light.png";
import darkImg from "../../Asset/dark.png";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../states";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const mode = useSelector((state) => state.modeChange);
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreators, dispatch);
  const modeChanger = () => {
    if (mode === "light") {
      action.DarkmodeChange("dark");
    } else {
      action.LightmodeChange("light");
    }
  };

  let navbarbackColor;
  const navbarbackstyle = {
    backgroundColor: "rgb(21, 14, 39)",
  };
  if (mode === "dark") {
    navbarbackColor = navbarbackstyle;
  }

  let navbarBrand = {
    fontSize: "2.5rem",
    fontFamily: "Rancho",
    color: "rgb(53, 52, 52)",
  };
  const darknavbarBrand = {
    fontSize: "2.5rem",
    fontFamily: "Rancho",
    color: "rgb(221, 221, 245)",
  };
  if (mode === "dark") {
    navbarBrand = darknavbarBrand;
  }
  let navbarAchoreStyle = {
    fontSize: "1rem",
    fontFamily: "sans-serif",
    color: "black",
    fontWeight: "bold",
  };
  const darknavbarAchorestyle = {
    fontSize: "1rem",
    fontFamily: "sans-serif",
    color: "rgb(221, 221, 245)",
    fontWeight: "bold",
  };
  if (mode === "dark") {
    navbarAchoreStyle = darknavbarAchorestyle;
  }
  let toggleButton;
  const DarkToggleButton = {
    color: "rgb(221, 221, 245)",
  };
  if (mode === "dark") {
    toggleButton = DarkToggleButton;
  }
  let headingHero;
  const darkHeadingHero = {
    color: "rgb(221, 221, 245)",
  };
  if (mode === "dark") {
    headingHero = darkHeadingHero;
  }
  return (
    <Fragment>
      <nav
        style={navbarbackColor}
        className="navbar navbar-expand-lg nav-container"
      >
        <div className="container-fluid">
          <Link
            style={headingHero}
            className="navbar-brand fw-light fs-1"
            to="/"
          >
            Yashwa
          </Link>
          <button
            style={toggleButton}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  style={navbarAchoreStyle}
                  className="nav-link navLink fw-light fontsNav"
                  aria-current="page"
                  href="#about"
                >
                  <p style={headingHero} className="fontsNav">
                    About me
                  </p>
                </a>
              </li>

              <li className="nav-item">
                <a
                  style={navbarAchoreStyle}
                  className="nav-link fw-light"
                  href="#contact"
                >
                  <p style={headingHero} className="fontsNav">
                    Hire me
                  </p>
                </a>
              </li>
              <li className="nav-item">
                <div className="dark-mode-switch">
                  <motion.img
                    className="Nav-Mode-img"
                    onClick={modeChanger}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 2, type: "spring" }}
                    src={mode === "dark" ? lightImg : darkImg}
                    alt="mode"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
