import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ServiceRequestPage from './pages/ServiceRequestPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import AddServicePage from './pages/AddServicePage';
import './index.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/service-request" element={<ServiceRequestPage />} />
      <Route path="/payment-method" element={<PaymentMethodPage />} />
      <Route path="/add-service" element={<AddServicePage />} />
    </Routes>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
