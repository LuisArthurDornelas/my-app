import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Importação do ícone FaHome
import ServiceForm from './ServiceForm';
import './PaymentMethodPage.css';

function AddService() {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [prazo, setPrazo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !preco || !prazo) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoServico = { nome, preco: parseFloat(preco), prazo: parseInt(prazo, 10) };
        console.log('Serviço adicionado:', novoServico);
        // Aqui você pode fazer uma requisição POST para salvar o novo serviço

        // Resetar o formulário
        setNome('');
        setPreco('');
        setPrazo('');

        // Navegar de volta para a página de solicitação ou outra página
        navigate('/service-request');
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
                <ServiceForm
                    nome={nome}
                    preco={preco}
                    prazo={prazo}
                    setNome={setNome}
                    setPreco={setPreco}
                    setPrazo={setPrazo}
                    handleSubmit={handleSubmit}
                />
            </main>
        </div>
    );
}

export default AddService;
