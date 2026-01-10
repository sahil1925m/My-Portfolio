'use client';

import { useRef } from 'react';
import ScrollyCanvas from './ScrollyCanvas';
import Overlay from './Overlay';

export default function ScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            <ScrollyCanvas containerRef={containerRef} />
            <Overlay />
        </div>
    );
}
