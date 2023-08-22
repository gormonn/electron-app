import { nanoid } from 'nanoid';
import { formatDate } from '@renderer/shared/lib/date';
import { Status, StoryAction, StoryPointType, TaskType } from '../type';

export const createTask = (name: string): TaskType => ({
  id: nanoid(),
  name,
  status: Status.New,
});

export const createStory = (
  data: TaskType,
  action: StoryAction,
): StoryPointType => ({
  id: nanoid(),
  data,
  action,
  date: formatDate(new Date()),
});
