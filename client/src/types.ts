export type Person = {
  id: string;
  name: string;
  status: string;
  description: string;
  focus?: string;
};

export type State = {
  people: { [id: string]: Person };
};
