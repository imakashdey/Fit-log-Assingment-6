"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Logo from "../../assests/logo.png";
import { WorkoutContext } from "../../context/WorkoutProvider";

const Navbar = () => {
  const { plan, saved } = useContext(WorkoutContext);
  const pathname = usePathname();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/details");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md">
      <div className="navbar px-4  ">

        {/* Left Side */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-transparent lg:hidden text-white"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Mobile Dropdown */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-[#15171D] border border-[#292D35] rounded-box z-50 mt-3 w-52 p-2 shadow text-white"
            >
              <li>
                <Link
                  href="/"
                  className={isWorkoutsActive ? "bg-[#1A2312] text-[#C2F800] font-bold" : ""}
                >
                  Workouts
                </Link>
              </li>

              <li>
                <Link
                  href="/my-plan"
                  className={isMyPlanActive ? "bg-[#1A2312] text-[#C2F800] font-bold" : ""}
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl"
          >
            <Image
              src={Logo}
              alt="FITLOG Logo"
              width={40}
              height={40}
            />

            <span className="text-[18px] md:text-2xl font-bold text-white tracking-tight">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex font-semibold">
          <ul className="menu menu-horizontal px-1 text-[13px] gap-2">

            <li>
              <Link
                href="/"
                className={`px-4 py-1.5 rounded-full transition ${
                  isWorkoutsActive
                    ? "bg-[#1A2312] text-[#C2F800] font-bold"
                    : "text-white/80 hover:bg-[#1A2312] hover:text-[#C2F800]"
                }`}
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/my-plan"
                className={`px-4 py-1.5 rounded-full transition ${
                  isMyPlanActive
                    ? "bg-[#1A2312] text-[#C2F800] font-bold"
                    : "text-white/80 hover:bg-[#1A2312] hover:text-[#C2F800]"
                }`}
              >
                My Plan
              </Link>
            </li>

          </ul>
        </div>

        {/* Right Side - Plan & Saved Count Badges */}
        <div className="navbar-end gap-2.5 text-xs font-semibold">

          {/* Plan Badge - Filled pill with accent background */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#C2F800] text-black px-3 py-1.5 rounded-full hover:brightness-95 transition"
            title="View Today's Plan"
          >
            <span>Plan</span>
            <span className="bg-black text-[#C2F800] text-[11px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {plan.length}
            </span>
          </Link>

          {/* Saved Badge - Pill with outline/border only */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-[#292D35] text-white hover:border-[#C2F800] hover:text-[#C2F800] px-3 py-1.5 rounded-full transition"
            title="View Saved Workouts"
          >
            <span className="text-white/80">Saved</span>
            <span className="bg-[#292D35] text-white text-[11px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>

      <div className="border-t border-white/10"></div>
    </nav>
  );
};

export default Navbar;