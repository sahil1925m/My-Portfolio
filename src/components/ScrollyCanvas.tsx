'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { getFrameUrl, FRAME_COUNT } from '@/utils/canvas-utils';

interface ScrollyCanvasProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollyCanvas({ containerRef }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Preload Images
    // 1. Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFrameUrl(i);

            const handleLoad = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                    setImages(imgArray);
                }
            };

            img.onload = handleLoad;
            img.onerror = () => {
                console.error(`Failed to load frame: ${i} (${img.src})`);
                handleLoad(); // Proceed anyway
            };

            imgArray.push(img);
        }
    }, []);

    // 2. Scroll Hook
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // 3. Render Logic (The Engine)
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // "Object-Fit: Cover" Logic for Canvas
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // 4. Update on Scroll
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (!isLoaded) return;

        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // 5. Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (isLoaded) renderFrame(0);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded]);

    return (
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
            <canvas ref={canvasRef} className="block w-full h-full" />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
                    <span className="text-white/50 animate-pulse font-mono text-xs tracking-[0.2em]">
                        INITIALIZING SAHIL.SYSTEM...
                    </span>
                </div>
            )}
        </div>
    );
}
