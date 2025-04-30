import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Menu from './pages/menu/menu';
import Events from './pages/events/events';
import Details from './pages/details/details';
import Community from './pages/community/comunnity';
import Home from './pages/home/home';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />

            <section id="home" className="section">
                <Home></Home>
            </section>

            <section id="menu" className="section">
                <Menu></Menu>
            </section>

            <section id="events" className="section">
                <Events></Events>
            </section>

            <section id="details" className="section">
                <Details></Details>
            </section>

            <section id="contact" className="section">
                <Community></Community>
            </section>

            <Footer />
        </div>
    );
}

export default App;