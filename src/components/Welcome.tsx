import React, { FC, ChangeEvent } from 'react';

import { useSelector, actions, useDispatch } from '../store';

import './Welcome.scss';

const Welcome: FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

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
