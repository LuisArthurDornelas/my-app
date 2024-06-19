import React, { useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';

const PaymentMethodPage = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [isElectronic, setIsElectronic] = useState(false);

  const handlePaymentMethod = async (e) => {
    e.preventDefault();
    if (maxValue <= 0) {
      alert('O valor máximo deve ser maior que zero');
      return;
    }
    try {
      const response = await api.post('/payment-methods', {
        code,
        name,
        maxValue,
        isElectronic
      });
      if (response.data.status === 'success') {
        alert('Meio de pagamento cadastrado com sucesso');
      } else {
        alert('Erro no cadastro do meio de pagamento');
      }
    } catch (error) {
      alert('Erro ao tentar cadastrar meio de pagamento');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <form onSubmit={handlePaymentMethod}>
          <label htmlFor="code">Sigla:</label>
          <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="maxValue">Valor Máximo:</label>
          <input type="number" id="maxValue" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} required />
          <label htmlFor="isElectronic">Meio Eletrônico:</label>
          <input type="checkbox" id="isElectronic" checked={isElectronic} onChange={(e) => setIsElectronic(e.target.checked)} />
          <button type="submit">Cadastrar Meio de Pagamento</button>
        </form>
      </main>
    </div>
  );
};

export default PaymentMethodPage;
