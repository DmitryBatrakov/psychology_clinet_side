"use client";

import { FaTelegramPlane } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactUs() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl min-h-full flex flex-col gap-5 items-center justify-center">
                <div className="w-full my-5">
                    <h1 className="text-4xl font-medium">צור קשר איתנו</h1>
                </div>
                <div className="flex flex-col gap-5 w-full ">
                    <div className=" flex-1 flex flex-col bg-gray-200 p-5 rounded-2xl">
                        <h2 className="text-lg font-medium text-gray">
                            פרטי התקשרות
                        </h2>
                        <div className="flex gap-5 justify-around items-center h-24">
                            <div className="flex flex-col gap-2">
                                <span>אימייל:</span>
                                <span>example@gmail.com</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span>רשתות חברתיות</span>
                                <div className="flex justify-around text-gray-600">
                                    <span className="md:hover:scale-110 transition-transform">
                                        <BsInstagram size={20} />
                                    </span>
                                    <span className="md:hover:scale-110 transition-transform">
                                        <FaFacebook size={20} />
                                    </span>
                                    <span className="md:hover:scale-110 transition-transform">
                                        <FaTelegramPlane size={21} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-gray-200 p-5 rounded-2xl flex flex-col gap-5">
                        <h2 className="text-lg font-medium text-gray">
                            שאלת שאלה
                        </h2>
                        <div className="grid w-full gap-3">
                            <Label htmlFor="message">ההודעה שלך</Label>
                            <Textarea
                                placeholder="נשמח לשמוע ממך..."
                                className="bg-white min-h-32"
                            />
                            <Button className="">שלח</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
