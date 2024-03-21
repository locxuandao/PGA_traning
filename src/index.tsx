import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
// Use consistent styling
import "sanitize.css/sanitize.css";
// Initialize languages

import { App } from "app";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
