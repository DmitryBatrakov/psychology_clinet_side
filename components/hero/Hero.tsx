import Image from "next/image";
import blueSpot from '@/assets/hero/blue-spot.svg'
import greenSpot from '@/assets/hero/green-spot.svg'
import blueLine from '@/assets/hero/blue-line.svg'
import pinkLines from '@/assets/hero/pink-lines.svg'
import claudeSmile from '@/assets/mascots/cloud-smile.svg'
import { motion } from "motion/react";

export const Hero = () => {
    return (
        <section className="w-full min-h-screen  flex flex-col items-center justify-center overflow-x-clip relative">
            <div className="relative z-20 flex flex-col items-center justify-start pt-40 md:justify-center md:pt-10 gap-15  w-full px-4 min-h-screen">
                <motion.div
                    className="flex flex-col items-center justify-center gap-12 max-w-xl"
                    transition={{ duration: 0.5, ease: 'circInOut' }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                >
                    <div className="flex flex-col items-center justify-start gap-5 w-full text-center">
                        <h1 className="text-[1.8rem] font-normal">
                            <strong>Logo</strong> - זה המקום הבטוח שלך
                        </h1>
                        <div className="flex flex-wrap flex-col items-center justify-center gap-0 max-w-70 w-full ">
                            <span className="font-base text-muted-foreground text-[1.4rem]">
                                המסע אל עצמך מתחיל בצעד אחד קטן.
                                פשוט לדבר על זה
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 w-full text-[16px] max-w-50 md:max-w-none">
                        <button className="bg-accent text-accent-foreground px-4 py-2 rounded-full w-full max-w-xs cursor-pointer shadow-md">
                            לתאמת טיפול
                        </button>
                        <button className="bg-border text-accent-foreground px-4 py-2 rounded-full w-full max-w-xs cursor-pointer shadow-md">
                            אנשי מקצוע
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    className="flex items-end justify-end absolute bottom-30 w-full lg:left-[8%] lg:top-1/2 lg:-translate-y-1/2"
                    transition={{ duration: 0.5, ease: 'circInOut', delay: 0.1 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    <Image
                        src={claudeSmile}
                        alt=""
                        className="w-75 md:w-90 lg:w-120 h-auto relative z-30"
                        priority
                    />
                </motion.div>
            </div>
            <Image
                src={greenSpot} 
                alt=""
                className="absolute top-0 right-0 z-0 max-w-206.75 h-auto w-76  md:w-110  lg:w-206.75"
                priority
            />
            <Image
                src={blueSpot}
                alt=""
                className="absolute top-0 right-0 z-10 max-w-174 h-auto w-65 md:w-90 lg:w-174"
                priority
            />
            <Image
                src={blueLine}
                alt=""
                className="absolute top-40 md:top-55 lg:top-72 right-0 z-20 max-w-43 w-13 md:w-20 lg:w-43 h-auto"
                priority
            />
            <Image
                src={pinkLines}
                alt=""
                className="absolute bottom-25 md:top-55 lg:top-120 left-0 z-10 max-w-43 w-31 md:w-20 lg:w-67 h-auto"
                priority
            />
        </section>
    );
};
