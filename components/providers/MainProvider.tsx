// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";

const queryClient = new QueryClient()

export default function MainProvider({ children }: { children: ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    );
}
