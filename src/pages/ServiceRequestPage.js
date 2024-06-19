import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Header from '../components/Header';

const ServiceRequestPage = () => {
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await api.get('/services');
      setServices(response.data);
    };

    const fetchRequests = async () => {
      const response = await api.get('/service-requests', { params: { login: 'user@example.com' } });
      setRequests(response.data);
    };

    fetchServices();
    fetchRequests();
  }, []);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    const selectedServiceDetails = services.find(service => service.id === e.target.value);
    setPaymentMethods(selectedServiceDetails.paymentMethods);
  };

  const handleAddRequest = () => {
    // Add logic to handle adding a new request
  };

  const handleDeleteRequest = (index) => {
    setRequests(requests.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header />
      <div className="wrapper">
        <main>
          <section>
            <h2>Solicitações Anteriores</h2>
            <table>
              <thead>
                <tr>
                  <th>Data do Pedido</th>
                  <th>Número da Solicitação</th>
                  <th>Serviço</th>
                  <th>Status</th>
                  <th>Preço</th>
                  <th>Data Prevista</th>
                  <th>Meio de Pagamento</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.date}</td>
                    <td>{request.id}</td>
                    <td>{request.serviceName}</td>
                    <td>{request.status}</td>
                    <td>{request.price}</td>
                    <td>{request.expectedDate}</td>
                    <td>{request.paymentMethod}</td>
                    <td><button onClick={() => handleDeleteRequest(index)}>Excluir</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section>
            <h2>Nova Solicitação</h2>
            <form>
              <label htmlFor="service">Serviço de TI:</label>
              <select id="service" onChange={handleServiceChange} value={selectedService}>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
              <label htmlFor="paymentMethod">Meio de Pagamento:</label>
              <select id="paymentMethod">
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>{method.name}</option>
                ))}
              </select>
              <p>Preço: <span id="price">{/* Price logic here */}</span></p>
              <p>Prazo de Atendimento: <span id="deadline">{/* Deadline logic here */}</span></p>
              <p>Data Prevista: <span id="expectedDate">{/* Expected date logic here */}</span></p>
              <p>Status: Em Elaboração</p>
              <button type="button" onClick={handleAddRequest}>Incluir Solicitação</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ServiceRequestPage;
