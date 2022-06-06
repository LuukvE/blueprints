import { useCallback, useEffect, useRef } from 'react';

import { Person } from '../types';
import { useDispatch, actions } from '../store';

const wsURL = `${process.env.REACT_APP_API_URL}`
  .split('/')
  .map((part, index) => {
    if (index !== 0) return part;
    return part === 'https:' ? 'wss:' : 'ws:';
  })
  .join('/');

const useAPI = () => {
  const dispatch = useDispatch();
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    const ws = new WebSocket(wsURL);

    ws.addEventListener('message', (message) => {
      const person = JSON.parse(message.data);

      dispatch(actions.setPerson(person));
    });

    return () => {
      ws.close();
    };
  }, [dispatch]);

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

  const updatePerson = useCallback(async (person?: Partial<Person>): Promise<void> => {
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
