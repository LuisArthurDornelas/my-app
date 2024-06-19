import React, { useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';

const ChangePasswordPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      const response = await api.post('/change-password', {
        login,
        password
      });
      if (response.data.status === 'success') {
        alert('Senha alterada com sucesso');
      } else {
        alert('Erro ao alterar senha');
      }
    } catch (error) {
      alert('Erro ao tentar alterar senha');
    }
  };

  return (
    <div>
      <Header />
      <div className="wrapper">
        <main>
          <form onSubmit={handleChangePassword}>
            <label htmlFor="login">Login (Email):</label>
            <input
              type="email"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <label htmlFor="password">Nova Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirmação de Senha:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <p>
              A senha deve ter pelo menos 6 caracteres, incluindo um número, uma
              letra maiúscula e um caractere especial: @ # $ % & * ! ? / \\ | - _ + .
              =
            </p>
            <button type="submit">Trocar Senha</button>
            <button type="button" onClick={() => document.getElementById('changePasswordForm').reset()}>Limpar</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
