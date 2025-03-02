import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as actions from "../store/actions";
import { useAppDispatch } from "../store/hooks";

function Signout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      actions.signout(() => {
        navigate("/");
      })
    );
  }, [dispatch, navigate]);
  return null;
}

export default Signout;
