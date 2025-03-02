import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { useNavigate, useLocation } from "react-router-dom";

export default () => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const shouldNavigateAway = () => {
      // if user comes from shipping view
      if (!auth.authenticated && location.pathname.includes("/shipping")) {
        navigate("/signin?redirect=shipping");
      } else if (!auth.authenticated) {
        navigate("/");
      }
    };
    shouldNavigateAway();
  });
};
