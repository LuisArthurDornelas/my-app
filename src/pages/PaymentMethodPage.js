import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import './PaymentMethodPage.css';

function CadastroMeioPagamento() {
    const [nome, setNome] = useState('');
    const [sigla, setSigla] = useState('');
    const [valorMaximo, setValorMaximo] = useState('');
    const [meioEletronico, setMeioEletronico] = useState(false);
    const [meiosPagamento, setMeiosPagamento] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeiosPagamento = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/payment-methods');
                setMeiosPagamento(response.data);
            } catch (error) {
                console.error('Error fetching payment methods:', error);
            }
        };

        fetchMeiosPagamento();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome || !sigla || !valorMaximo) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoMeioPagamento = { nome, sigla, valorMaximo: parseFloat(valorMaximo), meioEletronico };
        try {
            const response = await axios.post('http://localhost:3001/api/payment-methods', novoMeioPagamento);
            if (response.data.status === 'success') {
                alert('Meio de pagamento cadastrado com sucesso!');
                // Atualiza a lista de meios de pagamento
                setMeiosPagamento([...meiosPagamento, novoMeioPagamento]);
                // Resetar o formulário
                setNome('');
                setSigla('');
                setValorMaximo('');
                setMeioEletronico(false);
            } else {
                alert('Erro ao cadastrar meio de pagamento.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar meio de pagamento:', error);
            alert('Erro ao cadastrar meio de pagamento.');
        }
    };

    return (
        <div className="add-payment-method-container">
            <header className="add-payment-method-header">
                <h1>Adicionar Meio de Pagamento</h1>
                <button className="home-button" onClick={() => navigate('/')}>
                    <FaHome />
                </button>
            </header>
            <main className="add-payment-method-main">
                <form className="payment-method-form" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome do Meio de Pagamento:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <label htmlFor="sigla">Sigla:</label>
                    <input
                        type="text"
                        id="sigla"
                        name="sigla"
                        value={sigla}
                        onChange={(e) => setSigla(e.target.value)}
                        required
                    />
                    <label htmlFor="valorMaximo">Valor Máximo:</label>
                    <input
                        type="number"
                        id="valorMaximo"
                        name="valorMaximo"
                        value={valorMaximo}
                        onChange={(e) => setValorMaximo(e.target.value)}
                        required
                    />
                    <label htmlFor="meioEletronico">Meio Eletrônico:</label>
                    <input
                        type="checkbox"
                        id="meioEletronico"
                        name="meioEletronico"
                        checked={meioEletronico}
                        onChange={(e) => setMeioEletronico(e.target.checked)}
                    />
                    <div className="payment-method-buttons">
                        <button type="submit">Cadastrar</button>
                        <button type="button" onClick={() => { setNome(''); setSigla(''); setValorMaximo(''); setMeioEletronico(false); }}>Limpar</button>
                    </div>
                </form>
                <h2>Meios de Pagamento Cadastrados</h2>
                <ul>
                    {meiosPagamento.map((meio) => (
                        <li key={meio.sigla}>
                            {meio.nome} ({meio.sigla}) - Valor Máximo: {meio.valorMaximo} - Meio Eletrônico: {meio.meioEletronico ? 'Sim' : 'Não'}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default CadastroMeioPagamento;
