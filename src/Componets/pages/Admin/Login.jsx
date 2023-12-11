import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion as m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../states";

const Login = () => {
  const tokken = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreators, dispatch);

  const location = useNavigate();

  useEffect(() => {
    const handletoken = () => {
      if (tokken.savedData) {
        return location("/admin");
      }
    };

    handletoken();
  }, []);

  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/login", { name: name, password: password })
      .then((res) => {
        action.Authentication(res.data);
        return location("/adminloader");
        //  window.location.reload();
      })
      .catch((err) => {
        // toast.error("Name or password is not correct");
        return location("/userpage");
      });
  };
  

  return (
    <m.div
      animate={{ opacity: 1, translateY: 0 }}
      initial={{ opacity: 0, translateY: 100 }}
      exit={{ opacity: 0, translateY: -100 }}
      transition={{ duration: 1, type: "spring", damping: 8 }}
    >
      <div className="Login-section">
        <h1>Quick Page</h1>
        <form onSubmit={HandleSubmit} className="form-Login-section">
          <input
            type="name"
            autoFocus
            className="input-Login-section"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            type="password"
            className="input-Login-section"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <div className="btn-container-Login">
            <button className="btn-section-Login">
              <Link
                to="/userpage"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                View as User
              </Link>
            </button>
            <button type="submit" className="btn-section-Login">
              Admin Page
            </button>
          </div>
        </form>
      </div>
    </m.div>
  );
};

export default Login;
