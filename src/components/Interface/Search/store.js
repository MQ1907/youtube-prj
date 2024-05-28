import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { searchVideosReducer } from "./videos.reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  searchVideo: searchVideosReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
export default store 