import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ar from "javascript-time-ago/locale/ar.json";
import { AppProvider } from "./context/AppContext";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ar);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </ThemeProvider>
      </AuthProvider>{" "}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
