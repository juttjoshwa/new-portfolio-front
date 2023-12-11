import React from "react";
import "./footer.css";
import phone from "../../Asset/phone.png";
import insta from "../../Asset/insta.png";
import Up from "../../Asset/up.png";
import { motion as m } from "framer-motion";

const Footer = () => {
  return (
    <div className="foooter-section">
      <div className="number-section-footer">
        <m.button
          initial={{ x: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            damping: 8,
            type: "spring",
          }}
          whileHover={{ scale: 1.16 }}
        >
          <img src={insta} alt="instagram" className="insta" />
        </m.button>
        <button>
          <img src={phone} alt="phone" className="phone" />{" "}
          <span className="number-footer"> : +923096704559</span>
        </button>
        <m.button
          initial={{ y: 0 }}
          transition={{
            duration: 1,
            damping: 7,
            ease: "easeInOut",
            type: "spring",
          }}
          whileHover={{ y: -10 }}
        >
          <a href="#home">
            <img src={Up} alt="Up" className="up-footer" />
          </a>
        </m.button>
      </div>
      <div className="copyright-section-footer">
        <h3>Copyright©2023 ; Designed by Yashwa</h3>
      </div>
    </div>
  );
};

export default Footer;
