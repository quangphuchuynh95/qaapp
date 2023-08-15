import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { requestLogin } from "./services/account/login.ts";

requestLogin("phuc2", "quangphuc.huynh95.2@gmail.com");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
