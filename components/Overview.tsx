import { BarChart, ChartSpline } from "lucide-react";
import Image from "next/image";
import Chart from "./Chart";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStateContext } from "@/contexts/ContextProvider";
import { redirect } from "next/navigation";
import useSWR from "swr";

const fetcher = async (url: string, token: string) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  const data = await response.json();
  return data.data;
};

const Overview = () => {
  // const [loading, setLoading] = useState(true);
  // const [total, setTotal] = useState<any>([]);
  const { token } = useStateContext();

  const {
    data: total,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard-stats`,
    (url) => fetcher(url, token)
  );

  // Handle loading and error states
  if (isLoading)
    return (
      <div>
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-6 gap-y-4 mb-6">
          <div className="card">
            <h5 className="mb-6 text-[#121212] text-sm">Orders</h5>
            <div className="flex justify-between items-center mb-8 text-[#E87000] text-sm font-medium">
              <p className="bg-[#e8700034] py-1 px-4 rounded-full ">Pending</p>
              <Skeleton className="w-10 h-6" />
            </div>
            <div className="flex justify-between items-center mb-8 text-[#9fe800] text-sm font-medium">
              <p className="bg-[#9fe80041] py-1 px-4 rounded-full ">Accepted</p>
              <Skeleton className="w-10 h-6" />
            </div>
            <div className="flex justify-between items-center mb-8 text-[#00a6e8] text-sm font-medium">
              <p className="bg-[#00a6e829] py-1 px-4 rounded-full ">
                In transit
              </p>
              <Skeleton className="w-10 h-6" />
            </div>
            <div className="flex justify-between items-center mb-8 text-[#059669] text-sm font-medium">
              <p className="bg-[#05966833] py-1 px-4 rounded-full ">
                Completed
              </p>
              <Skeleton className="w-10 h-6" />
            </div>
            <div className="flex justify-between items-center mb-8 text-[#DC1515] text-sm font-medium">
              <p className="bg-[#dc151524] py-1 px-4 rounded-full ">Canceled</p>
              <Skeleton className="w-10 h-6" />
            </div>
            <hr className="mb-6" />
            <div className="flex justify-between items-center mb-8 text-[#15103d] text-sm font-medium">
              <p className="bg-[#15103d22] py-1 px-4 rounded-full ">Total</p>
              <Skeleton className="w-10 h-6" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
              <div className="card">
                <div className="flex justify-between items-center mb-6 text-[#121212]">
                  <h5 className="text-sm">Senders</h5>
                  <Skeleton className="w-8 h-5" />
                </div>
                <div className="flex justify-between items-center text-[#059669] text-sm mb-1">
                  <h5 className="text-sm">Android</h5>
                  <Skeleton className="w-6 h-5" />
                </div>
                <div className="flex justify-between items-center text-[#E87000] text-sm">
                  <h5 className="text-sm">iPhone</h5>
                  <Skeleton className="w-5 h-5" />
                </div>
              </div>
              <div className="card">
                <div className="flex justify-between items-center mb-6 text-[#121212]">
                  <h5 className="text-sm">Partners</h5>
                  <Skeleton className="w-8 h-5" />
                </div>
                <div className="flex justify-between items-center text-[#059669] text-sm mb-1">
                  <h5 className="text-sm">Android</h5>
                  <Skeleton className="w-6 h-5" />
                </div>
                <div className="flex justify-between items-center text-[#E87000] text-sm">
                  <h5 className="text-sm">iPhone</h5>
                  <Skeleton className="w-5 h-5" />
                </div>
              </div>
              <div className="card">
                <div className="flex justify-between items-center mb-4 text-[#121212]">
                  <h5 className="text-sm">Centers</h5>
                  <Skeleton className="w-8 h-6" />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-sm">Hubs</h5>
                  <Skeleton className="w-8 h-6" />
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="text-sm">Sweepers</h5>
                  <Skeleton className="w-8 h-6" />
                </div>
              </div>
              <div className="card">
                <div>
                  <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                    <ChartSpline className="size-5 text-[#1c1c1c]" />
                  </div>
                </div>
                <h5 className="text-[#121212] text-sm mb-4">Revenue</h5>
                <Skeleton className="w-28 h-7" />
              </div>
              <div className="lg:col-span-4">
                <div className="grid lg:grid-cols-4 gap-6">
                  <div className="card lg:col-span-3">
                    <Chart />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="card">
                      <div>
                        <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                          <BarChart className="size-5 text-[#1c1c1c]" />
                        </div>
                      </div>
                      <h5 className="text-[#121212] text-sm mb-4">
                        PayStack Balance
                      </h5>
                      <Skeleton className="w-36 h-7" />
                    </div>
                    <div className="card">
                      <div>
                        <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                          <BarChart className="size-5 text-[#1c1c1c]" />
                        </div>
                      </div>
                      <h5 className="text-[#121212] text-sm mb-4">
                        SMS Balance
                      </h5>
                      <Skeleton className="w-[90px] h-7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 mb-6">
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-[#121212] text-sm mb-4">
              Senders Wallet Balance
            </h5>
            <Skeleton className="w-24 h-7" />
          </div>
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-[#121212] text-sm mb-4">
              Partners Wallet Balance
            </h5>
            <Skeleton className="w-24 h-7" />
          </div>
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-[#121212] text-sm mb-4">Hubs Wallet Balance</h5>
            <Skeleton className="w-24 h-7" />
          </div>
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-[#121212] text-sm mb-4">Upcoming Payments</h5>
            <Skeleton className="w-12 h-7" />
          </div>
        </div>
      </div>
    );
  if (error) return <div>Error loading data</div>;

  // const [dateRange, setDateRange] = useState([
  //   {
  //     startDate: addDays(new Date("2022-01-01"), 0),
  //     endDate: addDays(new Date(), 1),
  //     key: "selection",
  //   },
  // ])

  // const minDate = dateRange[0].startDate.toISOString().split("T")[0]
  // const maxDate = dateRange[0].endDate.toISOString().split("T")[0]

  // useEffect(() => {
  //   const fetchStatistics = async () => {
  //     try {
  //       const options = {
  //         method: "GET",
  //         headers: new Headers({ Authorization: `Bearer ${token}` }),
  //       };
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard-stats`,
  //         options
  //       );
  //       const total = await response.json();
  //       setTotal(total.data);
  //       setLoading(false);
  //       if (response.status === 401) {
  //         redirect("/login");
  //       }
  //     } catch (error: any) {
  //       toast.error(error.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchStatistics();
  // }, []);
  return (
    <>
      <div>
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-6 gap-y-4 mb-6">
          <div className="card">
            <h5 className="mb-6 text-[#121212] text-sm">Orders</h5>
            <div className="flex justify-between items-center mb-8 text-[#E87000] text-sm font-medium">
              <p className="bg-[#e8700034] py-1 px-4 rounded-full ">Pending</p>

              <p>{total?.order_status_count?.pending}</p>
            </div>
            <div className="flex justify-between items-center mb-8 text-[#9fe800] text-sm font-medium">
              <p className="bg-[#9fe80041] py-1 px-4 rounded-full ">Accepted</p>
              <p>{total?.order_status_count?.accepted}</p>
            </div>
            <div className="flex justify-between items-center mb-8 text-[#00a6e8] text-sm font-medium">
              <p className="bg-[#00a6e829] py-1 px-4 rounded-full ">
                In transit
              </p>
              <p>{total?.order_status_count?.transit}</p>
            </div>
            <div className="flex justify-between items-center mb-8 text-[#059669] text-sm font-medium">
              <p className="bg-[#05966833] py-1 px-4 rounded-full ">
                Completed
              </p>
              <p>{total?.order_status_count?.completed}</p>
            </div>
            <div className="flex justify-between items-center mb-8 text-[#DC1515] text-sm font-medium">
              <p className="bg-[#dc151524] py-1 px-4 rounded-full ">Canceled</p>
              <p>{total?.order_status_count?.cancelled}</p>
            </div>
            <hr className="mb-6" />
            <div className="flex justify-between items-center mb-8 text-[#15103d] text-sm font-medium">
              <p className="bg-[#15103d22] py-1 px-4 rounded-full ">Total</p>
              <p> {total?.order_status_count?.total}</p>
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
              <div className="card">
                <div className="flex justify-between items-center mb-6 text-[#121212]">
                  <h5 className="text-sm">Senders</h5>
                  <p>{total?.user_count}</p>
                </div>
                <div className="flex justify-between items-center text-[#059669] text-sm mb-1">
                  <h5 className="text-sm">Android</h5>
                  <p>{total?.android_user_count}</p>
                </div>
                <div className="flex justify-between items-center text-[#E87000] text-sm">
                  <h5 className="text-sm">iPhone</h5>
                  <p>{total?.ios_user_count}</p>
                </div>
              </div>
              <div className="card">
                <div className="flex justify-between items-center mb-6 text-[#121212]">
                  <h5 className="text-sm">Partners</h5>
                  <p>{total?.partner_count}</p>
                </div>
                <div className="flex justify-between items-center text-[#059669] text-sm mb-1">
                  <h5 className="text-sm">Android</h5>
                  <p>{total?.android_partner_count}</p>
                </div>
                <div className="flex justify-between items-center text-[#E87000] text-sm">
                  <h5 className="text-sm">iPhone</h5>
                  <p>{total?.ios_partner_count}</p>
                </div>
              </div>
              <div className="card">
                <div className="flex justify-between items-center mb-4 text-[#121212]">
                  <h5 className="text-sm">Centers</h5>
                  <p>{total?.centers_count}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-sm">Hubs</h5>
                  <p>{total?.hubs_count}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="text-sm">Sweepers</h5>
                  <p>{total?.sweepers_count}</p>
                </div>
              </div>
              <div className="card">
                <div>
                  <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                    <ChartSpline className="size-5 text-[#1c1c1c]" />
                  </div>
                </div>
                <h5 className="text-[#121212] text-sm mb-4">Revenue</h5>
                <p className="text-lg">₦{total?.total_revenue}</p>
              </div>
              <div className="lg:col-span-4">
                <div className="grid lg:grid-cols-4 gap-6">
                  <div className="card lg:col-span-3">
                    <Chart />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="card">
                      <div>
                        <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                          <BarChart className="size-5 text-[#1c1c1c]" />
                        </div>
                      </div>
                      <h5 className="text-[#121212] text-sm mb-4">
                        PayStack Balance
                      </h5>
                      <p className="text-lg">₦{total?.paystack_balance}</p>
                    </div>
                    <div className="card">
                      <div>
                        <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                          <BarChart className="size-5 text-[#1c1c1c]" />
                        </div>
                      </div>
                      <h5 className="text-[#121212] text-sm mb-4">
                        SMS Balance
                      </h5>
                      <p className="text-lg">₦{total?.termii_balance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 mb-6">
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-[#121212] text-sm mb-4">
              Senders Wallet Balance
            </h5>
            <p className="text-lg">₦{total?.users_wallet_balance}</p>
          </div>
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-[#121212] text-sm mb-4">
              Partners Wallet Balance
            </h5>
            <p className="text-lg">₦{total?.partners_wallet_balance}</p>
          </div>
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-[#121212] text-sm mb-4">Hubs Wallet Balance</h5>
            <p className="text-lg">₦{total?.hubs_wallet_balance}</p>
          </div>

          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-[#121212] text-sm mb-4">Upcoming Payments</h5>
            <p className="text-lg">₦{total?.total_payments}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
