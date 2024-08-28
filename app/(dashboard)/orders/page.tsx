"use client";

import { associations } from "@/lib/data";
import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import OrderCount from "./components/OrderCount";
import { toast } from "sonner";
import { useStateContext } from "@/contexts/ContextProvider";
import { OrderCountProps } from "@/types";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState<OrderCountProps>({
    completed: 0,
    pending: 0,
    accepted: 0,
    transit: 0,
    cancelled: 0,
    total: 0,
  });

  const { token } = useStateContext();

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const options = {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/orders`,
          options
        );
        const data = await response.json();
        console.log(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // fetch orders count
  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const options = {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/orders/status-counts`,
          options
        );
        const data = await response.json();
        console.log(data["data"]);
        setOrderCount(data["data"]);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersCount();
  }, []);
  return (
    <main className="lg:mt-[52px] mt-8 lg:ml-10 lg:mr-9 mx-4">
      <OrderCount orderCount={orderCount} loading={loading} />
      <DataTable
        columns={columns}
        data={associations}
        searchKey="name"
        tableName="Orders"
      />
    </main>
  );
};

export default Orders;
