import { BarChart, ChartSpline, Filter } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import Chart from "../Chart";

export const DashboardSkeletons = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-medium">Dashboard Home</h2>
        <div className="flex md:flex-row flex-col-reverse md:items-center gap-4">
          <Skeleton className="w-28 h-12" />
          <div>
          <Skeleton className="md:w-[400px] w-full h-12" />
          </div>
        </div>
      </div>
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
            <p className="bg-[#00a6e829] py-1 px-4 rounded-full ">In transit</p>
            <Skeleton className="w-10 h-6" />
          </div>
          <div className="flex justify-between items-center mb-8 text-[#059669] text-sm font-medium">
            <p className="bg-[#05966833] py-1 px-4 rounded-full ">Completed</p>
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
                    <h5 className="text-[#121212] text-sm mb-4">SMS Balance</h5>
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
};
