import React from "react";
import { ITypeFit } from "../../../types/typeFit";
import WorkoutDetailCard from "../../details/WorkoutDetailsCard";
import { notFound } from "next/navigation";

interface DetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getSingleWorkout = async (id: string): Promise<ITypeFit | null> => {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        return data;
      }
    }
  } catch (err) {
    console.error("Error fetching single workout:", err);
  }

  // Fallback to list search if needed
  try {
    const allRes = await fetch("https://api.abcz.workers.dev/api/fitlog");
    if (allRes.ok) {
      const allData: ITypeFit[] = await allRes.json();
      const match = allData.find((item) => item.id === Number(id));
      if (match) return match;
    }
  } catch (err) {
    console.error("Fallback fetch error:", err);
  }

  return null;
};

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { id } = await params;
  const workout = await getSingleWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="px-5 py-10 max-w-7xl mx-auto">
      <WorkoutDetailCard workout={workout} />
    </main>
  );
};

export default DetailsPage;