import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './ServiceRequestPage.css';

function Solicitacao() {
    const [servicos] = useState([
        { nome: 'Desenvolvimento de Software', preco: 1500, prazo: 30 },
        { nome: 'Manutenção de Sistemas', preco: 800, prazo: 15 },
        { nome: 'Consultoria em TI', preco: 1200, prazo: 20 }
    ]);
    const [solicitacoes, setSolicitacoes] = useState([
        { dataPedido: '2024-06-01', numero: 1, servico: 'Desenvolvimento de Software', status: 'EM ELABORAÇÃO', preco: 1500, prazo: 30, dataPrevista: '2024-07-01', meioPagamento: 'Cartão de Crédito' },
        { dataPedido: '2024-06-05', numero: 2, servico: 'Manutenção de Sistemas', status: 'EM ELABORAÇÃO', preco: 800, prazo: 15, dataPrevista: '2024-06-20', meioPagamento: 'Boleto Bancário' }
    ]);
    const meiosDePagamento = [
        { nome: 'Cartão de Crédito', valorMaximo: 2000 },
        { nome: 'Boleto Bancário', valorMaximo: 1000 },
        { nome: 'Pix', valorMaximo: 1500 }
    ];
    const [servicoSelecionado, setServicoSelecionado] = useState('');
    const [preco, setPreco] = useState('');
    const [prazo, setPrazo] = useState('');
    const [dataPrevista, setDataPrevista] = useState('');
    const [meiosPagamentoHabilitados, setMeiosPagamentoHabilitados] = useState([]);
    const [meioPagamentoSelecionado, setMeioPagamentoSelecionado] = useState('');
    const navigate = useNavigate();
    
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
    }, [servicoSelecionado, servicos]);    

    const calcularDataPrevista = (prazo) => {
        const dataAtual = new Date();
        dataAtual.setDate(dataAtual.getDate() + parseInt(prazo, 10));
        return dataAtual.toISOString().split('T')[0];
    };

    const handleSolicitacao = () => {
        const novaSolicitacao = {
            dataPedido: new Date().toISOString().split('T')[0],
            numero: solicitacoes.length + 1,
            servico: servicoSelecionado,
            status: 'EM ELABORAÇÃO',
            preco: preco,
            prazo: prazo,
            dataPrevista: dataPrevista,
            meioPagamento: meioPagamentoSelecionado
        };
    
        setSolicitacoes([...solicitacoes, novaSolicitacao]);
        setServicoSelecionado('');
        setMeioPagamentoSelecionado('');
    };    

    const handleExcluir = (index) => {
        setSolicitacoes(solicitacoes.filter((_, i) => i !== index));
    };

    return (
        <div className="solicitacao-container">
            <header className="solicitacao-header">
                <h1>Solicitação de Serviços de TI</h1>
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
                            <option key={servico.nome} value={servico.nome}>{servico.nome}</option>
                        ))}
                    </select>
                    <p>Preço: {preco}</p>
                    <p>Prazo: {prazo} dias</p>
                    <p>Data Prevista de Atendimento: {dataPrevista}</p>
                    <label htmlFor="meio-pagamento">Meio de Pagamento:</label>
                    <select id="meio-pagamento" value={meioPagamentoSelecionado} onChange={e => setMeioPagamentoSelecionado(e.target.value)}>
                        <option value="">Selecione um meio de pagamento</option>
                        {meiosPagamentoHabilitados.map(meio => (
                            <option key={meio.nome} value={meio.nome}>{meio.nome}</option>
                        ))}
                    </select>
                    <p>Status: EM ELABORAÇÃO</p>
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
                            {solicitacoes.map((solicitacao, index) => (
                                <tr key={index}>
                                    <td>{solicitacao.dataPedido}</td>
                                    <td>{solicitacao.numero}</td>
                                    <td>{solicitacao.servico}</td>
                                    <td>{solicitacao.status}</td>
                                    <td>{solicitacao.preco}</td>
                                    <td>{solicitacao.prazo}</td>
                                    <td>{solicitacao.dataPrevista}</td>
                                    <td>{solicitacao.meioPagamento}</td>
                                    <td>
                                        <button onClick={() => handleExcluir(index)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
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
