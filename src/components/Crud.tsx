import React, { FC, useEffect } from 'react';

import useAPI from '../hooks/useAPI';
import { useDispatch, actions, useSelector } from '../store';

import './Crud.scss';

const Crud: FC = () => {
  const dispatch = useDispatch();
  const { setPerson } = useAPI();
  const people = useSelector((state) => state.people);

  useEffect(() => {
    setPerson();
  }, [setPerson]);

  return (
    <main className="Crud">
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        {Object.values(people).map((person, index) => {
          if (person.status === 'removed') return null;

          return (
            <tr key={index}>
              <td>
                <input
                  onChange={(e) => {
                    dispatch(
                      actions.setPerson({
                        id: person.id,
                        name: e.target.value
                      })
                    );

                    setPerson({
                      ...person,
                      name: e.target.value
                    });
                  }}
                  value={person.name}
                />
              </td>
              <td>
                <input
                  onChange={(e) => {
                    dispatch(
                      actions.setPerson({
                        id: person.id,
                        description: e.target.value
                      })
                    );

                    setPerson({
                      ...person,
                      description: e.target.value
                    });
                  }}
                  value={person.description}
                />
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch(
                      actions.setPerson({
                        id: person.id,
                        status: 'removed'
                      })
                    );

                    setPerson({
                      ...person,
                      status: 'removed'
                    });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}

        <tr>
          <td colSpan={2}>
            <button
              onClick={() => {
                setPerson({
                  status: '',
                  name: '',
                  description: ''
                });
              }}
            >
              Add
            </button>
          </td>
        </tr>
      </table>
    </main>
  );
};

export default Crud;
