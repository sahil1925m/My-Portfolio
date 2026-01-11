"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
    text: string;
    duration?: number;
    className?: string;
    delay?: number;
    loop?: boolean;
    loopDelay?: number;
}

export function TypingAnimation({
    text,
    duration = 200,
    className,
    delay = 0,
    loop = false,
    loopDelay = 2000,
}: TypingAnimationProps) {
    const [displayedText, setDisplayedText] = useState<string>("");
    const [isTyping, setIsTyping] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Initial delay before starting animation
        const delayTimeout = setTimeout(() => {
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(delayTimeout);
    }, [delay]);

    useEffect(() => {
        if (!isTyping) return;

        let timeout: NodeJS.Timeout;

        if (!isDeleting) {
            // Typing phase
            if (displayedText.length < text.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(text.substring(0, displayedText.length + 1));
                }, duration);
            } else if (loop) {
                // Finished typing, wait before deleting
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, loopDelay);
            }
        } else {
            // Deleting phase (for loop)
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(text.substring(0, displayedText.length - 1));
                }, duration / 2);
            } else {
                // Finished deleting, start typing again
                setIsDeleting(false);
            }
        }

        return () => clearTimeout(timeout);
    }, [isTyping, displayedText, text, duration, loop, loopDelay, isDeleting]);

    return (
        <h1
            className={cn(
                "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
                className,
            )}
        >
            {displayedText}
        </h1>
    );
}
