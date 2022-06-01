import React, { FC, ChangeEvent, useEffect } from 'react';

import { useSelector, actions, useDispatch } from '../store';
import useQuery from '../hooks/useQuery';
import useAPI from '../hooks/useAPI';

import './Welcome.scss';

const Welcome: FC = () => {
  const { getTasks } = useAPI();
  const dispatch = useDispatch();
  const { query, setQuery } = useQuery();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!query.completed) return;

    console.log(`You have completed task #${query.completed}`);
  }, [query]);

  useEffect(() => {
    if (tasks.length) return;

    getTasks().then((tasks) => {
      dispatch(actions.set({ tasks }));
    });
  }, [getTasks, dispatch, tasks]);

  return (
    <main className="Welcome">
      <h1>Welcome</h1>
      <ol>
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? 'done' : ''}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={task.done}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const update = tasks.slice();

                update[index] = {
                  ...task,
                  done: e.target.checked
                };

                dispatch(actions.set({ tasks: update }));

                if (update[index].done) setQuery({ completed: `${index + 1}` });
              }}
            />

            <label htmlFor={`checkbox-${index}`}>{task.description}</label>

            {task.done ? (
              <b>
                <i className="fas fa-check" />
              </b>
            ) : (
              'To do'
            )}
          </li>
        ))}
      </ol>
    </main>
  );
};

export default Welcome;
