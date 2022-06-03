import { useCallback } from 'react';

import { Task, Message } from '../types';
import { actions, useDispatch } from '../store';

const useAPI = () => {
  const dispatch = useDispatch();

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

  const setMessage = useCallback(
    async (message?: Message): Promise<void> => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: message ? JSON.stringify(message) : null
        });

        if (response.status !== 200) return console.log(`API request failed`);

        dispatch(actions.set({ chat: await response.json() }));
      } catch (e) {
        console.log(`API request failed`, e);
      }
    },
    [dispatch]
  );

  return {
    getTasks,
    setMessage
  };
};

export default useAPI;
