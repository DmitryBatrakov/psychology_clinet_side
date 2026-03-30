import Image from "next/image";

export const Hero = () => {
    return (
        <section className="w-full h-full  flex flex-col items-center justify-center">
            <div className="flex items-center justify-start gap-20 w-full relative px-45 min-h-[calc(100vh-80px)]">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="">
                        <h1 className="text-[2.5rem] font-normal">
                            זה המקום הבטוח שלך
                        </h1>
                        <p className="text-[1.2rem] font-base text-muted-foreground">
                            המסע אל עצמך מתחיל בצעד אחד קטן. פשוט לדבר על זה
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-4 w-full">
                        <button className="bg-primary text-white px-4 py-2 rounded-full w-full max-w-xs ">
                            לתאמת טיפול
                        </button>
                        <button className="bg-primary text-white px-4 py-2 rounded-full w-full max-w-sm">
                            אנשי מקצוע
                        </button>
                    </div>
                </div>
                <div className=" w-[300px] h-[300px] absolute left-80 bottom-20">
                    <Image
                        src="/assets/images/hero/imageHero.png"
                        alt="Hero"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
};
