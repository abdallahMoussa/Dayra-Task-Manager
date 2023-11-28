import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ar from "javascript-time-ago/locale/ar.json";
import Providers from "./context/Providers";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ar);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
