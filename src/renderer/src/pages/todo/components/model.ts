import { nanoid } from 'nanoid';
import { ReducerState, useReducer } from 'react';
import { Status, TaskType } from './type';

const createTask = (name: string): TaskType => ({
  id: nanoid(),
  name,
  status: Status.New,
});

export type ListAction =
  | { type: Status.New; payload: string }
  | { type: Status.Done; payload: string }
  | { type: Status.Removed; payload: string };

export type ListState = { tasks: TaskType[] };

export const initialState: ListState = { tasks: [] };

export const reducer = (state: ListState, action: ListAction): ListState => {
  // todo: send history to IPC here
  switch (action.type) {
    case Status.New:
      return {
        ...state,
        tasks: [...state.tasks, createTask(action.payload)],
      };
    case Status.Done: {
      const id = action.payload;
      const tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status: Status.Done } : task,
      );
      return { ...state, tasks };
    }
    case Status.Removed: {
      const id = action.payload;
      const tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status: Status.Removed } : task,
      );
      return { ...state, tasks };
    }
    default:
      console.error("Unknown 'tasks' action");
      return state;
  }
};

export const useTasksReducer = (defaultState = initialState) =>
  useReducer(reducer, defaultState as ReducerState<ListState>);
