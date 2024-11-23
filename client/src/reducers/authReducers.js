const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: null,
  loading: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, token: action.payload.token, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false };

    default:
      return state;
  }
}
