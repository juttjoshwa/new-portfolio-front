// Importing React and ReactDOM libraries for building the application UI.
import React from "react";
import ReactDOM from "react-dom/client";

// Importing the main styling file for the application.
import "./index.css";

// Importing the main App component, BrowserRouter for routing, Provider for Redux state management,
// and the store from the states folder.
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./states/store";

// Importing the Toaster component from "react-hot-toast" for displaying toast notifications.

import { Toaster } from "react-hot-toast";

// Creating a root for rendering the application on the HTML element with the id "root".
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the main application wrapped in the Redux Provider and BrowserRouter for routing,
// with the Toaster component for displaying notifications.
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
