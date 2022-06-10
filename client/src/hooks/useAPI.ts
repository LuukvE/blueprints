import { useCallback, useRef } from 'react';

import { useSelector, useDispatch, actions } from '../store';

const useAPI = () => {
  const dispatch = useDispatch();
  const abort = useRef<AbortController | null>(null);
  const { name, email, body } = useSelector((state) => state);

  const getMessages = useCallback(async (): Promise<void> => {
    if (abort.current) abort.current.abort();

    const { signal } = (abort.current = new AbortController());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-messages`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        signal
      });

      if (response.status !== 200) return console.log(`API request failed`);

      dispatch(actions.set({ messages: await response.json() }));
    } catch (e) {
      if (signal.aborted) return;

      console.log(`API request failed`, e);

      dispatch(actions.set({ status: 'ready', error: 'API request failed' }));
    }
  }, [dispatch]);

  const saveMessage = useCallback(async (): Promise<void> => {
    dispatch(actions.set({ status: 'sending', error: '' }));

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/save-message`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          body
        })
      });

      if (response.status !== 200) {
        dispatch(actions.set({ status: 'ready', error: 'API request failed' }));

        return console.log(`API request failed`);
      }

      await getMessages();

      dispatch(actions.set({ status: 'sent', error: '', email: '', name: '', body: '' }));
    } catch (e) {
      console.log(`API request failed`, e);

      dispatch(actions.set({ status: 'ready', error: 'API request failed' }));
    }
  }, [dispatch, getMessages, email, body, name]);

  return {
    getMessages,
    saveMessage
  };
};

export default useAPI;
