"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, orderColumns } from "@tanstack/react-table";
import { Dot, ArrowUpDown, MoreHorizontal, ArrowUp } from "lucide-react";
import { CellAction } from "./cell-action";
import Image from "next/image";

export type OrdersColumn = {
  uuid: number;
  price: string;
  payment_status: string;
  current_location_type: string;
  current_phase: string;
  current_status: string;
  created_at: string;
  status: string;
  package: {
    label: string;
    images: string[];
  };
  user: {
    full_name: string;
    phone: string;
  };
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Label
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },

    cell: ({ row }) => {
      const order = row.original.package; // Extracting 'order' from the row data

      return (
        <div className="flex flex-col gap-1">
          {order?.images.length !== 0 && (
            <Image
              src={`${
                process.env.NEXT_PUBLIC_IMAGE_URL
              }/download/${encodeURIComponent(order.images[0])}`}
              alt={order.label} // Using the order's label for the alt text
              className="rounded"
              width={32}
              height={32}
            />
          )}
          <span className="text-xs">{order.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "current_location_type",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          Current Location
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
    cell: (info) => {
      const current_location_type = info.getValue() as string;
      const current_phase = info.row.original.current_phase;

      return (
        <span className="flex justify-center items-center gap-2 py-1 pr-4 pl-3 rounded-[20px] text-sm font-medium w-fit">
          <span>
            {current_location_type === "Sender" ||
            current_location_type === "Recipient"
              ? current_location_type
              : current_phase === "center_to_center" ||
                current_phase === "hub_to_sweeper" ||
                current_phase === "partner_to_center" ||
                current_phase === "sweeper_to_center"
              ? `Origin ${current_location_type}`
              : current_phase === "center_to_partner" ||
                current_phase === "center_to_sweeper" ||
                current_phase === "hub_to_recipient" ||
                current_phase === "parner_to_recipient" ||
                current_phase === "sweeper_to_hub"
              ? `Destination ${current_location_type}`
              : ""}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          Payment Status
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
    cell: (info) => {
      const paymentStatus = info.getValue() as string;
      const statusStyle =
        paymentStatus === "completed"
          ? { color: "#039855" }
          : { color: "#414141" };

      return (
        <span
          style={statusStyle}
          className="flex justify-center items-center gap-2 py-1 pr-4 pl-3 rounded-[20px] text-sm font-medium w-fit"
        >
          {paymentStatus}
        </span>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Sender
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <>
        <div className="whitespace-nowrap">{row.original.user?.full_name}</div>
      </>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Time Created
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.original.created_at}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Status
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
    cell: (info) => {
      const status = info.getValue() as string;
      const statusStyle =
        status === "completed"
          ? { color: "#039855", backgroundColor: "#ECFDF3" }
          : status === "pending"
          ? { color: "#E87000", backgroundColor: "#e870002a" }
          : status === "accepted"
          ? { color: "#0ec3cd", backgroundColor: "#0ecda027" }
          : status === "transit"
          ? { color: "#2ebdf6", backgroundColor: "#2ebdf61b" }
          : { color: "#D92D20", backgroundColor: "#d92c2016" };

      return (
        <span
          style={statusStyle}
          className="flex justify-center items-center gap-2 py-1 pr-4 pl-3 rounded-[20px] text-sm font-medium w-fit"
        >
          {status === "completed" ? (
            <Image src="/images/dot.svg" alt="dot" width={5} height={5} />
          ) : status === "pending" ? (
            <Image
              src="/images/dot-warning.svg"
              alt="dot"
              width={5}
              height={5}
            />
          ) : status === "transit" ? (
            <Image
              src="/images/dot-transit.svg"
              alt="dot"
              width={5}
              height={5}
            />
          ) :  status === "accepted" ? (
            <Image
              src="/images/dot-accepted.svg"
              alt="dot"
              width={5}
              height={5}
            />
          ) : (
            <Image
              src="/images/dot-danger.svg"
              alt="dot"
              width={5}
              height={5}
            />
          )}

          <span>{status}</span>
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
