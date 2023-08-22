import {
    createContext,
    FC,
    FormEvent,
    memo,
    ReducerWithoutAction,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from 'react';
import { nanoid } from 'nanoid';
import css from './todo-list.module.scss';

enum Status {
    New = 'new',
    Done = 'done',
    Removed = 'removed',
}

type TaskType = {
    id: string;
    name: string;
    status: Status;
};

const createTask = (name: string): TaskType => ({
    id: nanoid(),
    name,
    status: Status.New,
});

const EmptyFn = (id: string): void => {
    // do nothing
};

const ControlsContext = createContext<{
    setComplete: (id: string) => void;
    setRemoved: (id: string) => void;
}>({
    setComplete: EmptyFn,
    setRemoved: EmptyFn,
});

type ActionTypes = keyof typeof Status;
type State = ReducerWithoutAction<{ tasks: TaskType[] }>;

const reducer = (
    state: State,
    action: {
        type: ActionTypes;
        payload: string;
    },
) => {
    // todo: send history to IPC here
    switch (action.type as ActionTypes) {
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
    }
    return state;
};

export const TodoList: FC = () => {
    const inputRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, { tasks: [] });

    const newTask: FormEvent = (e) => {
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
        console.log(state, 'state');
    }, [state]);

    return (
        <>
            <form className={css.form} onSubmit={newTask}>
                <input
                    ref={inputRef}
                    type="text"
                    name="name"
                    required
                    autoFocus
                />
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
