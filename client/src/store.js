import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducers";
import { expensesReducer } from "./reducers/expensesReducer"; // Named import for expensesReducer
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk"; // Named import for thunk

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Apply thunk middleware
);

export default store;
