import axios from "axios";
export const fetchExpenses = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get(
      "http://localhost:5000/api/expenses",
      config
    );
    dispatch({ type: "SET_EXPENSES", payload: response.data });
  } catch (error) {
    console.error("Fetching expenses failed:", error);
  }
};
export const addExpense = (expense) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      "http://localhost:5000/api/expenses/add",
      expense,
      config
    );
    dispatch({ type: "ADD_EXPENSE", payload: response.data });
  } catch (error) {
    console.error("Adding expense failed:", error);
  }
};
