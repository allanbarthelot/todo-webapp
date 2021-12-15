import { combineReducers } from "redux";
import todoReducer from "./todo/reducer";
import userReducer from "./user/reducer";
import listsReducer from "./list/reducer";

const rootReducer = combineReducers({
  todoList: todoReducer,
  lists: listsReducer,
  user: userReducer,
});

export default rootReducer;
