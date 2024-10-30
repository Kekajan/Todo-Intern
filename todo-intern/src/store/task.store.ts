import { ITask } from "@/libs/types";
import { create } from "zustand";

type State = {
  tasks: ITask[];
};

type Action = {
  setTasksAction: (tasks: ITask[]) => void;
};

const initialState: State = {
  tasks: [],
};

export const useTaskStore = create<State & Action>((set) => ({
  ...initialState,
  setTasksAction: (newTasks: ITask[]) =>
    set((state) => ({
      tasks: [...state.tasks, ...newTasks],
    })),
}));
