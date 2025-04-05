/* eslint-disable object-curly-newline */
/* eslint-disable indent */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { Policies, Navbar, Button, Modal, Alert, Head } from "../common";
import * as actions from "../store/actions";

// eslint-disable-next-line no-unused-vars
function ResetPassword() {
  const [showModal, setShowModal] = React.useState(false);
  const [navigate, setNavigate] = React.useState(false);
  const navigateHome = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const {
    authenticated,
    resetPasswordError: error,
    resetPassword: success,
  } = auth;

  const toggleModalState = () => {
    setShowModal(false);
    setNavigate(true);
  };

  React.useEffect(() => {
    if (navigate) {
      navigateHome("/");
    }
  }, [navigate, navigateHome]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { setStatus, resetForm }) => {
      dispatch(
        actions.resetPassword(values, (result) => {
          if (result) setShowModal(true);
          resetForm({});
          setStatus({
            success: result,
          });
        })
      );
    },
  });

  return (
    <>
      <Head title="Lime Basket | Reset password" />

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
            <h1 className="pt-12 text-space whitespace-no-wrap">lime basket</h1>
          </div>

          {/* forms */}
          <div className="w-full flex flex-no-wrap flex-col md:flex-row justify-center items-center text-space">
            {/*  */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-white rounded-lg shadow-md mr-2 px-4 py-8">
              <div className="w-full font-subtitle-semibold pb-10">
                We&apos;ll send you an email asking you to confirm the change.
              </div>
              {error && <Alert title="Failed!" content={`${error}`} bell />}
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

                <div className="mb-10">
                  <Button size="md" padding="p-0" submit noArrow>
                    <div className="font-button">Submit</div>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          id="modal"
          isOpen={showModal}
          onClose={toggleModalState}
          title="Reset password"
        >
          <div className="box-body">
            {`Check your registered email - ${success.email} - to reset your password`}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ResetPassword;
