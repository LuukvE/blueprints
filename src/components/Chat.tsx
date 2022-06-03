import React, { FC, useCallback, useEffect } from 'react';

import useAPI from '../hooks/useAPI';
import { useSelector, useDispatch, actions } from '../store';

import './Chat.scss';

const Chat: FC = () => {
  const dispatch = useDispatch();
  const { setMessage } = useAPI();
  const { chat, user, buffer } = useSelector((state) => state);

  const submit = useCallback(() => {
    const body = buffer.trim();

    if (!body) return;

    setMessage({
      body,
      creator: user,
      created: new Date().toJSON()
    });

    dispatch(actions.set({ buffer: '' }));
  }, [buffer, user, dispatch, setMessage]);

  useEffect(() => {
    setMessage();
  }, [setMessage]);

  return (
    <main className="Chat">
      {chat.map((message, index) => (
        <div className={message.creator === user ? 'me' : 'other'} key={index}>
          {message.body}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          submit();
        }}
      >
        <textarea
          rows={2}
          value={buffer}
          placeholder="Type..."
          onKeyUp={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) submit();
          }}
          onChange={(e) => {
            dispatch(actions.set({ buffer: e.target.value.trim() ? e.target.value : '' }));
          }}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
};

export default Chat;
