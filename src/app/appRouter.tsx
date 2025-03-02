import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./appRoutes";

export default function appRouter() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
