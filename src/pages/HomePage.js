import React from 'react';
import './HomePage.css';

function Home() {
    return (
        <div>
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
                        <li><a href="/add-service">Cadastro de Serviço</a></li>
                        
                    </ul>
                </nav>
            </header>
            <main>
                <section>
                    <h2>Sobre Nós</h2>
                    <p>A Empresa de TI foi fundada em 2024 com a missão de fornecer soluções tecnológicas inovadoras...</p>
                    <div class="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/M5P-W_wyN7s?autoplay=1"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Vídeo Institucional da Empresa"
                    ></iframe>
                    </div>

                    <div className="gallery">
                        <img src="/foto1.jpg" alt="Instalação 1" />
                        <img src="/foto2.jpg" alt="Instalação 2" />
                        <img src="/foto3.jpg" alt="Funcionário 1" />
                        <img src="/foto4.jpg" alt="Funcionário 2" />
                    </div>
                </section>
                <section>
                    <h2>Serviços</h2>
                    <p>Oferecemos uma gama de serviços, incluindo:</p>
                    <ul>
                        <li>Desenvolvimento de Software</li>
                        <li>Consultoria em TI</li>
                        <li>Suporte Técnico</li>
                        <li>Infraestrutura de Redes</li>
                    </ul>
                </section>
                <section>
                    <h2>Fundadores</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Cargo</th>
                                <th>Nome</th>
                                <th>CV</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CEO</td>
                                <td>Tácio Montarroios</td>
                                <td>Desenvolvimento</td>
                            </tr>
                            <tr>
                                <td>CTO</td>
                                <td>Bruno Valença</td>
                                <td>Desenvolvimento</td>
                            </tr>
                            <tr>
                                <td>COO</td>
                                <td>Luís Arthur</td>
                                <td>Desenvolvimento</td>
                            </tr>
                            <tr>
                                <td>CDO</td>
                                <td>Laura Bafman</td>
                                <td>Design</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
            <footer>
                <div>
                    <h3>Contato</h3>
                    <ul>
                        <li>Telefone: (81) 1234-5678</li>
                        <li>WhatsApp: (81) 98765-4321</li>
                        <li><a href="mailto:contato@empresa.com">contato@empresa.com</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Endereço</h3>
                    <p>Avenida, Cais do Apolo, 77, Recife - PE, 50030-220</p>
                </div>
                <div>
                    <h3>Formas de Pagamento</h3>
                    <img src="/cartao1.png" alt="Cartão 1" />
                    <img src="/cartao2.png" alt="Cartão 2" />
                </div>
            </footer>
        </div>
    );
}

export default Home;
