import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";

export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
    createdAt: string;
}

interface HabitState {
    habits: Habit[];
    addHabit: (name: string, frequency: "daily" | "weekly") => void;
    removeHabit: (id: string) => void;
    toggleHabit: (id: string, date: string) => void;
    fetchHabits: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set, get) => ({
          habits: [],
          isLoading: false,
          error: null,
          addHabit: (name, frequency) =>
            set((state: HabitState) => ({
                habits: [
                    ...state.habits,
                    {
                        id: Date.now().toString(),
                        name,
                        frequency,
                        completedDates: [],
                        createdAt: new Date().toISOString(),
                    },
                ],
            })),
          removeHabit: (id) =>
            set((state: HabitState) => ({
                habits: state.habits.filter((habit) => habit.id !== id),
            })),
          toggleHabit: (id, date) =>
            set((state: HabitState) => ({
                habits: state.habits.map((habit) =>
                  habit.id === id
                    ? {
                        ...habit,
                        completedDates: habit.completedDates.includes(date)
                          ? habit.completedDates.filter((d) => d !== date)
                          : [...habit.completedDates, date],
                    }
                    : habit
                ),
            })),
          fetchHabits: async () => {
              set({isLoading: true});
              try {
                  const currentHabits = get().habits;
                  if (currentHabits.length > 0) {
                      set({isLoading: false});
                      return;
                  }
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  const mockHabits: Habit[] = [
                      {
                          id: "1",
                          name: "Read a book",
                          frequency: "daily",
                          completedDates: [],
                          createdAt: new Date().toISOString(),
                      },
                      {
                          id: "2",
                          name: "Go for a run",
                          frequency: "daily",
                          completedDates: [],
                          createdAt: new Date().toISOString(),
                      },
                      {
                          id: "3",
                          name: "Learn something new",
                          frequency: "weekly",
                          completedDates: [],
                          createdAt: new Date().toISOString(),
                      },
                  ];
                  set({habits: mockHabits, isLoading: false});
              } catch (error) {
                  set({error: error.message, isLoading: false});
              }
          }
      }),
      {
          name: "habits-local",
          storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useHabitStore;