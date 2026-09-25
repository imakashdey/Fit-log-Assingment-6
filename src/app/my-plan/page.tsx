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
    const [sortBy, setSortBy] = useState<"Duration" | "Calories" | "Rating">("Duration");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const activeList = tab === "today" ? plan : saved;

    // Sorting logic
    const sortedList = [...activeList].sort((a, b) => {
        if (sortBy === "Duration") {
            return b.duration - a.duration;
        }
        if (sortBy === "Calories") {
            return b.caloriesBurned - a.caloriesBurned;
        }
        if (sortBy === "Rating") {
            return b.rating - a.rating;
        }
        return 0;
    });

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
        <main className="px-5 py-10 max-w-7xl mx-auto w-full">
            <div className="max-w-5xl mx-auto">

                {/* ================= HEADER ================= */}
                <div className="mb-8">
                    <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
                        MY PLAN
                    </h1>

                    <p className="text-[#9CA3AF] mt-2 text-sm">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>


                {/* ================= STATS ================= */}
                <div className="grid grid-cols-3 bg-[#12141A] border border-[#292D35] rounded-xl px-6 md:px-8 py-6 mb-6">

                    {/* Exercises */}
                    <div className="border-r border-[#292D35]">
                        <p className="text-[#9CA3AF] text-xs uppercase tracking-wider font-medium">
                            Exercises
                        </p>

                        <p className="text-[#C2F800] text-2xl md:text-3xl font-extrabold mt-1">
                            {plan.length}
                        </p>
                    </div>


                    {/* Minutes */}
                    <div className="border-r border-[#292D35] pl-4 md:pl-8">
                        <p className="text-[#9CA3AF] text-xs uppercase tracking-wider font-medium">
                            Minutes
                        </p>

                        <p className="text-white text-2xl md:text-3xl font-extrabold mt-1">
                            {totalMinutes}
                        </p>
                    </div>


                    {/* Calories */}
                    <div className="pl-4 md:pl-8">
                        <p className="text-[#9CA3AF] text-xs uppercase tracking-wider font-medium">
                            Calories
                        </p>

                        <p className="text-white text-2xl md:text-3xl font-extrabold mt-1">
                            {totalCalories}
                        </p>
                    </div>

                </div>


                {/* ================= TABS + SORT ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">

                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-[#12141A] border border-[#292D35] rounded-full p-1 w-fit">

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


                    {/* Sort Dropdown */}
                    <div className="relative flex items-center gap-2 text-xs text-[#9CA3AF]">

                        <span>Sort By</span>

                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen((prev) => !prev)}
                                className="flex items-center gap-1.5 bg-[#15171D] border border-[#292D35] hover:border-[#C2F800] rounded-md px-3 py-1.5 text-white text-xs transition cursor-pointer"
                            >
                                <span>{sortBy}</span>
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${
                                        isSortOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isSortOpen && (
                                <>
                                    {/* Backdrop for closing */}
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsSortOpen(false)}
                                    />

                                    <div className="absolute right-0 mt-1.5 w-32 bg-[#15171D] border border-[#292D35] rounded-lg shadow-xl z-20 py-1 overflow-hidden">
                                        {(["Duration", "Calories", "Rating"] as const).map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setSortBy(option);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs transition flex items-center justify-between cursor-pointer ${
                                                    sortBy === option
                                                        ? "bg-[#1A2312] text-[#C2F800] font-bold"
                                                        : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                                                }`}
                                            >
                                                <span>{option}</span>
                                                {sortBy === option && <Check size={12} />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                    </div>

                </div>


                {/* ================= CONTENT ================= */}
                <div className="border border-[#292D35] bg-[#111317] rounded-xl min-h-[280px]">

                    {/* ================= EMPTY STATE ================= */}
                    {sortedList.length === 0 ? (

                        <div className="flex items-center justify-center min-h-[280px]">

                            <div className="text-center py-16 px-4">

                                <h2 className="text-white text-base font-bold tracking-wide">
                                    NOTHING HERE YET
                                </h2>

                                <p className="text-[#9CA3AF] text-sm mt-2 max-w-sm mx-auto">
                                    Browse the library and add a lift to get today moving.
                                </p>

                                <Link
                                    href="/"
                                    className="inline-block mt-5 bg-[#C2F800] text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#A8D600] transition uppercase tracking-wider"
                                >
                                    Go to workouts
                                </Link>

                            </div>

                        </div>

                    ) : (

                        /* ================= WORKOUT LIST ================= */
                        <div className="flex flex-col gap-3 p-4">

                            {sortedList.map((workout) => (

                                <div
                                    key={workout.id}
                                    className="bg-[#15171D] border border-[#292D35] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-[#383E4A]"
                                >

                                    {/* ================= LEFT SIDE ================= */}
                                    <div className="flex items-center gap-3.5 min-w-0">

                                        {/* Image */}
                                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0">

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
                                                Equipment: <span className="text-white/90">{workout.equipment}</span>
                                            </p>


                                            {/* Stats */}
                                            <div className="flex items-center gap-3 mt-1.5 text-xs text-[#9CA3AF]">

                                                {/* Duration */}
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} className="text-[#9CA3AF]" />
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
                                    <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#292D35]">

                                        {/* View Details */}
                                        <Link
                                            href={`/details/${workout.id}`}
                                            className="border border-[#292D35] text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-[#1C1F26] hover:border-[#C2F800]/50 transition"
                                        >
                                            View Details
                                        </Link>


                                        {/* Mark as Done */}
                                        {tab === "today" && (
                                            <button
                                                onClick={() => {
                                                    if (!completed.includes(workout.id)) {
                                                        markAsDone(workout.id);
                                                        toast.success("Workout marked as done!");
                                                    }
                                                }}
                                                disabled={completed.includes(workout.id)}
                                                className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition ${completed.includes(workout.id)
                                                        ? "bg-[#2A2E38] text-[#C2F800] cursor-default"
                                                        : "bg-[#C2F800] text-black hover:brightness-95 cursor-pointer"
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
                                            aria-label="Remove workout"
                                            className="text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 rounded-lg p-2 transition cursor-pointer"
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