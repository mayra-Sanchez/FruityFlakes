import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Menu from './pages/menu/menu';
import Events from './pages/events/events';
import Details from './pages/details/details';
import Community from './pages/community/comunnity';
import Home from './pages/home/home';
import './App.css';

function App() {
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem('selectedLanguage') || 'en'
    );

    // Actualizar el idioma en todos los componentes
    const handleLanguageChange = (languageCode) => {
        setSelectedLanguage(languageCode);
        localStorage.setItem('selectedLanguage', languageCode);
    };

    // Verificar el idioma al cargar la aplicación
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            setSelectedLanguage(savedLanguage);
        }
    }, []);

    return (
        <div className="App">
            <Navbar 
                selectedLanguage={selectedLanguage} 
                onLanguageChange={handleLanguageChange}
            />

            <section id="home" className="section">
                <Home></Home>
            </section>

            <section id="menu" className="section">
                <Menu selectedLanguage={selectedLanguage}/>
            </section>

            <section id="events" className="section">
                <Events selectedLanguage={selectedLanguage}/>
            </section>

            <section id="details" className="section">
            <Details selectedLanguage={selectedLanguage} />
            </section>

            <section id="contact" className="section">
                <Community></Community>
            </section>

            <Footer />
        </div>
    );
}

export default App;