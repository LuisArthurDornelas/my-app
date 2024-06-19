import React, { useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth', { login, password });
      if (response.data.status === 'success') {
        alert('Login realizado com sucesso');
      } else {
        alert('Email ou senha inválidos');
      }
    } catch (error) {
      alert('Erro ao tentar fazer login');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <form onSubmit={handleLogin}>
          <label htmlFor="login">Email (Login):</label>
          <input type="email" id="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
