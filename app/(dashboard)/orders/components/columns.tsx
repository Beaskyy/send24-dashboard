"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Dot, ArrowUpDown, MoreHorizontal, ArrowUp } from "lucide-react";
import { CellAction } from "./cell-action";
import Image from "next/image";

export type AssociationsColumn = {
  id: number;
  image: string;
  name: string;
  members: number;
  contact_person: string;
  email: string;
  phone: string;
  created_at: string;
  status: string;
};

export const columns: ColumnDef<AssociationsColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Name
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="flex items-center space-x-2.5 w-[216px]">
        <Image
          src={row.original.image}
          alt={row.original.name}
          className="rounded-full"
          width={32}
          height={32}
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "members",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Members
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "contact_person_email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Contact Person
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div>
        <div className="text-base">{row.original.contact_person}</div>
        <div className="text-[#7B7B7B]">{row.original.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Phone No
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Joined Date
          <ArrowUp className="text-[#707070] w-4 h-4" />
        </div>
      );
    },
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
        status === "Active"
          ? { color: "#039855", backgroundColor: "#ECFDF3" }
          : { color: "#414141", backgroundColor: "#F9F9F9" };

      return (
        <span
          style={statusStyle}
          className="flex justify-center items-center gap-2 py-1 pr-4 pl-3 rounded-[20px] text-sm font-medium w-fit"
        >
          {status=== "Active" ? (
            <Image src="/images/dot.svg" alt="dot" width={8} height={8} />
          ) : (
            <Image
              src="/images/dot-inactive.svg"
              alt="dot"
              width={8}
              height={8}
            />
          )}

          <span>{status}</span>
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
];
