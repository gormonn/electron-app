import {
  createContext,
  FC,
  FormEvent,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLoaderData } from 'react-router-dom';
import { persist } from '@renderer/shared/lib/persist';
import css from './todo-list.module.scss';
import { createStory, createTask } from './lib';
import {
  ListState,
  Status,
  StoryAction,
  StoryPointType,
  TaskType,
} from '../type';

type UpdateFn = (id: string) => () => void;
const EmptyFn: UpdateFn = () => () => {
  // do nothing
};

export const ControlsContext = createContext<{
  setComplete: UpdateFn;
  setRemoved: UpdateFn;
}>({
  setComplete: EmptyFn,
  setRemoved: EmptyFn,
});

const input = document.createElement('input');
const PERSIST_KEY = 'TodoList';

export const TodoList: FC = () => {
  const persistedState = useLoaderData() as ListState;
  const inputRef = useRef<HTMLInputElement>(input);

  const [tasks, setTasks] = useState<TaskType[]>(persistedState?.tasks || []);
  const [history, setHistory] = useState<StoryPointType[]>(
    persistedState?.history || [],
  );
  const tasksHistoryPush = (newStoryPoint: TaskType, action: StoryAction) => {
    setHistory((history) => [...history, createStory(newStoryPoint, action)]);
  };

  const newTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    const newTask = createTask(target.name.value);
    setTasks((tasks) => [...tasks, newTask]);

    tasksHistoryPush(newTask, StoryAction.Add);

    inputRef.current.value = '';
  };

  const controls = useMemo(
    () => ({
      setComplete: (id: string) => () => {
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === id ? { ...task, status: Status.Done } : task,
          ),
        );
      },
      setRemoved: (id: string) => () => {
        setTasks((tasks) => {
          tasksHistoryPush(
            tasks.find((task) => task.id === id),
            StoryAction.Remove,
          );
          return tasks.filter((task) => task.id !== id);
        });
      },
    }),
    [],
  );

  useEffect(() => {
    persist.save(PERSIST_KEY, { tasks, history });
  }, [tasks, history]);

  return (
    <>
      <h3>To Do List</h3>
      <form className={css.form} onSubmit={newTask}>
        <input ref={inputRef} type="text" name="name" required autoFocus />
        <button type="submit">Add Task</button>
      </form>
      <div className={css.list}>
        <ControlsContext.Provider value={controls}>
          {tasks.map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </ControlsContext.Provider>
      </div>
    </>
  );
};

const Task = memo<TaskType>(({ id, name, status }) => {
  const { setComplete, setRemoved } = useContext(ControlsContext);

  return (
    <div className={css.item}>
      <span className={css.name}>{name}</span>
      <span className={css[`status-${status}`]}>{status}</span>
      <div className={css.controls}>
        <button onClick={setComplete(id)} disabled={status === Status.Done}>
          Complete
        </button>
        <button onClick={setRemoved(id)}>Remove</button>
      </div>
    </div>
  );
});

Task.displayName = 'Task';

export const todoListLoader = () => persist.load(PERSIST_KEY);
