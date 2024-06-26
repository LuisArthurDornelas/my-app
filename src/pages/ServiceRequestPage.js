import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import './ServiceRequestPage.css';

function Solicitacao() {
    const [servicos, setServicos] = useState([]);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [meiosDePagamento, setMeiosDePagamento] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState('');
    const [preco, setPreco] = useState('');
    const [prazo, setPrazo] = useState('');
    const [dataPrevista, setDataPrevista] = useState('');
    const [meiosPagamentoHabilitados, setMeiosPagamentoHabilitados] = useState([]);
    const [meioPagamentoSelecionado, setMeioPagamentoSelecionado] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/service-requests/services');
                console.log('Response from services endpoint:', response.data);
                if (Array.isArray(response.data)) {
                    setServicos(response.data);
                } else {
                    console.error('Response is not an array:', response.data);
                    setServicos([]);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
                setServicos([]);
            }
        };

        const fetchSolicitacoes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/service-requests');
                console.log('Response from requests endpoint:', response.data);
                setSolicitacoes(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching requests:', error);
                setSolicitacoes([]);
            }
        };

        const fetchMeiosDePagamento = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/payment-methods');
                console.log('Response from payment methods endpoint:', response.data);
                setMeiosDePagamento(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching payment methods:', error);
                setMeiosDePagamento([]);
            }
        };

        fetchServicos();
        fetchSolicitacoes();
        fetchMeiosDePagamento();
    }, []);

    useEffect(() => {
        const atualizarValores = () => {
            const servico = servicos.find(s => s.nome === servicoSelecionado);
            if (servico) {
                setPreco(servico.preco);
                setPrazo(servico.prazo);
                setDataPrevista(calcularDataPrevista(servico.prazo));

                const meiosHabilitados = meiosDePagamento.filter(meio => meio.valorMaximo >= servico.preco);
                setMeiosPagamentoHabilitados(meiosHabilitados);
            } else {
                setPreco('');
                setPrazo('');
                setDataPrevista('');
                setMeiosPagamentoHabilitados([]);
            }
        };

        atualizarValores();
    }, [servicoSelecionado, servicos, meiosDePagamento]);

    const calcularDataPrevista = (prazo) => {
        const dataAtual = new Date();
        dataAtual.setDate(dataAtual.getDate() + parseInt(prazo, 10));
        return dataAtual.toISOString().split('T')[0];
    };

    const handleSolicitacao = async () => {
        const clienteId = localStorage.getItem('clienteId');
        const servico = servicos.find(servico => servico.nome === servicoSelecionado);

        if (!clienteId || !servico) {
            alert('Erro ao identificar cliente ou serviço selecionado.');
            return;
        }

        const novaSolicitacao = {
            clienteId: parseInt(clienteId, 10),
            servicoId: servico.id,
            dataPedido: new Date().toISOString().split('T')[0],
            status: 'Em Elaboração',
            dataPrevista: dataPrevista,
            meioPagamentoSigla: meiosDePagamento.find(meio => meio.nome === meioPagamentoSelecionado).sigla
        };

        try {
            const response = await axios.post('http://localhost:3001/api/service-requests', novaSolicitacao);
            if (response.data.status === 'success') {
                setSolicitacoes([...solicitacoes, novaSolicitacao]);
                setServicoSelecionado('');
                setMeioPagamentoSelecionado('');
                alert('Solicitação criada com sucesso!');
            } else {
                alert('Erro ao criar solicitação.');
            }
        } catch (error) {
            console.error('Error creating request:', error);
            alert('Erro ao criar solicitação.');
        }
    };

    const handleExcluir = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/service-requests/${id}`);
            if (response.data.status === 'success') {
                setSolicitacoes(solicitacoes.filter(solicitacao => solicitacao.id !== id));
                alert('Solicitação excluída com sucesso!');
            } else {
                alert('Erro ao excluir solicitação.');
            }
        } catch (error) {
            console.error('Error deleting request:', error);
            alert('Erro ao excluir solicitação.');
        }
    };

    return (
        <div className="solicitacao-container">
            <header>
                <img src="/logo.png" alt="Logo da Empresa" />
                <h1>Bem-vindo à Empresa de TI</h1>
                <nav>
                    <ul>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Cadastrar</a></li>
                        <li><a href="/service-request">Solicitar Serviço</a></li>
                        <li><a href="/payment-method">Cadastro de Meio de Pagamento</a></li>
                        <li><a href="/solicitacao" id="solicitacaoLink" style={{ display: 'none' }}>Solicitação de Serviços</a></li>
                    </ul>
                </nav>
                <button className="home-button" onClick={() => navigate('/')}>
                    <FaHome />
                </button>
            </header>
            <main className="solicitacao-main">
                <section className="usuario-info">
                    <label>Nome: João da Silva</label>
                    <label>Login: joao.silva@example.com</label>
                </section>
                <section className="fazer-solicitacao">
                    <h2>Fazer Solicitação</h2>
                    <label htmlFor="servico">Serviço:</label>
                    <select id="servico" value={servicoSelecionado} onChange={e => setServicoSelecionado(e.target.value)}>
                        <option value="">Selecione um serviço</option>
                        {servicos.map(servico => (
                            <option key={servico.id} value={servico.nome}>{servico.nome}</option>
                        ))}
                    </select>
                    <p>Preço: {preco}</p>
                    <p>Prazo: {prazo} dias</p>
                    <p>Data Prevista de Atendimento: {dataPrevista}</p>
                    <label htmlFor="meio-pagamento">Meio de Pagamento:</label>
                    <select id="meio-pagamento" value={meioPagamentoSelecionado} onChange={e => setMeioPagamentoSelecionado(e.target.value)}>
                        <option value="">Selecione um meio de pagamento</option>
                        {meiosPagamentoHabilitados.map(meio => (
                            <option key={meio.sigla} value={meio.nome}>{meio.nome}</option>
                        ))}
                    </select>
                    <p>Status: Em Elaboração</p>
                    <button onClick={handleSolicitacao} disabled={!servicoSelecionado || !meioPagamentoSelecionado}>Solicitar</button>
                </section>
                <section className="solicitacoes-feitas">
                    <h2>Solicitações Feitas</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Data do Pedido</th>
                                <th>Número da Solicitação</th>
                                <th>Serviço</th>
                                <th>Status</th>
                                <th>Preço</th>
                                <th>Prazo</th>
                                <th>Data Prevista</th>
                                <th>Meio de Pagamento</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitacoes.map((solicitacao, index) => {
                                const servico = servicos.find(s => s.id === solicitacao.servicoId);
                                return (
                                    <tr key={index}>
                                        <td>{solicitacao.dataPedido}</td>
                                        <td>{solicitacao.id}</td>
                                        <td>{servico ? servico.nome : 'Desconhecido'}</td>
                                        <td>{solicitacao.status}</td>
                                        <td>{servico ? servico.preco : 'Desconhecido'}</td>
                                        <td>{servico ? servico.prazo : 'Desconhecido'}</td>
                                        <td>{solicitacao.dataPrevista}</td>
                                        <td>{solicitacao.meioPagamentoSigla}</td>
                                        <td>
                                            <button onClick={() => handleExcluir(solicitacao.id)}>Excluir</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
                <section className="voltar">
                    <button onClick={() => window.history.back()}>Voltar</button>
                </section>
            </main>
        </div>
    );
}

export default Solicitacao;
