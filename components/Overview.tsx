import { BarChart, ChartSpline, Filter } from "lucide-react";
import Chart from "./Chart";
import axios from "axios";
import { DateRangePicker } from "react-date-range";
import { useQuery } from "@tanstack/react-query";
import { Search } from "./Search";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import token from "@/lib/access-token";
import { useState } from "react";
import { DashboardSkeletons } from "./skeletons/DashboardSkeletons";
import { DashboardStats } from "@/types";

const fetchDashboardStats = async (
  minDate: string,
  maxDate: string
): Promise<DashboardStats> => {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(
    `${apiUrl}/admin/dashboard-stats?date_range=${minDate},${maxDate}`,
    { headers }
  );
  return response.data.data;
};

const Overview = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: addDays(new Date("2022-01-01"), 0),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const minDate = dateRange[0].startDate.toISOString().split("T")[0];
  const maxDate = dateRange[0].endDate.toISOString().split("T")[0];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-stats", minDate, maxDate],
    queryFn: () => fetchDashboardStats(minDate, maxDate),
  });

  // Handle loading and error states
  if (isLoading) return <DashboardSkeletons />;
  if (isError) return <div>{error.message}</div>;

  const total = data;

  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Dashboard Home</h2>
        <div className="flex md:flex-row flex-col-reverse md:items-center gap-4">
          <Dialog>
            <DialogTrigger className="flex items-center cursor-pointer h-12 px-8 bg-primary rounded-lg text-white w-fit">
              <div className="flex items-center gap-1">
                <Filter className="text-white size-5" />{" "}
                <span className="text-sm">Filter</span>
              </div>
            </DialogTrigger>
            <DialogContent className="md:min-w-[600px]">
              <DialogHeader>
                <DialogTitle>Filter Options</DialogTitle>
                <DialogDescription>
                  <DateRangePicker
                    // @ts-ignore
                    onChange={(item) => setDateRange([item.selection])}
                    // @ts-ignore
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={dateRange}
                    direction="horizontal"
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Search />
        </div>
      </div>
      <div></div>
      <div>
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-6 gap-y-4 mb-6">
          <div className="card">
            <h5 className="mb-6 text-[#656565] text-sm font-semibold">Orders</h5>
            <div className="flex justify-between items-center mb-8 text-[#E87000] text-sm font-semibold">
              <p className="bg-[#e8700034] py-1 px-4 rounded-full">Pending</p>

              <p className="font-semibold">
                {total?.order_status_count?.pending}
              </p>
            </div>
            <div className="flex justify-between items-center mb-8 text-[#9fe800] text-sm font-semibold">
              <p className="bg-[#9fe80041] py-1 px-4 rounded-full ">Accepted</p>
              <p className="font-semibold">
                {total?.order_status_count?.accepted}
              </p>
            </div>
            <div className="flex justify-between items-center mb-8 text-[#00a6e8] text-sm font-semibold">
              <p className="bg-[#00a6e829] py-1 px-4 rounded-full ">
                In transit
              </p>
              <p className="font-semibold">
                {total?.order_status_count?.transit}
              </p>
            </div>
            <div className="flex justify-between items-center mb-8 text-[#059669] text-sm font-semibold">
              <p className="bg-[#05966833] py-1 px-4 rounded-full">Completed</p>
              <p className="font-semibold">
                {total?.order_status_count?.completed}
              </p>
            </div>
            <div className="flex justify-between items-center mb-8 text-[#DC1515] text-sm font-semibold">
              <p className="bg-[#dc151524] py-1 px-4 rounded-full ">Canceled</p>
              <p className="font-semibold">
                {total?.order_status_count?.cancelled}
              </p>
            </div>
            <hr className="mb-6" />
            <div className="flex justify-between items-center mb-8 text-[#15103d] text-sm font-semibold">
              <p className="bg-[#15103d22] py-1 px-4 rounded-full ">Total</p>
              <p className="font-semibold">
                {total?.order_status_count?.total}
              </p>
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 font-medium">
              <div className="card">
                <div className="flex justify-between items-center mb-6 text-[#121212]">
                  <h5 className="text-sm text-[#656565]">Senders</h5>
                  <p className="font-semibold">{total?.user_count}</p>
                </div>
                <div className="flex justify-between items-center text-[#059669] text-sm mb-1">
                  <h5 className="text-sm">Android</h5>
                  <p className="font-semibold">{total?.android_user_count}</p>
                </div>
                <div className="flex justify-between items-center text-[#E87000] text-sm">
                  <h5 className="text-sm">iPhone</h5>
                  <p className="font-semibold">{total?.ios_user_count}</p>
                </div>
              </div>
              <div className="card">
                <div className="flex justify-between items-center mb-6 text-[#121212]">
                  <h5 className="text-sm text-[#656565]">Partners</h5>
                  <p className="font-semibold">{total?.partner_count}</p>
                </div>
                <div className="flex justify-between items-center text-[#059669] text-sm mb-1">
                  <h5 className="text-sm">Android</h5>
                  <p className="font-semibold">
                    {total?.android_partner_count}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[#E87000] text-sm">
                  <h5 className="text-sm">iPhone</h5>
                  <p className="font-semibold">{total?.ios_partner_count}</p>
                </div>
              </div>
              <div className="card">
                <div className="flex justify-between items-center mb-4 text-[#121212]">
                  <h5 className="text-sm text-[#656565]">Centers</h5>
                  <p className="font-semibold">{total?.centers_count}</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-sm text-[#656565]">Hubs</h5>
                  <p className="font-semibold">{total?.hubs_count}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="text-sm text-[#656565]">Sweepers</h5>
                  <p className="font-semibold">{total?.sweepers_count}</p>
                </div>
              </div>
              <div className="card">
                <div>
                  <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                    <ChartSpline className="size-5 text-[#1c1c1c]" />
                  </div>
                </div>
                <h5 className="text-sm text-[#656565] mb-4">Revenue</h5>
                <p className="text-lg font-semibold">₦{total?.total_revenue}</p>
              </div>
              <div className="lg:col-span-4">
                <div className="grid lg:grid-cols-4 gap-6">
                  <div className="card lg:col-span-3">
                    <Chart />
                  </div>
                  <div className="grid grid-cols-1 gap-6 w-full">
                    <div className="card">
                      <div>
                        <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                          <BarChart className="size-5 text-[#1c1c1c]" />
                        </div>
                      </div>
                      <h5 className="text-sm text-[#656565] mb-4">
                        PayStack Balance
                      </h5>
                      <p className="text-lg font-semibold">₦{total?.paystack_balance}</p>
                    </div>
                    <div className="card">
                      <div>
                        <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                          <BarChart className="size-5 text-[#1c1c1c]" />
                        </div>
                      </div>
                      <h5 className="text-sm text-[#656565] mb-4">
                        SMS Balance
                      </h5>
                      <p className="text-lg font-semibold">₦{total?.termii_balance}</p>
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
            <h5 className="text-sm text-[#656565] mb-4">
              Senders Wallet Balance
            </h5>
            <p className="text-lg font-semibold">₦{total?.users_wallet_balance}</p>
          </div>
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-sm text-[#656565] mb-4">
              Partners Wallet Balance
            </h5>
            <p className="text-lg font-semibold">₦{total?.partners_wallet_balance}</p>
          </div>
          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-sm text-[#656565] mb-4">Hubs Wallet Balance</h5>
            <p className="text-lg font-semibold">₦{total?.hubs_wallet_balance}</p>
          </div>

          <div className="card">
            <div>
              <div className="rounded-lg p-1.5 bg-[#F2F3F7] w-fit flex justify-center items-center mb-2">
                <BarChart className="size-5 text-[#1c1c1c]" />
              </div>
            </div>
            <h5 className="text-sm text-[#656565] mb-4">Upcoming Payments</h5>
            <p className="text-lg font-semibold">₦{total?.total_payments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
