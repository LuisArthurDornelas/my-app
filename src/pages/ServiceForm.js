import React from 'react';
import PropTypes from 'prop-types';
import './ServiceForm.css';

function ServiceForm({ nome, preco, prazo, setNome, setPreco, setPrazo, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit} className="service-form">
            <label htmlFor="nome">Nome do Serviço:</label>
            <input
                type="text"
                id="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
            />
            <label htmlFor="preco">Preço:</label>
            <input
                type="number"
                id="preco"
                value={preco}
                onChange={e => setPreco(e.target.value)}
                required
            />
            <label htmlFor="prazo">Prazo (dias):</label>
            <input
                type="number"
                id="prazo"
                value={prazo}
                onChange={e => setPrazo(e.target.value)}
                required
            />
            <button type="submit">Salvar</button>
        </form>
    );
}

ServiceForm.propTypes = {
    nome: PropTypes.string.isRequired,
    preco: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    prazo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setNome: PropTypes.func.isRequired,
    setPreco: PropTypes.func.isRequired,
    setPrazo: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default ServiceForm;
