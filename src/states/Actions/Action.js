export const depositMoney = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "deposit",
      payload: amount,
    });
  };
};

export const withdrawMoney = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "withdraw",
      payload: amount,
    });
  };
};

export const Authentication = (tokken) => {
  return (dispatch) => {
    dispatch({
      type: "tokken",
      payload: tokken,
    });
  };
};

// actions.js

export const saveData = (data) => {
  return {
    type: "SAVE_DATA",
    payload: data,
  };
};

export const DarkmodeChange = (changecolor) => {
  return (dispatch) => {
    dispatch({
      type: "LIGHTMODE",
      payload: changecolor,
    });
  };
};

export const LightmodeChange = (changecolor) => {
  return (dispatch) => {
    dispatch({
      type: "DARKMODE",
      payload: changecolor,
    });
  };
};
