import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import axios, { AxiosInstance } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import { saveProduct } from "../../store/actions/shop/productActions";
import { Modal, ButtonCell, Alert } from "../../common";
import { PRODUCT_SAVE_FAIL } from "../../store/actions/shop/shopActionTypes/productActionTypes";

type SubmitNewProduct = {
  name: string;
  price: string;
  brand: string;
  category: string;
  countInStock: string;
  description: string;
  image?: string;
};

function NewProduct() {
  const [image, setImage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [errorUploadMessage, setErrorUploadMessage] = React.useState("");
  const [uploadingFile, setUploadingFile] = React.useState(false);

  const timeoutRef = React.useRef<any>();
  const axiosinstance = React.useRef<AxiosInstance>();

  const dispatch = useAppDispatch();

  const productSave = useAppSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    error: errorSave,
    product: newProductSaved,
  }: { loading: boolean; error: string; product: any } = productSave;

  React.useEffect(() => {
    const authHeader =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../utils/misc/auth-header").default;
    const defaultOptions = {
      headers: authHeader(""),
    };
    axiosinstance.current = axios.create(defaultOptions);

    if (errorSave) {
      setErrorUploadMessage(errorSave);
      setShowUploadModal(true);
      setUploadingFile(false);
    }

    if (successMessage) {
      timeoutRef.current = window.setTimeout(
        () => setSuccessMessage(false),
        5000
      );
    }

    return () => window.clearTimeout(timeoutRef.current);
  }, [errorSave, successMessage]);

  const uploadFileHandler = (e: any) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploadingFile(true);
    axiosinstance?.current
      ?.post("/shop/uploads/product", bodyFormData)
      .then((response) => {
        const imagePath = response.data.filePath || "No image available";
        setImage(imagePath);
        setUploadingFile(false);
      })
      .catch((err) => {
        const msg = err.response.data.message || "Try again";
        setErrorUploadMessage(msg);
        setShowUploadModal(true);
        setUploadingFile(false);
      });
  };

  const toggleModalState = () => {
    dispatch({
      type: PRODUCT_SAVE_FAIL,
      payload: "",
    });
    setShowUploadModal(false);
    setErrorUploadMessage("");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      brand: "",
      category: "",
      countInStock: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("No name provided.")
        .min(2, "Name is too short - should be 8 chars minimum.")
        .matches(
          /^[a-zA-Z0-9.]+$/,
          "Name can only contain Latin letters and numbers."
        ),
      brand: Yup.string()
        .required("No brand provided.")
        .min(2, "Name is too short - should be 8 chars minimum.")
        .matches(
          /^[a-zA-Z0-9.]+$/,
          "Brand can only contain Latin letters and numbers."
        ),
      category: Yup.string()
        .required("No category provided.")
        .min(2, "Category is too short - should be 8 chars minimum.")
        .matches(
          /^[a-zA-Z0-9.]+$/,
          "Category can only contain Latin letters and numbers."
        ),
      price: Yup.number()
        .required("No price provided.")
        .positive("No negative numbers.")
        .min(1, "Min price is 1.")
        .max(1000, "Max is 1000."),
      countInStock: Yup.number()
        .required("No stock provided.")
        .integer("Integer values only.")
        .max(1000, "Max is 1000."),
      description: Yup.string()
        .min(2, "Description is too short - should be 8 chars minimum.")
        .matches(
          /^[a-zA-Z0-9.\s]+$/,
          "Description can only contain Latin letters and numbers."
        ),
    }),
    onSubmit: (values, { setStatus, resetForm }) => {
      values = {
        ...values,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        image: image === "No image available" ? "" : image,
      };
      dispatch(
        saveProduct(
          values,
          // on success
          () => {
            setSuccessMessage(true);
            setErrorUploadMessage("");
          }
        )
      );
      resetForm({});
      setStatus({
        success: true,
      });
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <ul className="relative w-full lg:w-70% lg:mx-auto h-auto flex flex-col flex-no-wrap pb-8 pt-16 md:pt-18 lg:pt-20 justify-center items-center">
          <li className="relative w-full py-2 flex flex-col flex-no-wrap">
            <label
              className="py-2 flex flex-row flex-no-wrap justify-center items-center"
              htmlFor="name"
            >
              <span className="w-2/5 flex justify-center md:pl-8 text-sm md:text-base">
                <b className="bg-indigo-500 px-2 rounded-l-full rounded-r-full text-indigo-100">
                  Name
                </b>
              </span>
              <input
                className="rounded border-solid border-2 border-indigo-200 w-3/5"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </label>

            {formik.touched.name && formik.errors.name ? (
              <Alert
                title="Invalid input!"
                content={formik.errors.name}
                exclamation
              />
            ) : null}
          </li>
          <li className="relative w-full py-2 flex flex-col flex-no-wrap">
            <label
              className="py-2 flex flex-row flex-no-wrap justify-center items-center"
              htmlFor="price"
            >
              <span className="w-2/5 flex justify-center md:pl-8 text-sm md:text-base">
                <b className="bg-indigo-500 px-2 rounded-l-full rounded-r-full text-indigo-100">
                  Price
                </b>
              </span>
              <input
                className="rounded border-solid border-2 border-indigo-200 w-3/5"
                placeholder="66.90"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                type="number"
                name="price"
                id="price"
              />
            </label>
            {formik.touched.price && formik.errors.price ? (
              <Alert
                title="Invalid input!"
                content={formik.errors.price}
                exclamation
              />
            ) : null}
          </li>
          <li>
            <div className="absolute top-0 right-0 flex flex-col flex-no-wrap justify-center items-center">
              <ButtonCell noPadding>
                <div className="relative flex flex-no-wrap py-5p md:py-8p lg:py-10p px-20p">
                  <input
                    className="absolute top-0 left-0 opacity-0 w-165p h-40p cursor-pointer font-0"
                    type="file"
                    onChange={uploadFileHandler}
                  />
                  <svg
                    className="flex-shrink self-center"
                    width="30"
                    height="22"
                    viewBox="0 0 24 16"
                  >
                    <title />
                    <desc />
                    <defs />
                    <g
                      fill="currentColor"
                      fillRule="evenodd"
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                    >
                      <g
                        fill="#000000"
                        id="Core"
                        transform="translate(-126.000000, -46.000000)"
                      >
                        <g
                          id="backup"
                          transform="translate(126.000000, 46.000000)"
                        >
                          <path
                            d="M19.4,6 C18.7,2.6 15.7,0 12,0 C9.1,0 6.6,1.6 5.4,4 C2.3,4.4 0,6.9 0,10 C0,13.3 2.7,16 6,16 L19,16 C21.8,16 24,13.8 24,11 C24,8.4 21.9,6.2 19.4,6 L19.4,6 Z M14,9 L14,13 L10,13 L10,9 L7,9 L12,4 L17,9 L14,9 L14,9 Z"
                            id="Shape"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span className="ml-2 text-sm md:text-base">
                    {uploadingFile && "Uploading..."}
                    {!uploadingFile && "Product Image"}
                  </span>
                </div>
              </ButtonCell>
              <small className="text-xs">
                {!image || image === "" || image === "No image available"
                  ? "(optional)"
                  : `Image selected: ${
                      image.split("-")[image.split("-").length - 1]
                    }`}
              </small>
            </div>
          </li>
          <li className="relative w-full py-2 flex flex-col flex-no-wrap">
            <label
              className="py-2 flex flex-row flex-no-wrap justify-center items-center"
              htmlFor="brand"
            >
              <span className="w-2/5 flex justify-center md:pl-8 text-sm md:text-base">
                <b className="bg-indigo-500 px-2 rounded-l-full rounded-r-full text-indigo-100">
                  Brand
                </b>
              </span>
              <input
                className="rounded border-solid border-2 border-indigo-200 w-3/5"
                placeholder="Brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
                type="text"
                name="brand"
                id="brand"
              />
            </label>

            {formik.touched.brand && formik.errors.brand ? (
              <Alert
                title="Invalid input!"
                content={formik.errors.brand}
                exclamation
              />
            ) : null}
          </li>
          <li className="relative w-full py-2 flex flex-col flex-no-wrap">
            <label
              className="py-2 flex flex-row flex-no-wrap justify-center items-center"
              htmlFor="countInStock"
            >
              <span className="w-2/5 flex justify-center md:pl-8 text-sm md:text-base">
                <b className="bg-indigo-500 px-2 rounded-l-full rounded-r-full text-indigo-100">
                  Stock
                </b>
              </span>
              <input
                className="rounded border-solid border-2 border-indigo-200 w-3/5"
                placeholder="70 (integer value only)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.countInStock}
                type="number"
                name="countInStock"
                id="countInStock"
              />
            </label>

            {formik.touched.countInStock && formik.errors.countInStock ? (
              <Alert
                title="Invalid input!"
                content={formik.errors.countInStock}
                exclamation
              />
            ) : null}
          </li>
          <li className="relative w-full py-2 flex flex-col flex-no-wrap">
            <label
              className="py-2 flex flex-row flex-no-wrap justify-center items-center"
              htmlFor="name"
            >
              <span className="w-2/5 flex justify-center md:pl-8 text-sm md:text-base">
                <b className="bg-indigo-500 px-2 rounded-l-full rounded-r-full text-indigo-100">
                  Category
                </b>
              </span>
              <input
                className="rounded border-solid border-2 border-indigo-200 w-3/5"
                type="text"
                name="category"
                id="category"
                placeholder="Category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              />
            </label>

            {formik.touched.category && formik.errors.category ? (
              <Alert
                title="Invalid input!"
                content={formik.errors.category}
                exclamation
              />
            ) : null}
          </li>
          <li className="relative w-full py-2 flex flex-col flex-no-wrap">
            <label
              className="py-2 flex flex-row flex-no-wrap justify-center items-center"
              htmlFor="description"
            >
              <span className="w-2/5 flex justify-center md:pl-8 text-sm md:text-base">
                <b className="bg-indigo-500 px-2 rounded-l-full rounded-r-full text-indigo-100 flex-shrink md:flex-shrink-0">
                  Description
                </b>
              </span>
              <textarea
                className="rounded border-solid border-2 border-indigo-200 w-3/5"
                name="description"
                id="description"
                placeholder="Description is optional"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </label>

            {formik.touched.description && formik.errors.description ? (
              <Alert
                title="Invalid input!"
                content={formik.errors.description}
                exclamation
              />
            ) : null}
          </li>
          <li className="relative w-full py-2 flex flex-col flex-no-wrap">
            <ButtonCell submit noPadding>
              <div className="relative flex flex-no-wrap py-5p md:py-8p lg:py-10p px-20p">
                <svg
                  className="flex-shrink self-center"
                  height="18"
                  viewBox="0 0 18 18"
                  width="18"
                >
                  <title />
                  <desc />
                  <defs />
                  <g
                    fill="none"
                    fillRule="evenodd"
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                  >
                    <g
                      fill="#000000"
                      id="Core"
                      transform="translate(-255.000000, -381.000000)"
                    >
                      <g
                        id="save"
                        transform="translate(255.000000, 381.000000)"
                      >
                        <path
                          d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 C0,17.1 0.9,18 2,18 L16,18 C17.1,18 18,17.1 18,16 L18,4 L14,0 L14,0 Z M9,16 C7.3,16 6,14.7 6,13 C6,11.3 7.3,10 9,10 C10.7,10 12,11.3 12,13 C12,14.7 10.7,16 9,16 L9,16 Z M12,6 L2,6 L2,2 L12,2 L12,6 L12,6 Z"
                          id="Shape"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="ml-2">
                  {loadingSave && " Saving... "}
                  {!loadingSave && "Save Product"}
                </span>
              </div>
            </ButtonCell>
          </li>
        </ul>
      </form>
      {successMessage && (
        <Alert
          title="New Product Saved!"
          content={`Details: ${Object.entries(newProductSaved.data)
            .map((e) => `${e[0]}: ${e[1]}`)
            .join("\n")}`}
          bell
        />
      )}
      {showUploadModal && (
        <Modal
          id="modal"
          isOpen={showUploadModal}
          onClose={toggleModalState}
          title="Action failed!"
        >
          <div className="box-body ">{` ${errorUploadMessage} `}</div>
        </Modal>
      )}
    </div>
  );
}

export default NewProduct;
