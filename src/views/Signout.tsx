import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../common/LoaderLoading";

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
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full pt-32">
      <h1>Signing out...</h1>
      <p>Please wait...</p>
      <p>We are signing you out...</p>
      <p>Redirecting you to the home page...</p>
      <p>Thank you for using our service!</p>
      <p>We hope to see you again soon!</p>
      <div className="flex justify-center items-center max-h-6 max-w-32 m-auto">
        <Loading />
      </div>
    </div>
  );
}

export default Signout;
