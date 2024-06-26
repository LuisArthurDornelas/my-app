import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import './AddServicePage.css';

function AddServicePage() {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [prazo, setPrazo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome || !preco || !prazo) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoServico = { nome, preco: parseFloat(preco), prazo: parseInt(prazo, 10) };
        try {
            const response = await axios.post('http://localhost:3001/api/services', novoServico);
            if (response.data.status === 'success') {
                alert('Serviço cadastrado com sucesso!');
                setNome('');
                setPreco('');
                setPrazo('');
            } else {
                alert('Erro ao cadastrar serviço.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar serviço:', error);
            alert('Erro ao cadastrar serviço.');
        }
    };

    return (
        <div className="add-service-container">
            <header className="add-service-header">
                <h1>Adicionar Serviço de TI</h1>
                <button className="home-button" onClick={() => navigate('/')}>
                    <FaHome />
                </button>
            </header>
            <main className="add-service-main">
                <form className="service-form" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome do Serviço:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <label htmlFor="preco">Preço:</label>
                    <input
                        type="number"
                        id="preco"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                    <label htmlFor="prazo">Prazo (dias):</label>
                    <input
                        type="number"
                        id="prazo"
                        value={prazo}
                        onChange={(e) => setPrazo(e.target.value)}
                        required
                    />
                    <button type="submit">Cadastrar Serviço</button>
                </form>
            </main>
        </div>
    );
}

export default AddServicePage;
