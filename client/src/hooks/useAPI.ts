import { useCallback, useRef } from 'react';

import { useSelector, useDispatch, actions } from '../store';

const useAPI = () => {
  const dispatch = useDispatch();
  const abort = useRef<AbortController | null>(null);
  const { name, email, message } = useSelector((state) => state);

  const contact = useCallback(async (): Promise<void> => {
    dispatch(actions.set({ status: 'sending', error: '' }));

    if (abort.current) abort.current.abort();

    const { signal } = (abort.current = new AbortController());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        signal,
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      if (response.status !== 200) {
        dispatch(actions.set({ status: 'ready', error: 'API request failed' }));

        return console.log(`API request failed`);
      }

      dispatch(actions.set({ status: 'sent', error: '', email: '', name: '', message: '' }));
    } catch (e) {
      if (signal.aborted) return;

      console.log(`API request failed`, e);

      dispatch(actions.set({ status: 'ready', error: 'API request failed' }));
    }
  }, [dispatch, email, message, name]);

  return {
    contact
  };
};

export default useAPI;
