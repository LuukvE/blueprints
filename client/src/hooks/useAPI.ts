import { useCallback, useRef } from 'react';

import { Person } from '../types';
import { useDispatch, actions } from '../store';

const useAPI = () => {
  const dispatch = useDispatch();
  const abort = useRef<AbortController | null>(null);

  const getPeople = useCallback(async (): Promise<void> => {
    if (abort.current) abort.current.abort();

    const { signal } = (abort.current = new AbortController());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/people`, {
        signal,
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
      });

      if (response.status !== 200) return console.log(`API request failed`);

      dispatch(actions.set({ people: await response.json() }));
    } catch (e) {
      if (signal.aborted) return;

      console.log(`API request failed`, e);
    }
  }, [dispatch]);

  const updatePerson = useCallback(async (person: Partial<Person>): Promise<void> => {
    if (abort.current) abort.current.abort();

    const { signal } = (abort.current = new AbortController());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/person`, {
        signal,
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: person ? JSON.stringify(person) : null
      });

      if (response.status !== 200) {
        console.log(`API request failed`);

        return;
      }

      const result = await response.json();

      dispatch(actions.setPerson(result));
    } catch (e) {
      if (signal.aborted) return;

      console.log(`API request failed`, e);
    }
  }, []);

  return {
    getPeople,
    updatePerson
  };
};

export default useAPI;
