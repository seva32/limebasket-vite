import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  listProducts,
  deleteProduct,
  saveProduct,
} from "../../store/actions/shop/productActions";
import { PRODUCT_DELETE_FAIL } from "../../store/actions/shop/shopActionTypes/productActionTypes";
import { Modal, Alert } from "../../common";
import { IProduct } from "../../interfaces/IProduct";
import { ProductsProvider } from "../../contexts/productContext";
import { useProducts } from "../../contexts/productContext";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ name: string; price: string }>(
    { name: "", price: "" }
  );
  const [editMsg, setEditMsg] = useState<{
    message: string;
    field: string;
  } | null>(null);
  const { products, loading, error, refreshProducts } = useProducts();

  const timeoutRef = useRef<number | null>(null);
  const dispatch = useAppDispatch();

  const {
    product: productDeleted,
    success: successDelete,
    error: errorDelete,
  } = useAppSelector((state) => state.productDelete);

  useEffect(() => {
    if (!products.length) dispatch(listProducts());

    if (errorDelete) {
      setErrorModalMessage(errorDelete);
      setShowModal(true);
    }

    if (productDeleted && Object.keys(productDeleted).length) {
      const msg = Object.entries(productDeleted)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" - ");
      setDeletedProduct(msg);
    }

    if (successDelete) {
      timeoutRef.current = window.setTimeout(() => {
        setSuccessMessage(false);
        setDeletedProduct(null);
        refreshProducts();
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: "" });
      }, 5000);
    }

    return () => timeoutRef.current && window.clearTimeout(timeoutRef.current);
  }, [dispatch, products, errorDelete, successDelete, productDeleted]);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id, () => setSuccessMessage(true)));
  };

  const toggleModalState = () => {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: "" });
    setShowModal(false);
    setErrorModalMessage("");
  };

  const startEdit = (product: IProduct) => {
    setEditingId(product._id);
    setEditValues({ name: product.name, price: product.price.toString() });
    setEditMsg(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", price: "" });
    setEditMsg(null);
  };

  const handleChange = (field: keyof typeof editValues, value: string) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (product: IProduct) => {
    if (!editValues.name.trim() || !editValues.price.trim()) {
      setEditMsg({ message: "Both fields are required.", field: "" });
      return;
    }

    const updatedProduct = {
      ...product,
      name: editValues.name.trim(),
      price: parseFloat(editValues.price),
    };

    dispatch(
      saveProduct(updatedProduct, () => {
        cancelEdit();
        refreshProducts();
        setSuccessMessage(true);
      })
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!products.length) return <div>No products found.</div>;

  return (
    <div>
      {successMessage && deletedProduct && (
        <Alert
          title="Product Deleted!"
          content={`Details: ${deletedProduct}`}
          bell
        />
      )}

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2">ID</th>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Price</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">Brand</th>
            <th className="px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const isEditing = editingId === product._id;
            return (
              <tr key={product._id} className="bg-white border-b">
                <td className="px-3 py-2">{product._id.slice(-6)}</td>

                <td className="px-3 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      value={editValues.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  ) : (
                    product.name
                  )}
                </td>

                <td className="px-3 py-2">
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      className="border px-2 py-1 rounded w-full"
                      value={editValues.price}
                      onChange={(e) => handleChange("price", e.target.value)}
                    />
                  ) : (
                    `$${product.price.toFixed(2)}`
                  )}
                </td>

                <td className="px-3 py-2">{product.category}</td>
                <td className="px-3 py-2">{product.brand}</td>

                <td className="px-3 py-2 text-center">
                  {isEditing ? (
                    <>
                      <button
                        className="bg-space text-white px-3 py-1 rounded"
                        onClick={() => handleSave(product)}
                      >
                        Save
                      </button>
                      <div className="inline-block w-2" />
                      <button
                        className="bg-space text-white px-3 py-1 rounded"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-space text-white px-3 py-1 rounded"
                        onClick={() => startEdit(product)}
                      >
                        Edit
                      </button>
                      <div className="w-2 min-h-3" />
                      <button
                        className="bg-space text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {isEditing && editMsg && (
                    <p className="text-red-600 text-sm mt-1">
                      {editMsg.message}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <Modal isOpen onClose={toggleModalState}>
          <p className="text-red-600">{errorModalMessage}</p>
        </Modal>
      )}
    </div>
  );
};

export default function ProductsWrapper() {
  return (
    <ProductsProvider>
      <Products />
    </ProductsProvider>
  );
}
