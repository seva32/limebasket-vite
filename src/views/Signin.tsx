/* eslint-disable max-len */
/* eslint-disable indent */
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../store/hooks";
import {
  AUTH_ERROR_SIGNIN,
  AUTH_ERROR_SIGNUP,
} from "../store/actions/auth/authActionTypes";

import * as actions from "../store/actions";
import { Policies, Navbar, Button, Head, Alert } from "../common";
import { GoogleLogin } from "../common/GoogleButton/index.jsx";

const clientId = process.env["VITE_GOOGLE_CLIENT_ID"];

function Signin() {
  const [showButton, toggleShow] = React.useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { authenticated, errorMessageSignIn } = auth;

  React.useEffect(() => {
    if (errorMessageSignIn) {
      dispatch({ type: AUTH_ERROR_SIGNIN, payload: "" });
      dispatch({ type: AUTH_ERROR_SIGNUP, payload: "" });
    }
  }, []);

  // prettier-disable
  const renderGoogleAuth = () =>
    ((showButton || errorMessageSignIn) && (
      <GoogleLogin
        onSuccess={(res: {
          googleId: string;
          profileObj: { email: string };
        }) => {
          if (res.googleId && res.profileObj) {
            toggleShow(false);
            dispatch(
              actions.signin(
                {
                  email: res.profileObj.email,
                  password: res.googleId,
                },
                () => {
                  const redirect = location.search
                    ? location.search.split("=")[1]
                    : "/";
                  if (redirect) {
                    navigate(redirect);
                  } else {
                    navigate("/");
                  }
                }
              )
            );
          }
        }}
        onFailure={() => (
          <Alert title="Failed!" content="Try again or use another method" />
        )}
        clientId={clientId || ""}
      >
        Google
      </GoogleLogin>
    )) ||
    null;

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address"),
      // .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(2, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values, { setStatus, resetForm }) => {
      dispatch(
        actions.signin(values, (result) => {
          resetForm();
          if (!result) {
            setStatus({
              success: false,
            });
            return;
          }
          setStatus({
            success: true,
          });
          const redirect = location.search
            ? location.search.split("=")[1]
            : "/";
          if (redirect) {
            navigate(redirect);
          } else {
            navigate("/");
          }
        })
      );
    },
  });

  return (
    <>
      <Head title="Lime Basket | Signin" />

      <div className="relative mb-24r z-0">
        {/* header */}
        <div className="min-h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full z-0">
          <div className="flex-none relative w-full">
            <Policies textColor="space" />
          </div>
          <hr className="text-space w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10">
            <Navbar
              logged={!!authenticated}
              showSearchModal={false}
              clearModal={() => undefined}
              dark
            />
          </div>
          <div className="flex-none relative w-full text-center block">
            <h1 className="pt-12 text-space whitespace-no-wrap">join us</h1>
          </div>

          {/* forms */}
          <div className="w-full flex flex-no-wrap flex-col md:flex-row justify-center items-center text-space">
            {/* signin */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-white rounded-lg shadow-md md:mr-2 px-4 py-8">
              <div className="w-full font-subtitle-semibold pb-10">
                Returning customers
              </div>
              {errorMessageSignIn && (
                <Alert
                  title="Failed!"
                  content={`You couldnt signin. ${errorMessageSignIn}`}
                  bell
                />
              )}
              <form onSubmit={formik.handleSubmit} className="w-full font-body">
                <div className="w-full flex h-40p bg-honeydew justify-center items-center mb-10">
                  <label className="flex items-center w-full" htmlFor="email">
                    <span className="w-1/2 inline-block pl-12">Email</span>
                    <input
                      className="w-1/2 h-30p mr-2 rounded-md shadow px-4"
                      placeholder="Email"
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </label>
                </div>

                {formik.touched.email && formik.errors.email ? (
                  <Alert
                    title="Invalid input!"
                    content={formik.errors.email}
                    exclamation
                  />
                ) : null}

                <div className="w-full flex h-40p bg-honeydew justify-center items-center mb-5">
                  <label
                    className="flex items-center w-full"
                    htmlFor="password"
                  >
                    <span className="w-1/2 inline-block pl-12">Password</span>
                    <input
                      type="password"
                      className="w-1/2 h-30p mr-2 rounded-md shadow px-4"
                      placeholder="Password"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </label>
                </div>

                {formik.touched.password && formik.errors.password ? (
                  <Alert
                    title="Invalid input!"
                    content={formik.errors.password}
                    exclamation
                  />
                ) : null}

                <div className="mb-5">
                  <label htmlFor="customCheckLogin" className="">
                    <input id="customCheckLogin" type="checkbox" className="" />
                    <span className="pl-2">Remember me</span>
                  </label>
                </div>

                <div className="mb-10">
                  <Button size="md" padding="p-0" submit noArrow>
                    <div className="font-button">Sign In</div>
                  </Button>
                </div>
              </form>
              <div className="mb-10 font-body">or</div>
              <div className="relative z-0 w-full">
                <div className="absolute w-full z-40 opacity-0">
                  {renderGoogleAuth()}
                </div>
                <div className="relative w-full z-0">
                  <Button noArrow padding="p-0" size="md">
                    <img
                      src="https://res.cloudinary.com/seva32/image/upload/v1606387514/GoogleIcon_dprpob.svg"
                      alt="sign with google"
                      height="24"
                      width="24"
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* signup */}
            <div className="w-1/2 md:self-start flex flex-col items-center bg-white rounded-lg shadow-md md:ml-2 px-4 py-8">
              <div className="w-full font-subtitle-semibold pb-10">
                New customers
              </div>
              <p className="font-body mb-10">
                Create a new Lime Basket account now to start earning points on
                all online purchases and to complete booking your pet’s
                services.
              </p>
              <div className="w-full">
                <Link to="/signup">
                  <Button noArrow padding="p-0" size="md">
                    <span className="font-button">Create new account</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-20">
            <Link to="/reset-password" className="">
              <small className="font-small text-space">Forgot password?</small>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
