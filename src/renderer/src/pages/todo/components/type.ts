export enum Status {
  New = 'new',
  Done = 'done',
  Removed = 'removed',
}

export type TaskType = {
  id: string;
  name: string;
  status: Status;
};
