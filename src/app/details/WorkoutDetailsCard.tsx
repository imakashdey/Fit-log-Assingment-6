"use client";

import Image from "next/image";
import React, { useContext } from "react";
import {
  Bookmark,
  CalendarPlus,
  Clock,
  Flame,
  Star,
} from "lucide-react";
import { ITypeFit } from "../../types/typeFit";
import { WorkoutContext } from "../../context/WorkoutProvider";
import { toast } from "react-toastify";

interface WorkoutDetailCardProps {
  workout: ITypeFit;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#292D35] last:border-b-0">
      <span className="text-[#9CA3AF] text-xs font-medium tracking-wide">
        {label.toUpperCase()}
      </span>

      <span className="text-white text-sm font-semibold">
        {value}
      </span>
    </div>
  );
};

const WorkoutDetailCard = ({
  workout,
}: WorkoutDetailCardProps) => {
  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
  } = useContext(WorkoutContext);

  const alreadyAdded = plan.some(
    (item) => item.id === workout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  return (
    <div className="max-w-6xl mx-auto bg-[#0B0C10] border border-[#292D35] rounded-2xl overflow-hidden p-4 md:p-6">

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

        {/* LEFT : IMAGE */}
        <div className="relative w-full min-h-[500px] rounded-xl overflow-hidden">

          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            className="object-cover"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Image Bottom Text */}
          <div className="absolute bottom-5 left-5 right-5">

            <span className="inline-block bg-[#C2F800] text-black px-3 py-1 rounded-full text-xs font-bold mb-2">
              {workout.difficulty.toUpperCase()}
            </span>

            <h2 className="text-white text-2xl md:text-3xl font-extrabold">
              {workout.name.toUpperCase()}
            </h2>

          </div>
        </div>

        {/* RIGHT : CONTENT */}
        <div className="flex flex-col">

          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">
            {workout.name.toUpperCase()}
          </h1>

          {/* Description */}
          <p className="text-[#9CA3AF] text-sm md:text-base leading-relaxed mt-3">
            {workout.description}
          </p>

          {/* Muscle Groups */}
          <div className="flex flex-wrap gap-2 mt-5">

            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="bg-[#1A2312] text-[#C2F800] px-3 py-1.5 rounded-full text-xs font-bold"
              >
                {muscle.toUpperCase()}
              </span>
            ))}

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 mt-6">

            {/* Duration */}
            <div className="bg-[#15171D] border border-[#292D35] rounded-xl p-4 text-center hover:border-[#C2F800]/40 transition">

              <Clock
                size={20}
                className="text-[#C2F800] mx-auto mb-2"
              />

              <p className="text-white text-lg font-bold">
                {workout.duration}
              </p>

              <p className="text-[#9CA3AF] text-[10px] mt-1">
                MINUTES
              </p>

            </div>

            {/* Calories */}
            <div className="bg-[#15171D] border border-[#292D35] rounded-xl p-4 text-center hover:border-[#C2F800]/40 transition">

              <Flame
                size={20}
                className="text-[#C2F800] mx-auto mb-2"
              />

              <p className="text-white text-lg font-bold">
                {workout.caloriesBurned}
              </p>

              <p className="text-[#9CA3AF] text-[10px] mt-1">
                CALORIES
              </p>

            </div>

            {/* Rating */}
            <div className="bg-[#15171D] border border-[#292D35] rounded-xl p-4 text-center hover:border-[#C2F800]/40 transition">

              <Star
                size={20}
                className="text-[#C2F800] fill-[#C2F800] mx-auto mb-2"
              />

              <p className="text-white text-lg font-bold">
                {workout.rating}
              </p>

              <p className="text-[#9CA3AF] text-[10px] mt-1">
                RATING
              </p>

            </div>

          </div>

          {/* INFORMATION */}
          <div className="bg-[#15171D] border border-[#292D35] rounded-xl px-4 mt-5">

            <InfoRow
              label="Equipment"
              value={workout.equipment}
            />

            <InfoRow
              label="Difficulty"
              value={workout.difficulty}
            />

            <InfoRow
              label="Sets"
              value={workout.sets}
            />

            <InfoRow
              label="Reps"
              value={workout.reps}
            />

          </div>

          {/* INSTRUCTIONS */}
          <div className="mt-6">

            <h2 className="text-[#C2F800] text-lg font-bold tracking-wide">
              HOW TO PERFORM
            </h2>

            <ol className="mt-3 space-y-2">

              {workout.instructions.map((step, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-[#9CA3AF] text-sm leading-relaxed"
                >

                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C2F800] text-black flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>

                  <span className="pt-0.5">
                    {step}
                  </span>

                </li>
              ))}

            </ol>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 mt-6">

            {/* ADD TO PLAN */}
            <button
              disabled={alreadyAdded || (!alreadyAdded && plan.length >= 5)}
              onClick={() => {
                if (alreadyAdded) {
                  toast.info(
                    "Workout is already added to your plan!"
                  );
                  return;
                }

                if (plan.length >= 5) {
                  toast.warning(
                    "Daily limit reached! Cap of 5 lifts for today."
                  );
                  return;
                }

                const added = addToPlan(workout);
                if (added) {
                  toast.success(
                    "Workout added to your plan!"
                  );
                }
              }}
              className={`btn border-none font-bold rounded-md px-6 transition-colors duration-200 ${
                alreadyAdded
                  ? "bg-[#2A2E38] text-[#C2F800] cursor-not-allowed"
                  : plan.length >= 5
                  ? "bg-[#2A2E38] text-gray-400 cursor-not-allowed"
                  : "bg-[#C2F800] hover:bg-[#A8D600] text-black"
              }`}
            >
              <CalendarPlus
                size={16}
                strokeWidth={2.5}
              />

              {alreadyAdded
                ? "Added to plan"
                : plan.length >= 5
                ? "Plan Full (5/5)"
                : "Add to plan"}
            </button>

            {/* SAVE FOR LATER */}
            <button
              disabled={alreadySaved}
              onClick={() => {
                if (alreadySaved) {
                  toast.info(
                    "Workout is already saved!"
                  );
                  return;
                }

                const savedStatus = saveForLater(workout);
                if (savedStatus) {
                  toast.success(
                    "Workout saved for later!"
                  );
                }
              }}
              className={`btn font-bold rounded-md px-6 transition-colors duration-200 ${
                alreadySaved
                  ? "bg-[#2A2E38] text-[#C2F800] border-[#292D35] cursor-not-allowed"
                  : "bg-transparent hover:bg-[#15171D] border border-[#292D35] text-white"
              }`}
            >
              <Bookmark
                size={16}
                className={
                  alreadySaved
                    ? "fill-[#C2F800]"
                    : ""
                }
              />

              {alreadySaved
                ? "Saved"
                : "Save for later"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailCard;