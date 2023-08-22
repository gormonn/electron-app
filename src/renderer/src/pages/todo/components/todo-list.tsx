import {
  FC,
  FormEvent,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useLoaderData } from 'react-router-dom';
import { persist } from '@renderer/shared/lib/persist';
import css from './todo-list.module.scss';
import { ListState, useTasksReducer } from './model';
import { ControlsContext } from './controls-context';
import { Status, TaskType } from './type';

const input = document.createElement('input');
const PERSIST_KEY = 'TodoList';
export const TodoList: FC = () => {
  const persistedState = useLoaderData() as ListState;
  const inputRef = useRef<HTMLInputElement>(input);
  const [state, dispatch] = useTasksReducer(persistedState);

  const newTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    dispatch({ type: Status.New, payload: target.name.value });
    inputRef.current.value = '';
  };

  const controls = useMemo(
    () => ({
      setComplete: (payload: string) => () => {
        dispatch({ type: Status.Done, payload });
      },
      setRemoved: (payload: string) => () => {
        dispatch({ type: Status.Removed, payload });
      },
    }),
    [],
  );

  useEffect(() => {
    persist.save(PERSIST_KEY, state);
  }, [state]);

  return (
    <>
      <form className={css.form} onSubmit={newTask}>
        <input ref={inputRef} type="text" name="name" required autoFocus />
        <button type="submit">Add Task</button>
      </form>
      <div className={css.list}>
        <ControlsContext.Provider value={controls}>
          {state.tasks
            .filter((task) => task.status !== Status.Removed)
            .map((task) => (
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
        <button onClick={setComplete(id)}>Complete</button>
        <button onClick={setRemoved(id)}>Remove</button>
      </div>
    </div>
  );
});

Task.displayName = 'Task';

export const todoListLoader = () => persist.load(PERSIST_KEY);
