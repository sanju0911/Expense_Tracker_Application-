import axios from "axios";

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );
    const { token, userId } = response.data;
    localStorage.setItem("token", token);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { token, userId },
    });
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
};
