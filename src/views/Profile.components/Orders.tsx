import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import isEmpty from "lodash.isempty";
import moment from "moment";

import { listMyOrders, deleteOrder } from "../../store/actions";
import { ButtonCell } from "../../common";
import Loading from "../../common/LoaderLoading";

function Orders() {
  const [workingRow, setWorkingRow] = React.useState(null);
  const dispatch = useAppDispatch();
  const myOrderList: { loading: boolean; orders: any; error: string } =
    useAppSelector((state) => state.myOrderList);
  const loadingOrders = myOrderList.loading;
  const orders = myOrderList.orders;
  const errorOrders = myOrderList.error;

  const orderDelete = useAppSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
    order: deletedOrder,
  } = orderDelete;

  React.useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  React.useEffect(() => {
    if (successDelete && deletedOrder) {
      dispatch(listMyOrders());
    }
    if (errorDelete) {
      alert("error deleting order");
    }
  }, [deletedOrder, errorDelete, successDelete, dispatch]);

  const deleteHandler = (id: any) => {
    setWorkingRow(id);
    dispatch(deleteOrder(id));
  };

  if (isEmpty(orders)) {
    return (
      <div className="w-full">
        <div className="font-table-content text-space whitespace-nowrap text-left">
          <b>No orders.</b>
        </div>
      </div>
    );
  }

  if (loadingOrders || errorOrders) {
    return (
      <div className="w-50p h-25p overflow-visible">
        <Loading />
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow-md pb-10">
      <table className="text-left border-collapse w-auto mx-auto">
        <thead className="t-head-products md:h-80p bg-honeydew">
          <tr className="tr-products md:border-b-space md:border-b-2 border-solid font-table-content md:thead-tr-md lg:thead-tr-lg text-center">
            <th className="px-3 md:px-1 py-2">ID</th>
            <th className="px-3 md:px-1 py-2">Date</th>
            <th className="px-3 md:px-1 py-2">Total</th>
            <th className="px-3 md:px-1 py-2">Paid</th>
            <th className="px-3 md:px-1 py-2">Paid at</th>
            <th className="px-3 md:px-1 py-2">Delivered</th>
            <th className="px-3 md:px-1 py-2">Delivered at</th>
            <th className="px-3 md:px-1 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any, idx: any) => (
            <tr
              key={order._id}
              className={`tr-products rounded-md md:border-b-black md:border-b-2 border-solid md:font-thead-tr-md lg:font-thead-tr-lg font-table-content text-space text-center ${
                idx % 2 === 0 ? "bg-white" : "bg-honeydew"
              }`}
            >
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-2 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pb-2">
                <span className="rounded-lg mx-1 bg-lime text-space block md:hidden px-1 py-2 uppercase">
                  <b>ID</b>
                </span>
                <div className="py-2">
                  {order._id.substring(order._id.length - 7)}
                </div>
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-2 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pb-2">
                <span className="rounded-lg mx-1 bg-lime text-space block md:hidden px-1 py-2 uppercase">
                  <b>Date</b>
                </span>
                <div className="py-2">
                  {moment(order.createdAt).format("YYYY-MM-DD")}
                </div>
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-2 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pb-2">
                <span className="rounded-lg mx-1 bg-lime text-space block md:hidden px-1 py-2 uppercase">
                  <b>Total</b>
                </span>
                <div className="py-2">{order.totalPrice.toFixed(2)}</div>
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-2 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pb-2">
                <span className="rounded-lg mx-1 bg-lime text-space block md:hidden px-1 py-2 uppercase">
                  <b>Paid</b>
                </span>
                <div className="py-2">{order.isPaid.toString()}</div>
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-2 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pb-2">
                <span className="rounded-lg mx-1 bg-lime text-space block md:hidden px-1 py-2 uppercase">
                  <b>Paid at</b>
                </span>
                <div className="py-2">
                  {order.isPaid
                    ? moment(order.paidAt).format("YYYY-MM-DD")
                    : "-"}
                </div>
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-2 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pb-2">
                <span className="rounded-lg mx-1 bg-lime text-space block md:hidden px-1 py-2 uppercase">
                  <b>Delivered</b>
                </span>
                <div className="py-2">{order.isDelivered.toString()}</div>
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-2 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pb-2">
                <span className="rounded-lg mx-1 bg-lime text-space block md:hidden px-1 py-2 uppercase">
                  <b>Delivered at</b>
                </span>
                <div className="py-2">
                  {order.deliveredAt
                    ? moment(order.deliveredAt).format("YYYY-MM-DD")
                    : "-"}
                </div>
              </td>
              <td className="mt-0 -mr-1p -mb-1p ml-0 py-2 relative w-full md:w-4/5 lg:w-1/2 text-center md:mx-auto md:px-2 md:my-2 table">
                <div className="block md:table-row-group w-full">
                  <span className="rounded-lg mx-1 bg-lime text-space block md:hidden px-1 py-2 uppercase">
                    <b>Action</b>
                  </span>
                  <div className="flex justify-around h-25p md:h-auto my-4 md:my-0 md:table-row">
                    <ButtonCell
                      tableCell
                      noPadding
                      shrink
                      px="md:px-1 lg:px-2"
                      py="md:py-3p lg:py-5p"
                      w="w-2/5 md:w-60p lg:w-100p"
                    >
                      <Link to={`/order/${order._id}`}>Details</Link>
                    </ButtonCell>
                    <div className="hidden md:block w-full h-2" />
                    <ButtonCell
                      tableCell
                      noPadding
                      shrink
                      px="md:px-1 lg:px-2"
                      py="md:py-3p lg:py-5p"
                      w="w-2/5 md:w-60p lg:w-100p"
                      onClick={() => deleteHandler(order._id)}
                    >
                      {loadingDelete && workingRow === order._id
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
  );
}

export default Orders;
