import { useCallback, useRef } from 'react';

import { Person, Task } from '../types';
import { useDispatch, actions } from '../store';

const useAPI = () => {
  const dispatch = useDispatch();
  const abort = useRef<AbortController | null>(null);

  const getTasks = useCallback(async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        console.log(`API request failed`);

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(`API request failed`, e);
    }

    return [];
  }, []);

  const setPerson = useCallback(
    async (person?: Partial<Person>): Promise<void> => {
      try {
        if (abort.current) abort.current.abort();

        abort.current = new AbortController();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/people`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          signal: abort.current.signal,
          body: person ? JSON.stringify(person) : null
        });

        if (response.status !== 200) {
          console.log(`API request failed`);

          return;
        }

        dispatch(actions.set({ people: await response.json() }));
      } catch (e) {
        console.log(`API request failed`, e);
      }
    },
    [dispatch]
  );

  return {
    getTasks,
    setPerson
  };
};

export default useAPI;
