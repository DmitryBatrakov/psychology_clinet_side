"use client";

import { Hero } from "@/components/hero/Hero";
import { MascotSlider } from "@/components/mascot-slider/mascot-silder";

export default function Home() {
    return (
        <div className="flex flex-col items-start justify-center gap-6">
            <Hero />
            <MascotSlider />
        </div>
    );
}
