// Components can be found at react-bootstrap.netlify.app
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import React, { FC, ChangeEvent } from 'react';

import useAPI from '../hooks/useAPI';
import { useSelector, actions, useDispatch } from '../store';

import './Contact.scss';

const Contact: FC = () => {
  const { contact } = useAPI();
  const dispatch = useDispatch();
  const { name, email, message, status, error } = useSelector((state) => state);

  return (
    <main className="Contact">
      <h1>Contact</h1>

      <Form
        onSubmit={(e) => {
          e.preventDefault();

          contact();
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
        />
        <label htmlFor="message">Message</label>
        <Form.Control
          required
          rows={3}
          id="message"
          as="textarea"
          value={message}
          onChange={(e) => {
            dispatch(
              actions.set({
                message: e.target.value
              })
            );
          }}
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
    </main>
  );
};

export default Contact;
