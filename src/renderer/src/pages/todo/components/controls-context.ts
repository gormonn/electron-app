import { createContext } from 'react';

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
