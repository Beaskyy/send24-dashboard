"use client";

import Image from "next/image";
import { OrdersColumn } from "./columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: OrdersColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <span className="sr-only">Open menu</span>
            <Image src="/images/dots.svg" alt="dots" width={32} height={32} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/orders/${data.uuid}`)}>
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
