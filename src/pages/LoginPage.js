import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import './LoginPage.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email || !validateEmail(email)) {
            alert('Por favor, preencha o login com um e-mail válido.');
            return;
        }
        if (!senha) {
            alert('Por favor, preencha a senha.');
            return;
        }
        axios.post('/auth', { email, senha })
            .then(response => {
                if (response.data.status === 'success') {
                    alert('Validação realizada com sucesso');
                    navigate('/');
                } else {
                    alert(response.data.message);
                }
            });
    };

    const handleClear = () => {
        setEmail('');
        setSenha('');
        document.getElementById('email').focus();
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <img src="/logo.png" alt="Logo da Empresa" className="login-logo" />
                <h1>Login de Clientes</h1>
                <button className="home-button" onClick={() => navigate('/')}>
                    <FaHome />
                </button>
            </header>
            <form className="login-form">
                <label htmlFor="email">Login:</label>
                <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" name="senha" value={senha} onChange={e => setSenha(e.target.value)} required />
                <div className="login-buttons">
                    <button type="button" onClick={handleLogin}>Realizar Login</button>
                    <button type="button" onClick={handleClear}>Limpar</button>
                </div>
                <div className="login-links">
                    <a href="/change-password">Trocar Senha</a>
                    <a href="/register">Cadastrar Cliente</a>
                </div>
            </form>
        </div>
    );
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

export default Login;
