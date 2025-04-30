import React, { useState, useEffect } from 'react';
import './navbar.css';
import logo from '../../assets/logo-fruity-flakes.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            if (isMobile) setMenuOpen(false);
        }
    };

    return (
        <header className="navbar">
            <div className="top-bar">
                <div className="left-icons">
                    <button
                        className="hamburger"
                        onClick={() => isMobile && setMenuOpen(!menuOpen)}
                    >
                        {menuOpen && isMobile ? '✖' : '☰'}
                    </button>
                    <button className="location-icon">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </button>
                </div>

                <div className="logo-container">
                    <button onClick={() => scrollToSection('home')} className="logo-button">
                        <img src={logo} alt="Fruity Flakes Logo" className="logo" />
                    </button>
                </div>

                <div className="right-icons">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </div>
            </div>

            {(menuOpen || !isMobile) && (
                <nav className={`menu-bar ${isMobile ? 'vertical' : 'horizontal'}`}>
                    <button onClick={() => scrollToSection('menu')}>MENU</button>
                    <button onClick={() => scrollToSection('details')}>FRUITY FLAKES DETAILS</button>
                    <button onClick={() => scrollToSection('events')}>EVENTS</button>
                    <button onClick={() => scrollToSection('contact')}>CONTACT</button>
                </nav>
            )}
        </header>
    );
};

export default Navbar;