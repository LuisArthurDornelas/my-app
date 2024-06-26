import React, { useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('solteiro(a)');
  const [education, setEducation] = useState('2grau_completo');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      const response = await api.post('/clients', {
        email,
        senha: password, // Certifique-se de que o campo é "senha" no backend
        nome: name,
        cpf,
        dataNascimento: birthdate,
        telefone: phone,
        estadoCivil: maritalStatus,
        escolaridade: education
      });
      if (response.data.status === 'success') {
        alert('Cadastro realizado com sucesso');
      } else {
        alert('Erro no cadastro');
      }
    } catch (error) {
      console.error('Error registering client:', error);
      alert('Erro ao tentar cadastrar');
    }
  };

  return (
    <div>
      <Header />
      <div className="wrapper">
        <main>
          <form onSubmit={handleRegister}>
            <label htmlFor="email">Email (Login):</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Senha:</label>
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
              A senha deve ter pelo menos 6 caracteres, incluindo pelo menos um
              número, uma letra maiúscula e um dos seguintes caracteres
              especiais: @ # $ % & * ! ? / \\ | - _ + . =
            </p>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <label htmlFor="birthdate">Data de Nascimento:</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
            <label htmlFor="phone">Telefone (WhatsApp):</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="maritalStatus">Estado Civil:</label>
            <select
              id="maritalStatus"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              <option value="solteiro(a)">Solteiro(a)</option>
              <option value="casado(a)">Casado(a)</option>
              <option value="divorciado(a)">Divorciado(a)</option>
              <option value="viúvo(a)">Viúvo(a)</option>
            </select>
            <label htmlFor="education">Escolaridade:</label>
            <select
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              <option value="1grau_incompleto">1º grau incompleto</option>
              <option value="1grau_completo">1º grau completo</option>
              <option value="2grau_completo">2º grau completo</option>
              <option value="nivel_superior">Nível superior</option>
              <option value="pos_graduado">Pós-graduado</option>
            </select>
            <button type="submit">Incluir</button>
            <button type="button" onClick={() => document.getElementById('registerForm').reset()}>Limpar</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default RegisterPage;
