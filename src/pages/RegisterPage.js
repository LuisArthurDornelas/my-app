import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import api from '../services/api';
import Header from '../components/Header';
import './RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('solteiro(a)');
    const [escolaridade, setEscolaridade] = useState('2grau_completo');
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (!email || !validateEmail(email)) {
            alert('Por favor, preencha o e-mail com um e-mail válido.');
            return;
        }
        if (!senha || !confirmarSenha || senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }
        if (!validatePassword(senha)) {
            alert('A senha não atende aos requisitos.');
            return;
        }
        if (!nome || nome.split(' ').length < 2 || nome.split(' ')[0].length < 2 || /[̈{}[\]́`~^:;<>,"'@#$%&*!?/\\|+=.-]/.test(nome)) {
            alert('Por favor, preencha o nome completo com pelo menos duas palavras, a primeira palavra deve ter pelo menos 2 caracteres, e não deve conter caracteres especiais.');
            return;
        }
        if (!validateCPF(cpf)) {
            alert('Por favor, preencha um CPF válido.');
            return;
        }
        if (!dataNascimento || !isMaiorDeIdade(dataNascimento)) {
            alert('Você deve ter pelo menos 18 anos.');
            return;
        }

        try {
            const response = await api.post('/clients', {
                email,
                senha,
                nome,
                cpf,
                dataNascimento,
                telefone,
                estadoCivil,
                escolaridade
            });
            if (response.data.status === 'success') {
                alert('Cadastro realizado com sucesso');
                navigate('/login');
            } else {
                alert('Erro no cadastro');
            }
        } catch (error) {
            console.error('Error registering client:', error);
            alert('Erro ao tentar cadastrar');
        }
    };

    const handleClear = () => {
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
        setNome('');
        setCpf('');
        setDataNascimento('');
        setTelefone('');
        setEstadoCivil('solteiro(a)');
        setEscolaridade('2grau_completo');
        document.getElementById('email').focus();
    };

    const isMaiorDeIdade = (data) => {
        const today = new Date();
        const birthDate = new Date(data);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    };

    return (
        <div className="cadastro-container">
            <header>
                <img src="/logo.png" alt="Logo da Empresa" />
                <h1>Cadastro de cliente</h1>
                <nav>
                    <ul>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/service-request">Solicitar Serviço</a></li>
                        <li><a href="/payment-method">Cadastro de Meio de Pagamento</a></li>
                        <li><a href="/add-service">Cadastro de Serviço</a></li>
                        <li><a href="/solicitacao" id="solicitacaoLink" style={{ display: 'none' }}>Solicitação de Serviços</a></li>
                    </ul>
                </nav>
                <button className="home-button" onClick={() => navigate('/')}>
                    <FaHome />
                </button>
            </header>
            <main>
                <form className="cadastro-form" onSubmit={handleCadastro}>
                    <label htmlFor="email">E-mail (Login):</label>
                    <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" value={senha} onChange={e => setSenha(e.target.value)} required />
                    <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                    <input type="password" id="confirmarSenha" name="confirmarSenha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />
                    <p>
                        Regras de senha: Mínimo de 6 caracteres, incluindo pelo menos uma letra maiúscula, um número e um caractere especial (@ # $ % & * ! ? / \\ | - _ + . =).<br />
                        Caracteres não permitidos: ̈ { } [ ]  ́ ` ~ ^ : ; &lt; &gt; , “ ‘
                    </p>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" value={cpf} onChange={e => setCpf(e.target.value)} required pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" />
                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input type="date" id="dataNascimento" name="dataNascimento" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
                    <label htmlFor="telefone">Telefone Celular/WhatsApp:</label>
                    <input type="tel" id="telefone" name="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
                    <label htmlFor="estadoCivil">Estado Civil:</label>
                    <div className="radio-group">
                        <label><input type="radio" id="solteiro" name="estadoCivil" value="solteiro(a)" checked={estadoCivil === 'solteiro(a)'} onChange={e => setEstadoCivil(e.target.value)} /> Solteiro</label>
                        <label><input type="radio" id="casado" name="estadoCivil" value="casado(a)" checked={estadoCivil === 'casado(a)'} onChange={e => setEstadoCivil(e.target.value)} /> Casado</label>
                        <label><input type="radio" id="divorciado" name="estadoCivil" value="divorciado(a)" checked={estadoCivil === 'divorciado(a)'} onChange={e => setEstadoCivil(e.target.value)} /> Divorciado</label>
                        <label><input type="radio" id="viuvo" name="estadoCivil" value="viuvo(a)" checked={estadoCivil === 'viuvo(a)'} onChange={e => setEstadoCivil(e.target.value)} /> Viúvo</label>
                    </div>
                    <label htmlFor="escolaridade">Escolaridade:</label>
                    <select id="escolaridade" name="escolaridade" value={escolaridade} onChange={e => setEscolaridade(e.target.value)}>
                        <option value="1grau_incompleto">1º grau incompleto</option>
                        <option value="1grau_completo">1º grau completo</option>
                        <option value="2grau_completo">2º grau completo</option>
                        <option value="nivel_superior">Nível superior</option>
                        <option value="pos_graduado">Pós-graduado</option>
                    </select>
                    <div className="button-group">
                        <button type="submit">Incluir</button>
                        <button type="button" onClick={handleClear}>Limpar</button>
                        <button type="button" onClick={() => navigate('/login')}>Voltar</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!?/\\|_+=.]).{6,}$/;
    const forbiddenRe = /[̈{}[\]́`~^:;<>,"']/;
    return re.test(password) && !forbiddenRe.test(password);
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

export default RegisterPage;
