"use client";

import { SWRConfig, SWRConfiguration } from "swr";
import React, { ReactNode } from "react";
import { useStateContext } from "@/contexts/ContextProvider";

// Use a Map to store cached JSON responses
const cacheProvider = new Map<string, any>();

interface SWRProviderProps {
  children: ReactNode;
}

export const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  const { token } = useStateContext();

  const fetcher = async (url: string, options?: RequestInit): Promise<any> => {
    const cachedResponse = cacheProvider.get(url);

    if (cachedResponse) {
      return Promise.resolve(cachedResponse);
    }

    const fetchOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      }),
    };

    return fetch(url, fetchOptions)
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        cacheProvider.set(url, data);
        return data;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        throw error;
      });
  };

  const swrOptions: SWRConfiguration = {
    fetcher,
  };

  return (
    <SWRConfig value={swrOptions}>
      {children}
    </SWRConfig>
  );
};
