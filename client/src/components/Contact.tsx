import moment from 'moment';
import React, { FC } from 'react';

// Components can be found at react-bootstrap.netlify.app
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import useAPI from '../hooks/useAPI';
import { useSelector, actions, useDispatch } from '../store';

import './Contact.scss';

const Contact: FC = () => {
  const dispatch = useDispatch();
  const { saveMessage } = useAPI();
  const { name, email, body, status, error, messages } = useSelector((state) => state);

  return (
    <main className="Contact">
      <h1>Contact</h1>

      <Form
        onSubmit={(e) => {
          e.preventDefault();

          saveMessage();
        }}
      >
        <label htmlFor="name">Name</label>
        <Form.Control
          required
          id="name"
          value={name}
          onChange={(e) => {
            dispatch(
              actions.set({
                name: e.target.value
              })
            );
          }}
          disabled={status !== 'ready'}
        />
        <label htmlFor="email">Email</label>
        <Form.Control
          required
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            dispatch(
              actions.set({
                email: e.target.value
              })
            );
          }}
          disabled={status !== 'ready'}
        />
        <label htmlFor="body">Message</label>
        <Form.Control
          required
          rows={3}
          id="body"
          as="textarea"
          value={body}
          onChange={(e) => {
            dispatch(
              actions.set({
                body: e.target.value
              })
            );
          }}
          disabled={status !== 'ready'}
        />
        <Button
          variant={status === 'sent' ? 'success' : 'primary'}
          disabled={status !== 'ready'}
          type="submit"
        >
          {status === 'ready' && 'Send'}
          {status === 'sending' && <Spinner animation="border" />}
          {status === 'sent' && 'Sent'}
        </Button>

        {error && <Alert variant="danger">{error}</Alert>}
        {status === 'sent' && (
          <Alert variant="success">Thank you! Your message has been received</Alert>
        )}
      </Form>
      <br />
      <br />
      <h1>Messages</h1>
      {messages.map(({ id, name, email, body, created }) => (
        <div className="message" key={id}>
          {created && <small>{moment(created).fromNow()}</small>}
          <strong>{name}</strong>
          <i>{email}</i>
          <p>{body}</p>
        </div>
      ))}
    </main>
  );
};

export default Contact;
