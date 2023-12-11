// Reducer.js

const AuthenticationReducer = (state = "", action) => {
  switch (action.type) {
    case "SAVE_DATA":
      return {
        ...state,
        savedData: action.payload,
      };
    // other cases...
    default:
      return state;
  }
};

export default AuthenticationReducer;
