import Image from "next/image";

export const Hero = () => {
    return (
        <section className="w-full h-full  flex flex-col items-center justify-center overflow-x-clip">
            <div className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-around gap-15 pt-10 w-full px-4 min-h-screen relative">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[340px] h-[340px] md:w-[560px] md:h-[560px] lg:w-[1100px] lg:h-[1100px] z-10">
                        <Image
                            src="/assets/images/hero/VectorGreen.png"
                            alt=""
                            fill
                            className="object-contain object-top-left"
                        />
                    </div>
                    <div className="absolute top-0 left-0 w-[320px] h-[320px] md:w-[530px] md:h-[530px] lg:w-[1000px] lg:h-[1000px]">
                        <Image
                            src="/assets/images/hero/VectorYellow.png"
                            alt=""
                            fill
                            className="object-contain object-top-left"
                        />
                    </div>
                </div>
                <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[380px] lg:h-[380px] top-5 left-5 md:left-0 md:top-0 lg:top-0 lg:left-20 z-20 lg:translate-x-1/2 lg:translate-y-1/2">
                    <Image
                        src="/assets/images/hero/imageHero.png"
                        alt="Hero"
                        fill
                        className="object-cover absolute bottom-0 left-0 "
                    />
                <div className="relative w-[150px] h-[150px] -left-9 top-31 md:w-[200px] md:h-[200px] md:-left-10 md:top-37 lg:w-[250px] lg:h-[200px] lg:left-20 lg:top-70 -z-10">
                    <Image
                        src="/assets/images/hero/EllipseGray.svg"
                        alt="Elips Gray"
                        fill
                        className="object-contain absolute"
                    />
                </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 realtive z-30">
                    <div className="flex flex-col items-start justify-start gap-5 w-full">
                        <h1 className="text-[2rem] font-normal">
                            <strong>Logo</strong> - זה המקום הבטוח שלך
                        </h1>
                        <div className="flex flex-col items-start justify-start md:items-center md:justify-center lg:items-start lg:justify-start gap-2 w-full">
                            <span className="text-[1rem] font-base text-muted-foreground">
                                המסע אל עצמך מתחיל בצעד אחד קטן.
                            </span>
                            <span className="text-[1rem] font-base text-muted-foreground">
                                פשוט לדבר על זה
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center lg:justify-start lg:items-start  gap-4 w-full">
                        <button className="bg-primary text-foreground px-4 py-3 rounded-full w-full max-w-xs hover:bg-primary/80 cursor-pointer shadow-md">
                            לתאמת טיפול
                        </button>
                        <button className="bg-secondary text-foreground px-4 py-3 rounded-full w-full max-w-xs hover:bg-secondary/80 cursor-pointer shadow-md">
                            אנשי מקצוע
                        </button>
                    </div>
                </div>
                <div className="absolute top-10 left-0 md:left-0 md:top-45 lg:top-0 lg:left-0 w-full md:h-[450px] lg:h-[1000px] rotate-7 -z-10 hidden md:block">
                    <Image
                        src="/assets/images/hero/VectorPinkLine.svg"
                        alt=""
                        fill
                        className="object-fill"
                    />
                </div>
            </div>
        </section>
    );
};
