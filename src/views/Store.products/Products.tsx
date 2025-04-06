import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import isEmpty from "lodash.isempty";

import {
  listProducts,
  deleteProduct,
  saveProduct,
} from "../../store/actions/shop/productActions";
import { PRODUCT_DELETE_FAIL } from "../../store/actions/shop/shopActionTypes/productActionTypes";
import { Modal, Alert, ButtonCell } from "../../common";

function Products() {
  // modal to show delete error
  const [showModal, setShowModal] = React.useState(false);
  // text for modal delete error
  const [errorModalMessage, setErrorModalMessage] = React.useState("");
  // text for alert message
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [deletedProduct, setDeletedProduct] = React.useState<string | null>(
    null
  );
  // for the ... delete button just affect one cell
  const [workingRow, setWorkingRow] = React.useState<number | null>(null);
  // edit name and price
  const [editName, setEditName] = React.useState("");
  const [editPrice, setEditPrice] = React.useState("");
  // false show text 'edit', true shows text 'close edit'
  const [editState, setEditState] = React.useState(false);
  // error msg in edit cell
  const [editMsg, setEditMsg] = React.useState<{
    message?: string;
    field?: string;
  } | null>(null);

  const timeoutRef = React.useRef<number | null>(null);

  const dispatch = useAppDispatch();
  const productList: { products: any; loading: boolean; error: string } =
    useAppSelector((state) => state.productList);

  const products = productList.products;
  const loading = productList.loading;
  const error = productList.error;

  const productDelete = useAppSelector((state) => state.productDelete);
  const {
    product: productDeleted, // {}
    loading: loadingDelete, // bool
    success: successDelete, // bool
    error: errorDelete, // str
  } = productDelete;

  React.useEffect(() => {
    if (!products) {
      dispatch(listProducts());
    }

    if (errorDelete) {
      setErrorModalMessage(errorDelete);
      setShowModal(true);
    }

    if (!isEmpty(productDeleted)) {
      const prodMsg = Object.entries(productDeleted)
        .map((e) => `${e[0]}: ${e[1]}`)
        .join(" - ");
      setDeletedProduct(prodMsg);
    }

    if (successDelete) {
      timeoutRef.current = window.setTimeout(() => {
        setSuccessMessage(false);
        setDeletedProduct(null);
      }, 5000);
    }

    if (!editName && !editPrice) {
      setEditState(false);
    }

    return () => window.clearTimeout(timeoutRef.current as number);
  }, [
    products,
    dispatch,
    errorDelete,
    successDelete,
    productDeleted,
    editName,
    editPrice,
  ]);

  const deleteHandler = (id: number) => {
    setWorkingRow(id);
    dispatch(
      deleteProduct(
        id, // on success
        () => {
          setSuccessMessage(true);
          setErrorModalMessage("");
          setWorkingRow(null);
        }
      )
    );
  };

  const toggleModalState = () => {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: "",
    });
    setShowModal(false);
    setErrorModalMessage("");
  };

  const editFields = (id: number) => {
    setEditName("*"); // * for edit available
    setEditPrice("*");
    setEditState(!editState); // !editState xq se controla solo con bttn edit
    setWorkingRow(id);
  };

  const handleSaveField = (product: any, field: string, value: any) => {
    if (!value || value === undefined || value === "*") {
      setEditMsg({ message: "Empty values not allowed", field });
      setTimeout(() => {
        setEditMsg(null);
        if (field === "name") setEditName("*"); // edit available
        if (field === "price") setEditPrice("*");
      }, 3000);
    } else {
      product[field] = value; // eslint-disable-line
      dispatch(
        saveProduct(
          product,
          // on success
          () => {
            if (field === "name") setEditName(""); // close edit
            if (field === "price") setEditPrice("");
          }
        )
      );
    }
  };

  const editMsgComponent = () => (
    <div className="absolute text-center bottom-0 w-full flex flex-col items-center z-20 left-0 bg-indigo-300 text-red-700 py-1 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="h-5 w-5 text-whide bg-red-700 rounded-full"
      >
        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg>
      <div>
        <p className="text-xs md:text-sm lg:text-base">{editMsg?.message}</p>
      </div>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {successMessage && deletedProduct && (
        <Alert
          title="Product Deleted!"
          content={`Details: ${deletedProduct}`}
          bell
        />
      )}
      <div className="">
        <table className="text-left border-collapse w-full">
          <thead className="t-head-products">
            <tr className="tr-products rounded-md bg-white md:border-b-black md:border-b-4 border-solid md:text-base lg:text-lg md:thead-tr-md lg:thead-tr-lg">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr
                key={product._id}
                className="tr-products rounded-md bg-white md:border-b-black md:border-b-2 border-solid md:font-thead-tr-md lg:font-thead-tr-lg"
              >
                <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-3 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                  <span className="rounded-lg mx-auto right-0 mx-1p bg-indigo-500 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                    ID
                  </span>
                  {product._id.substring(product._id.length - 7)}
                </td>
                <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-3 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                  <span className="rounded-lg mx-auto right-0 mx-1p bg-indigo-500 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                    Name
                  </span>
                  {editName && workingRow === product._id && editState && (
                    <div className="relative w-full overflow-hidden rounded border-solid border-2 border-indigo-200">
                      <input
                        type="text"
                        placeholder="new name"
                        className="absolute z-10 placeholder-indigo-500 focus:placeholder-indigo-400"
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <br />
                      <div className="flex flex-no-wrap w-full justify-center items-center">
                        <button
                          className="bg-indigo-200 text-indigo-800 w-1/2 text-xs md:text-sm lg:text-base"
                          type="button"
                          onClick={() =>
                            handleSaveField(product, "name", editName)
                          }
                        >
                          <i className="fas fa-check-circle" />
                        </button>
                        <button
                          className="bg-indigo-200 text-indigo-800 w-1/2 text-xs md:text-sm lg:text-base"
                          type="button"
                          onClick={() => setEditName("")}
                        >
                          <i className="fas fa-times-circle" />
                        </button>
                      </div>
                    </div>
                  )}
                  {editMsg &&
                    editMsg.field === "name" &&
                    workingRow === product._id &&
                    editMsgComponent()}
                  {product.name}
                </td>
                <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-3 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                  <span className="rounded-lg mx-auto right-0 mx-1p bg-indigo-500 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                    Price
                  </span>
                  {editPrice && workingRow === product._id && editState && (
                    <div className="relative w-full overflow-hidden rounded border-solid border-2 border-indigo-200">
                      <input
                        type="text"
                        placeholder="new price"
                        className="absolute z-10 placeholder-indigo-500 focus:placeholder-indigo-400"
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                      <br />
                      <div className="flex flex-no-wrap w-full justify-center items-center">
                        <button
                          className="bg-indigo-200 text-indigo-800 w-1/2 text-xs md:text-sm lg:text-base"
                          type="button"
                          onClick={() =>
                            handleSaveField(product, "price", editPrice)
                          }
                        >
                          <i className="fas fa-check-circle" />
                        </button>
                        <button
                          className="bg-indigo-200 text-indigo-800 w-1/2 text-xs md:text-sm lg:text-base"
                          type="button"
                          onClick={() => setEditPrice("")}
                        >
                          <i className="fas fa-times-circle" />
                        </button>
                      </div>
                    </div>
                  )}
                  {editMsg &&
                    editMsg.field === "price" &&
                    workingRow === product._id &&
                    editMsgComponent()}
                  {product.price}
                </td>
                <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-3 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                  <span className="rounded-lg mx-auto right-0 mx-1p bg-indigo-500 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                    Category
                  </span>
                  {product.category}
                </td>
                <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-3 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                  <span className="rounded-lg mx-auto right-0 mx-1p bg-indigo-500 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                    Brand
                  </span>
                  {product.brand}
                </td>
                <td className="mt-0 -mr-1p -mb-1p ml-0 pt-6 relative w-full md:w-4/5 lg:w-1/2 text-center md:mx-auto md:px-2 md:py-2 md:my-2 text-sm md:text-base lg:text-lg table">
                  <div className="block md:table-row-group">
                    <span className="rounded-lg mx-auto right-0 mx-1p bg-indigo-500 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                      Action
                    </span>
                    <div className="flex justify-around h-50p md:h-auto pt-25p md:pt-0 pb-1p md:pb-0 md:table-row">
                      <ButtonCell
                        tableCell
                        noPadding
                        shrink
                        px="md:px-1 lg:px-2"
                        py="md:py-3p lg:py-5p"
                        w="w-2/5 md:w-60p lg:w-100p"
                        onClick={() => editFields(product._id)}
                      >
                        {editState && workingRow === product._id
                          ? "Close"
                          : "Edit"}
                      </ButtonCell>
                      <ButtonCell
                        tableCell
                        noPadding
                        shrink
                        px="md:px-1 lg:px-2"
                        py="md:py-3p lg:py-5p"
                        w="w-2/5 md:w-60p lg:w-100p"
                        onClick={() => deleteHandler(product._id)}
                      >
                        {loadingDelete && workingRow === product._id
                          ? "......"
                          : "Delete"}
                      </ButtonCell>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          id="modal"
          isOpen={showModal}
          onClose={toggleModalState}
          title="Action failed!"
        >
          <div className="box-body ">{` ${errorModalMessage} `}</div>
        </Modal>
      )}
    </div>
  );
}

export default Products;
