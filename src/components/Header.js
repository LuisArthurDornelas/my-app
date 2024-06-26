import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="wrapper">
    <header>
      <img src="/logo.png" alt="Logo da Empresa" />
      <h1>Empresa de TI</h1>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Cadastrar Cliente</Link>
        <Link to="/service-request">Solicitar Serviço</Link>
        <Link to="/payment-method">Cadastro de Meio de Pagamento</Link>
        <Link to="/add-service">Cadastro de Serviço</Link>
      </nav>
    </header>
  </div>
);

export default Header;
