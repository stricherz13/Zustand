import {create} from "zustand";

export interface Habit {
  id: string;
  name: string;
  description: string;
  points: number;
  completed: boolean;
}

interface HabitState {
  habits: Habit[];
}

const useHabitStore = create<HabitState>()(() => {
  return {
    habits: [],
  };
});

export default useHabitStore;