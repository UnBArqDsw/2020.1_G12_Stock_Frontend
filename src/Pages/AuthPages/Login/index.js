import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import './styles.css';

export default function LoginPage() {
  const { signIn } = useContext(AuthContext);
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(document, password);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => setDocument(e.target.value)} />
        <input onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
