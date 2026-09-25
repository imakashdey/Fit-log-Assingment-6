import Image from "next/image";
import React from "react";
import logo from "../../assests/logo.png";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-black border-t border-[#292D35]">
            <div className="w-full">
                <div className="border-t border-[#292D35]" />

                <div className="px-4 sm:px-6 py-4">
                    <div className="flex flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3">
                                <Image
                                    src={logo}
                                    alt="FITLOG Logo"
                                    width={40}
                                    height={40}
                                />

                                <span className="text-[18px] md:text-2xl font-bold text-white">
                                    FITLOG
                                </span>
                            </Link>
                        </div>

                        <p className="text-[#9CA3AF] text-xs text-right">
                            © 2026 FitLog — Workout Library.
                            <span className="hidden sm:inline">
                                {" "}Train hard, log honest.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;