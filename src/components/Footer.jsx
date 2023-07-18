import React from 'react';
import '../styles/Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-container">
        <span className="footer-text">
          Desenvolvido por Rayanderson Sousa
        </span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/rayanderson-sousa/" className="links" target="_blank" >
            <i className="fa-brands fa-linkedin-in" />
          </a>
          <a href="https://github.com/rayandersonsousa" className="links" target="_blank">
            <i className="fa-brands fa-github" />
          </a>
          <a href="https://rayanderson-sousa-portifolio.vercel.app/" className="links" target="_blank">
            <i className="fa-solid fa-globe" />
          </a>
        </div>
      </footer>
    );
  }
}
