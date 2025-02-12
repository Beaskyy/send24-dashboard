import { useEffect, useState, useRef } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import token from "@/lib/access-token";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface User {
  uuid: string;
  full_name: string;
}

export const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce function
  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Search Users
  const searchUser = async () => {
    if (!search) {
      setSearchResult([]);
      return;
    }

    try {
      const options = {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          search,
        }),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/search`,
        options
      );
      const data = await response.json();
      setSearchResult(data["data"]["users"]);
      if (data.status === "success") {
        console.log(data["data"]["users"]);
      } else if (data.status === "error") {
        toast.error(data["message"]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  // Debounced search function
  const debouncedSearchUser = debounce(searchUser, 500);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchContainerRef}>
      <Input
        className="md:w-[400px] w-full"
        placeholder="Search sender by name or email address"
        onChange={(e) => {
          setSearch(e.target.value);
          debouncedSearchUser();
          setShowResults(true);
        }}
      />
      {showResults && searchResult.length > 0 && (
        <div className="absolute z-50 bg-white w-full h-40 mt-2 rounded-lg overflow-y-auto shadow">
          {searchResult.map((item) => (
            <Button
              key={item.uuid}
              onClick={() => router.push(`/senders/${item.uuid}`)}
              variant="ghost"
              className="w-full justify-start rounded-none"
            >
              {item.full_name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};