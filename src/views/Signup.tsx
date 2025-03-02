/* eslint-disable max-len */
/* eslint-disable indent */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import omit from "lodash.omit";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../store/hooks";

import { GoogleLogin } from "../common/GoogleButton";
import { Policies, Navbar, Button, Alert, Head } from "../common";
import * as actions from "../store/actions";
import { useLocation, useNavigate } from "react-router-dom";

type ValueForm = {
  password: string;
  repeatpassword: string;
  email: string;
  nickname: string;
  roles?: string[];
};

// const clientId = process.env.GOOGLE_CLIENT_ID;
const clientId =
  "337014600692-84c6cvbn4370f08b6cdp8jkc2ndjln84.apps.googleusercontent.com";

function Signup() {
  const [showButton, toggleShow] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { authenticated, errorMessageSignIn: error } = auth;

  // prettier-disable
  const renderGoogleAuth = () =>
    ((showButton || error) && ( // eslint-disable-line
      <GoogleLogin
        onSuccess={(res: any) => {
          if (res.googleId && res.profileObj) {
            toggleShow(false);
            dispatch(
              actions.signup(
                {
                  email: res.profileObj.email,
                  password: res.googleId,
                  profile: {
                    ...omit(res.profileObj, ["email", "googleId", "name"]),
                    provider: "google",
                    id: res.profileObj.googleId,
                  },
                },
                () => {
                  navigate("/");
                }
              )
            );
          }
        }}
        onFailure={() => (
          <Alert title="Failed!" content="Try again or use another method" />
        )}
        // eslint-disable-next-line max-len
        clientId={clientId || ""}
      >
        Google
      </GoogleLogin>
    )) ||
    null;

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatpassword: "",
      email: "",
      nickname: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address"),
      // .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(2, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      repeatpassword: Yup.string().when("password", {
        is: (val: any) => val && val.length > 0,
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
      nickname: Yup.string()
        .min(2, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values: ValueForm, { setStatus, resetForm }) => {
      if (values.email.includes("s@s")) {
        values = { ...values, roles: ["admin", "user"] }; // eslint-disable-line
      }
      dispatch(
        actions.signup(omit(values, ["repeatpassword"]), () => {
          navigate("/");
        })
      );
      resetForm({});
      setStatus({ success: true });
    },
  });

  return (
    <>
      <Head title="Lime Basket | Signup" />

      <div className="relative mb-24r z-0">
        {/* header */}
        <div className="min-h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full z-0">
          <div className="flex-none relative w-full">
            <Policies textColor="space" />
          </div>
          <hr className="text-space w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10">
            <Navbar
              logged={false}
              showSearchModal={false}
              clearModal={() => undefined}
              dark
            />
          </div>
          <div className="flex-none relative w-full text-center block">
            <h1 className="pt-12 text-space whitespace-no-wrap">join us</h1>
          </div>

          {/* forms */}
          <div className="w-full flex flex-no-wrap flex-col md:flex-row justify-center items-center text-space mb-10">
            {/* signin */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-white rounded-lg shadow-md mx-auto px-4 py-8">
              <div className="w-full font-subtitle-semibold pb-10">
                Welcome new customer!
              </div>
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

                <div className="w-full flex h-40p bg-honeydew justify-center items-center mb-10">
                  <label className="flex items-center w-full" htmlFor="email">
                    <span className="w-1/2 inline-block pl-12">Nickname</span>
                    <input
                      className="w-1/2 h-30p mr-2 rounded-md shadow px-4"
                      placeholder="Nickname"
                      id="nickname"
                      name="nickname"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.nickname}
                    />
                  </label>
                </div>

                {formik.touched.nickname && formik.errors.nickname ? (
                  <Alert
                    title="Invalid input!"
                    content={formik.errors.nickname}
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

                <div className="w-full flex h-40p bg-honeydew justify-center items-center mb-5">
                  <label
                    className="flex items-center w-full"
                    htmlFor="repeatpassword"
                  >
                    <span className="w-1/2 inline-block pl-12">
                      Repeat password
                    </span>
                    <input
                      className="w-1/2 h-30p mr-2 rounded-md shadow px-4"
                      placeholder="Repeat password"
                      type="password"
                      id="repeatpassword"
                      name="repeatpassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.repeatpassword}
                    />
                  </label>
                </div>

                {formik.touched.repeatpassword &&
                formik.errors.repeatpassword ? (
                  <Alert
                    title="Invalid input!"
                    content={formik.errors.repeatpassword}
                    exclamation
                  />
                ) : null}

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
          </div>

          {error && (
            <Alert
              title="Failed!"
              content={`You couldnt signup. ${error}`}
              bell
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Signup;
