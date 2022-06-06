import { useCallback } from 'react';

import { Message } from '../types';
import { useDispatch, actions } from '../store';

const useAPI = () => {
  const dispatch = useDispatch();

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
    setMessage
  };
};

export default useAPI;
