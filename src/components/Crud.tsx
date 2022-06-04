import React, { FC, useEffect } from 'react';

import useAPI from '../hooks/useAPI';
import { useDispatch, actions, useSelector } from '../store';

import './Crud.scss';

const Crud: FC = () => {
  const dispatch = useDispatch();
  const { updatePerson, getPeople } = useAPI();
  const people = useSelector((state) => state.people);

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <main className="Crud">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(people).map((person, index) => {
            if (person.status === 'removed') return null;

            return (
              <tr key={index}>
                <td>
                  <input
                    onFocus={() => {
                      dispatch(
                        actions.setPerson({
                          id: person.id,
                          focus: 'name'
                        })
                      );
                    }}
                    onBlur={() => {
                      dispatch(
                        actions.setPerson({
                          id: person.id,
                          focus: ''
                        })
                      );
                    }}
                    onChange={(e) => {
                      dispatch(
                        actions.setPersonForce({
                          id: person.id,
                          name: e.target.value
                        })
                      );

                      updatePerson({
                        id: person.id,
                        name: e.target.value
                      });
                    }}
                    value={person.name}
                  />
                </td>
                <td>
                  <input
                    onFocus={() => {
                      dispatch(
                        actions.setPerson({
                          id: person.id,
                          focus: 'description'
                        })
                      );
                    }}
                    onBlur={() => {
                      dispatch(
                        actions.setPerson({
                          id: person.id,
                          focus: ''
                        })
                      );
                    }}
                    onChange={(e) => {
                      dispatch(
                        actions.setPersonForce({
                          id: person.id,
                          description: e.target.value
                        })
                      );

                      updatePerson({
                        id: person.id,
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

                      updatePerson({
                        id: person.id,
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
                  updatePerson({
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
        </tbody>
      </table>
    </main>
  );
};

export default Crud;
