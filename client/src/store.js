import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducers/authreducers";
import { expensesReducer } from "./reducers/expensesReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
