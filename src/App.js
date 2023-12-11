// Importing React and useEffect for handling side effects.
import React, { useEffect } from "react";

// Importing AnimatePresence from "framer-motion" for managing presence animations.
import { AnimatePresence } from "framer-motion";

// Importing Axios for making HTTP requests and useDispatch for accessing the Redux dispatch function.
import axios from "axios";
import { useDispatch } from "react-redux";

// Importing the Pager component for rendering and displaying paginated content.
import Pager from "./Componets/Pager";

// Importing the saveData action from the Actions directory in the states folder.
import { saveData } from "./states/Actions/Action";

// Configuring Axios defaults for the base URL and allowing credentials.
axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

// Functional component representing the main App.
const App = () => {
  // Accessing the Redux dispatch function.
  const dispatch = useDispatch();

  // Handling the saveData action to update Redux state with fetched data.
  const handleSaveData = (data) => {
    dispatch(saveData(data));
  };

  // useEffect hook to perform asynchronous data fetching when the component mounts.
  useEffect(() => {
    // Creating a cancel token for Axios requests.
    const source = axios.CancelToken.source();

    // Async function to fetch data.
    const fetchData = async () => {
      try {
        // Making a GET request to "/me" endpoint with the provided cancel token.
        const response = await axios.get("/me", {
          cancelToken: source.token,
        });

        // Dispatching the saveData action with the fetched data.
        handleSaveData(response.data);
      } catch (error) {
        console.log(error);
        if (axios.isCancel(error)) {
          // Request was canceled
          console.log("Request canceled:");
        } else {
          console.error(error);
        }
      }
    };

    // Invoking the fetchData function.
    fetchData();

    // Cleanup function to cancel the Axios request when the component is unmounted.
    return () => {
      source.cancel("Component unmounted");
    };
  }, []); // Empty dependency array indicates that this effect runs only on mount and unmount.

  // Returning the main component structure, wrapping the Pager component in AnimatePresence for animations.
  return (
    <>
      <AnimatePresence mode="wait">
        <Pager />
      </AnimatePresence>
    </>
  );
};

// Exporting the App component as the default export.
export default App;
