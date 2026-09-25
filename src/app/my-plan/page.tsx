"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronDown,
    Clock,
    Flame,
    Star,
    Check,
    X,
} from "lucide-react";

import { WorkoutContext } from "../../context/WorkoutProvider";
import { toast } from "react-toastify";

const MyPlan = () => {
    const {
        plan,
        saved,
        completed,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
    } = useContext(WorkoutContext);

    const [tab, setTab] = useState<"today" | "saved">("today");

    // কোন tab active তার উপর list change হবে
    const activeList = tab === "today" ? plan : saved;

    // Total minutes
    const totalMinutes = plan.reduce(
        (sum, workout) => sum + workout.duration,
        0
    );

    // Total calories
    const totalCalories = plan.reduce(
        (sum, workout) => sum + workout.caloriesBurned,
        0
    );

    return (
        <main className="px-5 py-10">
            <div className="max-w-6xl mx-auto">

                {/* ================= HEADER ================= */}
                <div className="mb-8">
                    <h1 className="text-white text-3xl md:text-4xl font-bold">
                        MY PLAN
                    </h1>

                    <p className="text-[#9CA3AF] mt-2 text-sm">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>


                {/* ================= STATS ================= */}
                <div className="grid grid-cols-3 bg-[#12141A] border border-[#292D35] rounded-xl px-8 py-6 mb-6">

                    {/* Exercises */}
                    <div className="border-r border-[#292D35]">
                        <p className="text-[#9CA3AF] text-xs">
                            Exercises
                        </p>

                        <p className="text-[#C2F800] text-2xl font-bold mt-1">
                            {plan.length}
                        </p>
                    </div>


                    {/* Minutes */}
                    <div className="border-r border-[#292D35] pl-8">
                        <p className="text-[#9CA3AF] text-xs">
                            Minutes
                        </p>

                        <p className="text-white text-2xl font-bold mt-1">
                            {totalMinutes}
                        </p>
                    </div>


                    {/* Calories */}
                    <div className="pl-8">
                        <p className="text-[#9CA3AF] text-xs">
                            Calories
                        </p>

                        <p className="text-white text-2xl font-bold mt-1">
                            {totalCalories}
                        </p>
                    </div>

                </div>


                {/* ================= TABS + SORT ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-[#12141A] border border-[#292D35] rounded-2xl p-1 w-fit">

                        {/* Today's Plan */}
                        <button
                            onClick={() => setTab("today")}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${tab === "today"
                                    ? "bg-[#2A2E38] text-white"
                                    : "text-[#9CA3AF] hover:text-white"
                                }`}
                        >
                            Today&apos;s Plan
                        </button>


                        {/* Saved */}
                        <button
                            onClick={() => setTab("saved")}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${tab === "saved"
                                    ? "bg-[#2A2E38] text-white"
                                    : "text-[#9CA3AF] hover:text-white"
                                }`}
                        >
                            Saved
                        </button>

                    </div>


                    {/* Sort */}
                    <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">

                        <span>Sort By</span>

                        <button className="flex items-center gap-1 border border-[#292D35] rounded-md px-3 py-1.5 text-white">
                            Duration
                            <ChevronDown size={14} />
                        </button>

                    </div>

                </div>


                {/* ================= CONTENT ================= */}
                <div className="border border-[#292D35] bg-[#111317] rounded-xl min-h-[280px]">

                    {/* ================= EMPTY STATE ================= */}
                    {activeList.length === 0 ? (

                        <div className="flex items-center justify-center min-h-[280px]">

                            <div className="text-center py-16">

                                <h2 className="text-white text-sm font-bold tracking-wide">
                                    NOTHING HERE YET
                                </h2>

                                <p className="text-[#9CA3AF] text-sm mt-2">
                                    Browse the library and add a lift to get today moving.
                                </p>

                                <Link
                                    href="/"
                                    className="inline-block mt-5 bg-[#C2F800] text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#A8D600] transition"
                                >
                                    Go to workouts
                                </Link>

                            </div>

                        </div>

                    ) : (

                        /* ================= WORKOUT LIST ================= */
                        <div className="flex flex-col gap-3 p-4">

                            {activeList.map((workout) => (

                                <div
                                    key={workout.id}
                                    className="bg-[#15171D] border border-[#292D35] rounded-xl p-3 flex items-center justify-between gap-4"
                                >

                                    {/* ================= LEFT SIDE ================= */}
                                    <div className="flex items-center gap-3 min-w-0">

                                        {/* Image */}
                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">

                                            <Image
                                                src={workout.image}
                                                alt={workout.name}
                                                fill
                                                className="object-cover"
                                            />

                                        </div>


                                        {/* Workout Information */}
                                        <div className="min-w-0">

                                            {/* Name */}
                                            <h2 className="text-white text-sm font-bold truncate">
                                                {workout.name.toUpperCase()}
                                            </h2>


                                            {/* Equipment */}
                                            <p className="text-[#9CA3AF] text-xs mt-0.5 truncate">
                                                {workout.equipment}
                                            </p>


                                            {/* Stats */}
                                            <div className="flex items-center gap-3 mt-1.5 text-xs text-[#9CA3AF]">

                                                {/* Duration */}
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {workout.duration} min
                                                </span>


                                                {/* Calories */}
                                                <span className="flex items-center gap-1">
                                                    <Flame
                                                        size={12}
                                                        className="text-[#C2F800]"
                                                    />
                                                    {workout.caloriesBurned} kcal
                                                </span>


                                                {/* Rating */}
                                                <span className="flex items-center gap-1">
                                                    <Star
                                                        size={12}
                                                        className="text-[#C2F800] fill-[#C2F800]"
                                                    />
                                                    {workout.rating}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ================= RIGHT SIDE ================= */}
                                    <div className="flex items-center gap-2 shrink-0">

                                        {/* View Details */}
                                        <Link
                                            href={`/details/${workout.id}`}
                                            className="border border-[#292D35] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1C1F26] transition"
                                        >
                                            View Details
                                        </Link>


                                        {/* Mark as Done */}
                                        {tab === "today" && (
                                            <button
                                                onClick={() => markAsDone(workout.id)}
                                                disabled={completed.includes(workout.id)}
                                                className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition ${completed.includes(workout.id)
                                                        ? "bg-[#2A2E38] text-[#C2F800] cursor-default"
                                                        : "bg-[#C2F800] text-black hover:brightness-95"
                                                    }`}
                                            >
                                                <Check
                                                    size={14}
                                                    strokeWidth={3}
                                                />

                                                {completed.includes(workout.id)
                                                    ? "DONE"
                                                    : "Mark as Done"}
                                            </button>
                                        )}


                                        {/* Remove */}
                                        <button
                                            onClick={() => {
                                                if (tab === "today") {
                                                    removeFromPlan(workout.id);
                                                    toast.success("Workout removed from your plan!");
                                                } else {
                                                    removeFromSaved(workout.id);
                                                    toast.success("Workout removed from saved!");
                                                }
                                            }}
                                            aria-label="Remove"
                                            className="text-[#9CA3AF] hover:text-red-400 transition p-1"
                                        >
                                            <X size={16} />
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </main>
    );
};

export default MyPlan;