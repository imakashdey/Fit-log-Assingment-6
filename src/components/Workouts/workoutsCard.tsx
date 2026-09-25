import Image from "next/image";
import React from "react";
import { Clock, Flame, Star } from "lucide-react";
import { ITypeFit } from "../../types/typeFit";
import Link from "next/link";

interface WorkoutCardProps {
  workout: ITypeFit;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/details/${workout.id}`}
      className="block bg-[#15171D] rounded-lg overflow-hidden border border-[#292D35] hover:border-[#C2F800] transition cursor-pointer"
    >

      {/* Image */}
      <div className="relative w-full h-56">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">

        {/* Tags */}
        <div className="flex gap-2 mb-3">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="bg-[#1A2312] text-[#C2F800] px-3 py-1 rounded-full text-[10px] font-bold"
            >
              {muscle.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-white text-xl font-bold">
          {workout.name.toUpperCase()}
        </h2>

        {/* Equipment */}
        <p className="text-[#9CA3AF] text-sm mt-2">
          Equipment:{" "}
          <span className="text-white">
            {workout.equipment}
          </span>
        </p>

        {/* Bottom Information - icon row, same as reference image */}
        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[#292D35]">

          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-[#9CA3AF]" />
            <span className="text-white text-sm font-medium">
              {workout.duration} min
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame size={16} className="text-[#C2F800]" />
            <span className="text-white text-sm font-medium">
              {workout.caloriesBurned} kcal
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-[#C2F800] fill-[#C2F800]" />
            <span className="text-white text-sm font-medium">
              {workout.rating}
            </span>
          </div>

        </div>

      </div>
    </Link>
  );
};

export default WorkoutCard;