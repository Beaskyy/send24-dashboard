"use client";

import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import OrderCount from "./components/OrderCount";
import { useStateContext } from "@/contexts/ContextProvider";
import SearchOrders from "./components/SearchOrders";
import token from "@/lib/access-token";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const fetchOrders = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(`${apiUrl}/admin/orders?sort=desc`, {
    headers,
  });
  return response.data.data;
};

const fetchOrderCount = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(`${apiUrl}/admin/orders/status-counts`, {
    headers,
  });
  return response.data.data;
};

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState<number>(50);
  const [currentPage, setCurrentPage] = useState(1);
  // const [orderCount, setOrderCount] = useState<OrderCountProps>({
  //   completed: 0,
  //   pending: 0,
  //   accepted: 0,
  //   transit: 0,
  //   cancelled: 0,
  //   total: 0,
  // });



  const {data: dataCount, isLoading: countLoading, isError: countIsError, error: countError} = useQuery({
    queryKey: ["order-count"],
    queryFn: fetchOrderCount,
  });

  const {
    data: totalOrders,
    isLoading: ordersLoading,
    isError: ordersIsError,
    error: ordersError,
  } = useQuery({
    queryKey: ["orders", currentPage, perPage],
    queryFn: fetchOrders,
  });

  // Handle loading and error states
  if (ordersLoading) return (
    <div className="flex justify-center items-center">
      <Loader className="size-6 animate-spin mt-40" />
    </div>
  );
  if (ordersIsError) return <div>{ordersError.message}</div>;

  const orders = totalOrders?.orders;
  const totalPages = totalOrders?.meta?.last_page;
  console.log(totalPages)

  return (
    <main className=" mt-8 lg:ml-10 lg:mr-9 mx-4">
      <SearchOrders />
      <OrderCount orderCount={dataCount} loading={loading} />
      <DataTable
        columns={columns}
        data={orders}
        tableName="Orders"
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Orders;
