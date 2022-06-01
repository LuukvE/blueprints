import { useCallback } from 'react';

import { Task } from '../types';

const useAPI = () => {
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

  return {
    getTasks
  };
};

export default useAPI;
