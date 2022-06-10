export type State = {
  status: 'ready' | 'sending' | 'sent';
  error: string;
  name: string;
  email: string;
  body: string;
  messages: {
    id: string;
    body: string;
    name: string;
    email: string;
  }[];
};
