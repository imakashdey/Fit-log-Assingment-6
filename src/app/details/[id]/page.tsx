import React from "react";
import { ITypeFit } from "../../../types/typeFit";
import WorkoutDetailCard from "../../details/WorkoutDetailsCard";
import { notFound } from "next/navigation";

interface DetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { id } = await params;

 
  const res = await fetch("http://localhost:3000/workouts.json");

  const workouts: ITypeFit[] = await res.json();

  
  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  
  if (!workout) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2 className="text-white text-3xl font-bold">
          Workout Not Found
        </h2>
      </main>
    );
  }

  return (
    <main className="px-5 py-10">
      <WorkoutDetailCard workout={workout} />
    </main>
  );
};

export default DetailsPage;