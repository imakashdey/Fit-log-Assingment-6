"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Logo from "../../assests/logo.png";
import { WorkoutContext } from "../../context/WorkoutProvider";

const Navbar = () => {
  const { plan, saved } = useContext(WorkoutContext);

  return (
    <nav>
      <div className="navbar px-4">

        {/* Left Side */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-transparent lg:hidden"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Workouts</Link>
              </li>

              <li>
                <Link href="/my-plan">My Plan</Link>
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

            <span className="text-[18px] md:text-2xl font-bold">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex font-semibold">
          <ul className="menu menu-horizontal px-1 text-[12px] gap-1">

            <li className="rounded-full">
              <Link
                href="/"
                className="text-white hover:bg-[#1A2312] hover:text-[#C2F800] rounded-3xl"
              >
                Workouts
              </Link>
            </li>

            <li className="rounded-full">
              <Link
               href="/my-plan"
                className="text-white hover:bg-[#1A2312] hover:text-[#C2F800] rounded-3xl"
              >
                My Plan
              </Link>
            </li>

          </ul>
        </div>

        {/* Right Side - Plan & Saved Count */}
        <div className="navbar-end gap-4 text-sm font-medium">

          {/* Plan */}
          <div className="flex items-center gap-1.5">
            <span className="text-white/70">
              Plan
            </span>

            <span className="bg-[#C2F800] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {plan.length}
            </span>
          </div>

          {/* Saved */}
          <div className="flex items-center gap-1.5">
            <span className="text-white/70">
              Saved
            </span>

            <span className="bg-white/10 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {saved.length}
            </span>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10"></div>
    </nav>
  );
};

export default Navbar;