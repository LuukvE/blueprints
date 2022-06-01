export type Task = {
  description: string;
  done: boolean;
};

export type State = {
  tasks: Task[];
};
