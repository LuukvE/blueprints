export type Task = {
  description: string;
  done: boolean;
};

export type Message = {
  body: string;
  created: string;
  creator: string;
};

export type State = {
  tasks: Task[];
  chat: Message[];
  user: string;
  buffer: string;
};
