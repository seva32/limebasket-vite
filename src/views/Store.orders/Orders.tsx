/* eslint-disable max-len */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import isEmpty from "lodash.isempty";

import { listOrders, deleteOrder } from "../../store/actions";
import { ButtonCell } from "../../common";

function Orders() {
  const [workingRow, setWorkingRow] = React.useState(null);
  const dispatch = useAppDispatch();

  const orderList: { loading: boolean; orders: any; error: string } =
    useAppSelector((state) => state.orderList);
  const loadingOrders = orderList.loading;
  const orders = orderList.orders;
  const errorOrders = orderList.error;

  const orderDelete = useAppSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
    order: deletedOrder,
  } = orderDelete;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  useEffect(() => {
    if (successDelete && deletedOrder) {
      dispatch(listOrders());
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
    return <div>No orders.</div>;
  }

  if (loadingOrders || errorOrders) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <table className="text-center border-collapse w-full">
        <thead className="t-head-products">
          <tr className="tr-products rounded-md bg-white md:border-b-black md:border-b-4 border-solid md:text-base lg:text-lg md:thead-tr-md lg:thead-tr-lg text-center">
            <th className="px-3 md:px-1 py-2">ID</th>
            <th className="px-3 md:px-1 py-2">User</th>
            <th className="px-3 md:px-1 py-2">Date</th>
            <th className="px-3 md:px-1 py-2">Total</th>
            <th className="px-3 md:px-1 py-2">Paid</th>
            <th className="px-3 md:px-1 py-2">Paid at</th>
            <th className="px-3 md:px-1 py-2">Delivered</th>
            {/* <th className="px-3 md:px-1 py-2">Delivered at</th> */}
            <th className="px-3 md:px-1 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr
              key={order._id}
              className="tr-products rounded-md bg-white md:border-b-black md:border-b-2 border-solid md:font-thead-tr-md lg:font-thead-tr-lg"
            >
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                <span className="rounded-lg right-0 mx-1p bg-lime-70 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                  ID
                </span>
                {order._id.substring(order._id.length - 7)}
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                <span className="rounded-lg right-0 mx-1p bg-lime-70 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                  User
                </span>
                {order.user.nickname.slice(0, 10)}
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                <span className="rounded-lg right-0 mx-1p bg-lime-70 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                  Date
                </span>
                {order.createdAt.slice(0, 10)}
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                <span className="rounded-lg right-0 mx-1p bg-lime-70 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                  Total
                </span>
                {order.totalPrice.toFixed(2)}
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                <span className="rounded-lg right-0 mx-1p bg-lime-70 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                  Paid
                </span>
                {order.isPaid.toString()}
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                <span className="rounded-lg right-0 mx-1p bg-lime-70 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                  Paid at
                </span>
                {order.paidAt ? order.paidAt.slice(0, 10) : "-"}
              </td>
              <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                <span className="rounded-lg right-0 mx-1p bg-lime-70 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                  Delivered
                </span>
                {order.isDelivered.toString()}
              </td>
              {/* <td className="mt-0 h-full -mr-1p -mb-1p ml-0 pt-6 relative w-1/2 md:w-auto md:m-0 md:px-1 md:pt-2 md:pb-2 text-sm md:text-base lg:text-lg">
                <span className="rounded-lg right-0 mx-1p bg-lime-70 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
                  Delivered at
                </span>
                {order.deliveredAt ? order.deliveredAt.slice(0, 11) : '-'}
              </td> */}
              <td className="mt-0 -mr-1p -mb-1p ml-0 pt-6 relative w-full md:w-4/5 lg:w-1/2 text-center md:mx-auto md:px-2 md:py-2 md:my-2 text-sm md:text-base lg:text-lg table">
                <div className="block md:table-row-group w-full">
                  <span className="rounded-lg mx-auto right-0 mx-digo-500 text-indigo-100 block md:hidden text-xs font-bold px-1 absolute uppercase top-0 left-0">
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
                    >
                      <Link to={`/order/${order._id}`}>Details</Link>
                    </ButtonCell>
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
