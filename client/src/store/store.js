// src/store/store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/authReducer";
import { expensesReducer } from "./reducers/expensesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
