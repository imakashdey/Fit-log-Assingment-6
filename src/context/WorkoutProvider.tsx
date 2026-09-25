"use client";

import React, { createContext, useState } from "react";
import { ITypeFit } from "../types/typeFit";

interface WorkoutContextType {
  plan: ITypeFit[];
  saved: ITypeFit[];
  completed: number[];
  addToPlan: (workout: ITypeFit) => void;
  saveForLater: (workout: ITypeFit) => void;
  markAsDone: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

export const WorkoutContext = createContext<WorkoutContextType>(
  {} as WorkoutContextType
);

const WorkoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [plan, setPlan] = useState<ITypeFit[]>([]);
  const [saved, setSaved] = useState<ITypeFit[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  const addToPlan = (workout: ITypeFit) => {
    setPlan((prev) => {
      if (prev.some((item) => item.id === workout.id)) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  const saveForLater = (workout: ITypeFit) => {
    setSaved((prev) => {
      if (prev.some((item) => item.id === workout.id)) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  const markAsDone = (id: number) => {
    setCompleted((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) =>
      prev.filter((workout) => workout.id !== id)
    );
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) =>
      prev.filter((workout) => workout.id !== id)
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        completed,
        addToPlan,
        saveForLater,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;