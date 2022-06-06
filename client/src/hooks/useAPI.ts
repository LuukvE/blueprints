import { useCallback, useRef } from 'react';

import { useDispatch, actions } from '../store';

const useAPI = () => {
  const dispatch = useDispatch();
  const abort = useRef<AbortController | null>(null);

  const getTasks = useCallback(async (): Promise<void> => {
    if (abort.current) abort.current.abort();

    const { signal } = (abort.current = new AbortController());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        signal
      });

      if (response.status !== 200) return console.log(`API request failed`);

      dispatch(actions.set({ tasks: await response.json() }));
    } catch (e) {
      if (signal.aborted) return;

      console.log(`API request failed`, e);
    }
  }, [dispatch]);

  return {
    getTasks
  };
};

export default useAPI;
