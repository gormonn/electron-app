export enum Status {
  New = 'new',
  Done = 'done',
}

export type TaskType = {
  id: string;
  name: string;
  status: Status;
};

export enum StoryAction {
  Add = 'new',
  Remove = 'removed',
}

export type StoryPointType = {
  id: string;
  data: TaskType;
  date: string;
  action: StoryAction;
};

export type ListState = { tasks: TaskType[]; history: StoryPointType[] };
