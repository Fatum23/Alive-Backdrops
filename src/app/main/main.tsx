import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div onClick={() => window.ipcRenderer.setTitle("a")}>Hello</div>
  </React.StrictMode>
);
