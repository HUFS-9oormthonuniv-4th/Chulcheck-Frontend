"use client";

import { useState } from "react";

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const STALE_TIME = 5 * 60 * 1000; // 5분
const CACHE_TIME = 10 * 60 * 1000; // 10분

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: STALE_TIME,
            gcTime: CACHE_TIME,
            retry: 3,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryClientProvider>
  );
}
