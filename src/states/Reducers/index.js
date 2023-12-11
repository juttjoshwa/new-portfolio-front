import { combineReducers } from "redux";
import Reducer from "./Reducers";
import ModeReducer from "./ModeReducer";
import Authentication from "./Authentication";

const comiReducer = combineReducers({
  amount: Reducer,
  modeChange: ModeReducer,
  Authentication: Authentication,
});

export default comiReducer;
