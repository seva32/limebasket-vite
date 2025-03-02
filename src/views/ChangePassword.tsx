/* eslint-disable object-curly-newline */
/* eslint-disable indent */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import omit from "lodash.omit";

import { Policies, Navbar, Button, Modal, Alert, Head } from "../common";
import * as actions from "../store/actions";

function ChangePassword() {
  const [showModal, setShowModal] = React.useState(false);
  const [navigate, setNavigate] = React.useState(false);
  const navigateAction = useNavigate();
  const dispatch = useAppDispatch();
  const { token, email } = useParams();

  const auth = useAppSelector((state) => state.auth);
  const { changePasswordError: error, changePassword: success } = auth;

  const toggleModalState = () => {
    setShowModal(false);
    setNavigate(true);
  };

  React.useEffect(() => {
    if (navigate) {
      navigateAction("/signin");
    }
  }, [navigate, navigateAction]);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      repeatpassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("No password provided.")
        .min(2, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      repeatpassword: Yup.string().when("newPassword", {
        is: (val: any) => val && val.length > 0,
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "Both password need to be the same"
        ),
      }),
    }),
    onSubmit: (values: any, { setStatus, resetForm }) => {
      values = { ...values, token, email };
      dispatch(
        actions.changePassword(omit(values, ["repeatpassword"]), () => {
          dispatch(
            actions.signout(() => {
              setShowModal(true);
            })
          );
        })
      );
      resetForm({});
      setStatus({ success: true });
    },
  });

  return (
    <>
      <Head title="Lime Basket | Change password" />

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
          <div className="w-full flex flex-no-wrap flex-col md:flex-row justify-center items-center text-space">
            {/*  */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-white rounded-lg shadow-md mr-2 px-4 py-8">
              <div className="w-full font-subtitle-semibold pb-10">
                You requested a password change, complete this fields to have a
                new one.
              </div>
              <form onSubmit={formik.handleSubmit} className="w-full font-body">
                <div className="w-full flex h-40p bg-honeydew justify-center items-center mb-5">
                  <label
                    className="flex items-center w-full"
                    htmlFor="oldPassword"
                  >
                    <span className="w-1/2 inline-block pl-12">
                      Old password
                    </span>
                    <input
                      type="password"
                      className="w-1/2 h-30p mr-2 rounded-md shadow px-4"
                      placeholder="Old Password"
                      id="oldPassword"
                      name="oldPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.oldPassword}
                    />
                  </label>
                </div>

                {formik.touched["oldPassword"] &&
                formik.errors["oldPassword"] ? (
                  <Alert
                    title="Invalid input!"
                    content={formik.errors["oldPassword"] as string}
                    exclamation
                  />
                ) : null}

                <div className="w-full flex h-40p bg-honeydew justify-center items-center mb-5">
                  <label
                    className="flex items-center w-full"
                    htmlFor="newPassword"
                  >
                    <span className="w-1/2 inline-block pl-12">
                      New password
                    </span>
                    <input
                      type="password"
                      className="w-1/2 h-30p mr-2 rounded-md shadow px-4"
                      placeholder="New Password"
                      id="newPassword"
                      name="newPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                    />
                  </label>
                </div>

                {formik.touched["newPassword"] &&
                formik.errors["newPassword"] ? (
                  <Alert
                    title="Invalid input!"
                    content={formik.errors["newPassword"] as string}
                    exclamation
                  />
                ) : null}

                <div className="w-full flex h-40p bg-honeydew justify-center items-center mb-5">
                  <label
                    className="flex items-center w-full"
                    htmlFor="repeatpassword"
                  >
                    <span className="w-1/2 inline-block pl-12">
                      New password
                    </span>
                    <input
                      type="password"
                      className="w-1/2 h-30p mr-2 rounded-md shadow px-4"
                      placeholder="Repeat new password"
                      id="repeatpassword"
                      name="repeatpassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.repeatpassword}
                    />
                  </label>
                </div>

                {formik.touched["repeatpassword"] &&
                formik.errors["repeatpassword"] ? (
                  <Alert
                    title="Invalid input!"
                    content={formik.errors["repeatpassword"] as string}
                    exclamation
                  />
                ) : null}

                <div className="mb-10">
                  <Button size="md" padding="p-0" submit noArrow>
                    <div className="font-button">Submit</div>
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div>
            {error && <Alert title="Failed!" content={`${error}`} bell />}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          id="modal"
          isOpen={showModal}
          onClose={toggleModalState}
          title="Password Change"
        >
          <div className="box-body">{success.message}</div>
        </Modal>
      )}
    </>
  );
}

export default ChangePassword;
