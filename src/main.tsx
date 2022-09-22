import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";

import { Routing } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </React.StrictMode>
);
