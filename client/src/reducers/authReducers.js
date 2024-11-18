const initialState = {
  token: localStorage.getItem("token") || null, // Load token from localStorage if available
  isAuthenticated: localStorage.getItem("token") ? true : false, // Set isAuthenticated based on token presence
  user: null,
  loading: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token); // Save token in localStorage
      return { ...state, token: action.payload.token, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("token"); // Remove token on logout
      return { ...state, token: null, isAuthenticated: false };
    // other cases
    default:
      return state;
  }
}
