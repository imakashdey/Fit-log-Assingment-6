import React from "react";
import WorkoutCard from "./workoutsCard";
import { ITypeFit } from "../../types/typeFit";

const WorkoutData = async () => {
  const res = await fetch("http://localhost:3000/workouts.json");
  const data: ITypeFit[] = await res.json();

  return data;
};

const WorkoutSection = async () => {
  const workouts = await WorkoutData();

  return (
    <section className="px-5 py-10">

     
      <div className="mb-8">
        <h2 className="text-white text-3xl md:text-4xl font-bold mt-2">
          THE LIBRARY
        </h2>

        <p className="text-[#9CA3AF] mt-3">
          Find the right workout and start training.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {workouts.map((workout: ITypeFit) => {
          return <WorkoutCard key={workout.id} workout={workout} />;
        })}
      </div>

    </section>
  );
};

export default WorkoutSection;