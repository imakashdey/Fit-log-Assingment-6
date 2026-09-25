"use client";

import React, { createContext, useState, useEffect } from "react";
import { ITypeFit } from "../types/typeFit";

interface WorkoutContextType {
  plan: ITypeFit[];
  saved: ITypeFit[];
  completed: number[];
  addToPlan: (workout: ITypeFit) => boolean;
  saveForLater: (workout: ITypeFit) => boolean;
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
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog_plan");
      const savedSaved = localStorage.getItem("fitlog_saved");
      const savedCompleted = localStorage.getItem("fitlog_completed");

      if (savedPlan) setPlan(JSON.parse(savedPlan));
      if (savedSaved) setSaved(JSON.parse(savedSaved));
      if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    } catch (e) {
      console.error(e);
    }
  }, [plan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    } catch (e) {
      console.error(e);
    }
  }, [saved, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("fitlog_completed", JSON.stringify(completed));
    } catch (e) {
      console.error(e);
    }
  }, [completed, isLoaded]);

  const addToPlan = (workout: ITypeFit): boolean => {
    if (plan.some((item) => item.id === workout.id)) {
      return false;
    }
    if (plan.length >= 5) {
      return false;
    }
    setPlan((prev) => [...prev, workout]);
    return true;
  };

  const saveForLater = (workout: ITypeFit): boolean => {
    if (saved.some((item) => item.id === workout.id)) {
      return false;
    }
    setSaved((prev) => [...prev, workout]);
    return true;
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