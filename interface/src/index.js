import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Home from "./Home"; // Import your other component files
import HeartDisease from "./HeartDisease";
import ObesityLevel from "./ObesityLevel";
import BreastCancerRecurrence from "./BreastCancerRecurrence";

const rootElement = document.getElementById("root");

const currentPath = window.location.pathname;

let componentToRender;

switch (currentPath) {
  case "/hd.html":
    componentToRender = <HeartDisease />;
    break;
  case "/ob.html":
    componentToRender = <ObesityLevel />;
    break;
  case "/bc.html":
    componentToRender = <BreastCancerRecurrence />;
    break;
  default:
    componentToRender = <Home />;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    {componentToRender}
  </React.StrictMode>,
  rootElement
);
