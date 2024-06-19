import React from 'react';
import Header from '../components/Header';

const HomePage = () => (
  <div>
    <Header />
    <div className="wrapper">
      <main>
        <section>
          <h2>Sobre Nós</h2>
          <p>Texto com uma breve história da empresa.</p>
        </section>
        <section>
          <h2>Vídeo Institucional</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/KWuqPn-Eurw"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </section>
        <section>
          <h2>Nossas Instalações</h2>
          <div className="gallery">
            <a
              href="images/photo1.jpg"
              data-lightbox="gallery"
              data-title="Instalação 1"
            >
              <img src="images/photo1.jpg" alt="Instalação 1" />
            </a>
            <a
              href="images/photo2.jpg"
              data-lightbox="gallery"
              data-title="Instalação 2"
            >
              <img src="images/photo2.jpg" alt="Instalação 2" />
            </a>
            <a
              href="images/photo3.jpg"
              data-lightbox="gallery"
              data-title="Instalação 3"
            >
              <img src="images/photo3.jpg" alt="Instalação 3" />
            </a>
            <a
              href="images/photo4.jpg"
              data-lightbox="gallery"
              data-title="Instalação 4"
            >
              <img src="images/photo4.jpg" alt="Instalação 4" />
            </a>
          </div>
        </section>
        <section>
          <h2>Serviços de TI</h2>
          <p>
            Apresentação estática dos principais serviços de TI oferecidos pela
            empresa.
          </p>
        </section>
        <section>
          <h2>Fundadores</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Cargo</th>
                  <th>Nome</th>
                  <th>Breve CV</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CEO</td>
                  <td>Nome 1</td>
                  <td>Breve CV 1</td>
                </tr>
                <tr>
                  <td>CTO</td>
                  <td>Nome 2</td>
                  <td>Breve CV 2</td>
                </tr>
                <tr>
                  <td>COO</td>
                  <td>Nome 3</td>
                  <td>Breve CV 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  </div>
);

export default HomePage;
