import { useCallback, useEffect, useRef } from 'react';

import { Person, Task } from '../types';
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

  const getPeople = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/people`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) return console.log(`API request failed`);

      dispatch(actions.set({ people: await response.json() }));
    } catch (e) {
      console.log(`API request failed`, e);
    }
  }, [dispatch]);

  const updatePerson = useCallback(async (person?: Partial<Person>): Promise<void> => {
    try {
      if (abort.current) abort.current.abort();

      abort.current = new AbortController();

      const response = await fetch(`${process.env.REACT_APP_API_URL}/person`, {
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
    } catch (e) {}
  }, []);

  return {
    getTasks,
    getPeople,
    updatePerson
  };
};

export default useAPI;
