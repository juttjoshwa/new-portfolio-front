// Importing React and specific components and hooks from the react-router-dom library.
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// Importing individual page components.
import Home from "../Componets/pages/Home";
import Login from "./pages/Admin/Login.jsx";
import UserPage from "./pages/Admin/UserPage.jsx";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import AdminLoader from "./loader/AdminLoader.js";

// Functional component representing the main routing structure of the application.
const Pager = () => {
  // Accessing the current location using the useLocation hook.
  const location = useLocation();

  // Rendering different components based on the current route using the Routes and Route components.
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/userpage" element={<UserPage />} />
      <Route path="/adminloader" element={<AdminLoader />} />
    </Routes>
  );
};

// Exporting the Pager component as the default export.
export default Pager;
