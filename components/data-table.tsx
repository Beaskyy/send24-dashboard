"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  tableName: string;
  currentPage: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  tableName,
  currentPage,
  totalPages,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 50,
        pageIndex: 0,
      },
    },
    manualPagination: true,
    pageCount: totalPages || 1,
  });

  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const totalItems = table.getFilteredRowModel().rows.length;
  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalItems);

  return (
    <div className="w-full mb-6">
      <div className="card">
        <div className="flex flex-col lg:flex-row justify-between items-start ml-[23px] mr-[33px] py-4">
          {tableName !== "Payments" && (
            <h4 className="text-lg text-[#060809] font-medium leading-9">
              {tableName}
            </h4>
          )}
          <div
            className={`flex items-center gap-2 ${
              tableName === "Payments" && "flex-row-reverse"
            }`}
          >
            {/* <Button className="bg-white text-[#060809] text-sm font-normal py-4 px-5 border border-[#F3F3F3]  hover:bg-[#f7f7f7]">
              <Image
                src="/images/filter.svg"
                alt="filter"
                width={20}
                height={20}
                className="mr-1"
              />
              Filter by
            </Button> */}
            <div className="relative">
              <Image
                src="/images/search.svg"
                alt="Search"
                width={20}
                height={20}
                className="absolute top-3 left-2"
              />
              <Input
                placeholder={`Search by ${
                  tableName === "Payments"
                    ? "member name..."
                    : "user name or email "
                }`}
                value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="lg:min-w-[373px] w-full placeholder:text-[#B3B3B3] placeholder:text-sm px-8"
              />
            </div>
            {/* {tableName !== "Payments" && (
              <Button className="bg-white text-[#060809] text-sm font-normal py-2 pr-4 pl-3 border border-[#F3F3F3]  hover:bg-[#f7f7f7]">
                <Image
                  src="/images/export.svg"
                  alt="export"
                  width={20}
                  height={20}
                  className="mr-1"
                />
                Export
              </Button>
            )} */}
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-xs text-[#414141] font-semibold leading-[20.3px] uppercase bg-[#F9F9F9] px-6 py-4 first:rounded-tl-xl last:rounded-tr-xl"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-sm text-[#414141] font-normal leading-[20.3px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex lg:flex-row flex-col justify-between items-end lg:items-center gap-4 p-6 border-t border-[#E6E6E6]">
          <div className="text-sm text-[#414141] font-semibold">
            Showing {startItem} to {endItem} of {totalItems} results
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border border-[#F2F4F7] p-2 bg-white"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </Button>
            {Array.from({ length: table.getPageCount() }, (_, index) => {
              const isActive = table.getState().pagination.pageIndex === index;
              return (
                <Button
                  key={index}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(index)}
                  className={`rounded-full bg-transparent border-none p-[13px] ${
                    table.getState().pagination.pageIndex === index &&
                    "bg-black text-white"
                  }`}
                >
                  {index + 1}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border border-[#F2F4F7] p-2 bg-white"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
