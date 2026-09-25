import Image from "next/image";
import React from "react";
import banner from "../../assests/banner.png";

const HeroSection = () => {
    return (
        <section className="px-6 py-8">
            <div className="bg-[#15171D] rounded-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 p-8 md:p-10 lg:p-12">

                    {/* Left Content */}
                    <div className="max-w-2xl">
                        <h6 className="text-[#C2F800] font-bold text-[11px] tracking-wider mb-4">
                            WORKOUT LIBRARY
                        </h6>

                        <h2 className="font-bold text-white text-4xl md:text-5xl lg:text-[60px]">
                            TRAIN WITH INTENT.
                            <br />
                            LOG EVERY SET.

                        </h2>

                        <p className="text-[#9CA3AF] font-normal text-[16px] leading-7 mt-6 max-w-xl">
                            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                            into today&apos;s plan, and watch the week&apos;s work add up.
                        </p>
                        <div className="mt-6">
                            <button className="btn btn-lg text-[13px] bg-[#C2F800] text-black font-bold rounded-md ">
                                BROWSE WORKOUTS
                            </button>
                        </div>
                    </div>

                    {/* Banner Image */}
                    <div className="w-full max-w-md lg:max-w-lg">
                        <Image
                            src={banner}
                            alt="FitLog workout banner"
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;