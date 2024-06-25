import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import './ChangePasswordPage.css';

function TrocaSenha() {
    const [email, setEmail] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();

    const handleTrocaSenha = () => {
        if (!email || !validateEmail(email)) {
            alert('Por favor, preencha o login com um e-mail válido.');
            return;
        }
        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos de senha.');
            return;
        }
        if (novaSenha !== confirmarSenha) {
            alert('A nova senha e a confirmação não coincidem.');
            return;
        }
        if (!validatePassword(novaSenha)) {
            alert('A nova senha não atende aos requisitos.');
            return;
        }
        axios.post('/troca-senha', { email, senhaAtual, novaSenha })
            .then(response => {
                if (response.data.status === 'success') {
                    alert('Validação realizada com sucesso');
                    navigate('/login');
                } else {
                    alert(response.data.message);
                }
            });
    };

    const handleClear = () => {
        setEmail('');
        setSenhaAtual('');
        setNovaSenha('');
        setConfirmarSenha('');
        document.getElementById('email').focus();
    };

    return (
        <div className="troca-senha-container">
            <header className="troca-senha-header">
                <img src="/logo.png" alt="Logo da Empresa" className="troca-senha-logo" />
                <h1>Troca de Senha de Clientes</h1>
                <button className="home-button" onClick={() => navigate('/')}>
                    <FaHome />
                </button>
            </header>
            <main className="troca-senha-main">
                <form className="troca-senha-form">
                    <label htmlFor="email">Login:</label>
                    <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <label htmlFor="senhaAtual">Senha Atual:</label>
                    <input type="password" id="senhaAtual" name="senhaAtual" value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} required />
                    <label htmlFor="novaSenha">Nova Senha:</label>
                    <input type="password" id="novaSenha" name="novaSenha" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required />
                    <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />
                    <p>
                        Regras de senha: Mínimo de 6 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial (@ # $ % & * ! ? / \ | - _ + . =).<br />
                        Caracteres não permitidos: ̈ { } [ ]  ́ ` ~ ^ : ; &lt; &gt; , “ ‘
                    </p>
                    <div className="troca-senha-buttons">
                        <button type="button" onClick={handleTrocaSenha}>Trocar Senha</button>
                        <button type="button" onClick={handleClear}>Limpar</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!?/\\|_+=.]).{6,}$/;
    const forbiddenRe = /[̈{}\[\] ́`~^:;<>,"']/;
    return re.test(password) && !forbiddenRe.test(password);
}

export default TrocaSenha;
