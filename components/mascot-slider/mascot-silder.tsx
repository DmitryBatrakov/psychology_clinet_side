"use client";

import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import cloudProfile from "@/assets/mascots/cloud-profile.svg";
import cloudCalm from "@/assets/mascots/cloud-calm.svg";
import cloudHeart from "@/assets/mascots/cloud-heart.svg";
import cloudLantern from "@/assets/mascots/cloud-lantern.svg";
import cloudTrophy from "@/assets/mascots/cloud-trophy.svg";
import cloudSmile from "@/assets/mascots/cloud-smile.svg";
import cloudPajamas from "@/assets/mascots/cloud-pajamas.svg";
import cloudSleeping from "@/assets/mascots/cloud-sleeping.svg";
import cloudPhone from "@/assets/mascots/cloud-phone.svg";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

type MascotList = {
    label: string;
    photo: string;
    src: typeof cloudProfile;
};

const mascotList: MascotList[] = [
    { label: "להבין את הרגשות שלי", photo: "photo1", src: cloudProfile },
    { label: "להתמודד עם לחץ וחרדה", photo: "photo2", src: cloudCalm },
    { label: "להתמודד עם טראומה", photo: "photo3", src: cloudHeart },
    { label: "להתגבר על פחדים", photo: "photo4", src: cloudLantern },
    { label: "לבנות ביטחון עצמי", photo: "photo5", src: cloudTrophy },
    { label: "לשפר מערכות יחסים", photo: "photo6", src: cloudSmile },
    { label: "לחזור לשגרת שינה בריאה", photo: "photo7", src: cloudPajamas },
    { label: "לעבד אובדן", photo: "photo8", src: cloudSleeping },
    { label: "למצוא תמיכה בתקופה מאתגרת", photo: "photo9", src: cloudPhone },
];

export const MascotSlider = () => {
    return (
        <section className="w-full flex flex-col gap-10 items-center justify-center overflow-hidden py-5 pb-15">
            <h1 className="text-3xl text-foreground font-semibold">במה אנחנו יכולים לעזור?</h1>
            <Carousel
                opts={{
                    loop: true,
                    align: "start",
                    direction: "rtl",
                    watchDrag: false,
                }}
                plugins={[
                    AutoScroll({
                        speed: 1.5,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent className="-ml-16">
                    {mascotList.map((item) => (
                        <CarouselItem
                            key={item.photo}
                           className="pl-16 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                        >
                            <div className="flex flex-col items-center justify-start gap-3 px-4">
                                <div className="w-full aspect-4/3 flex items-center justify-center min-h-70">
                                    <Image
                                        src={item.src}
                                        alt={item.label}
                                        width={400}
                                        height={300}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <p className="text-xl text-muted-foreground font-semibold text-center">{item.label}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
};
