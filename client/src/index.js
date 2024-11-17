import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

// Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider>
    <App />
  </Provider>
);

reportWebVitals();
