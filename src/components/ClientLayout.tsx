'use client';

import { LoadingProvider } from "@/context/LoadingContext";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LoadingProvider>
            <SmoothScroll />
            <CustomCursor />
            <LoadingScreen />
            {children}
        </LoadingProvider>
    );
}
