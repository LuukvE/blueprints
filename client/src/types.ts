export type State = {
  status: 'ready' | 'sending' | 'sent';
  error: string;
  name: string;
  email: string;
  message: string;
};
