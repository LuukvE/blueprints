export type Task = {
  description: string;
  done: boolean;
};

export type Person = {
  id: string;
  name: string;
  status: string;
  description: string;
  focus?: string;
};

export type State = {
  tasks: Task[];
  people: { [id: string]: Person };
};
