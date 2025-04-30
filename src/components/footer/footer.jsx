import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2023 Mi Aplicación. Todos los derechos reservados.</p>
            <div className="footer-links">
                <a href="/about">Sobre Nosotros</a>
                <a href="/contact">Contacto</a>
            </div>
        </footer>
    );
};

export default Footer;