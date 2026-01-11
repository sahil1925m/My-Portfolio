'use client';

import { LoadingProvider } from "@/context/LoadingContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LoadingProvider>
            <LoadingScreen />
            {children}
        </LoadingProvider>
    );
}
