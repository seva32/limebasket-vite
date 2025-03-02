import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app";

import "./styles.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
