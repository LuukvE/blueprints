export type Message = {
  body: string;
  created: string;
  creator: string;
};

export type State = {
  chat: Message[];
  user: string;
  buffer: string;
};
