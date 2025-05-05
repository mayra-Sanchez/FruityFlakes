import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './navbar.css';
import logo from '../../assets/logo-fruity-flakes.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faShoppingCart,
    faGlobe,
    faPlus,
    faMinus,
    faTrashAlt,
    faTimes,
    faBars,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { translations } from './language/translations';

// Import Leaflet marker images directly
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Navbar = ({ selectedLanguage = 'en', onLanguageChange }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    
    // Memoize translations to avoid recalculating on every render
    const t = useMemo(() => translations[selectedLanguage] || translations['en'], [selectedLanguage]);

    // Store location coordinates
    const storeLocation = useMemo(() => [-31.9505, 115.8605], []);
    const storeName = t.storeName;

    // Memoize languages list
    const languages = useMemo(() => [
        { code: 'en', name: t.languages.en },
        { code: 'es', name: t.languages.es },
        { code: 'fr', name: t.languages.fr },
        { code: 'de', name: t.languages.de }
    ], [t.languages]);

    // Fix Leaflet marker icons
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x,
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setMenuOpen(false);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const updateCart = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(cart);
            setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
        };

        updateCart();
        window.addEventListener('storage', updateCart);
        const interval = setInterval(updateCart, 1000);

        return () => {
            window.removeEventListener('storage', updateCart);
            clearInterval(interval);
        };
    }, []);

    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            if (isMobile) setMenuOpen(false);
        }
    }, [isMobile]);

    const increaseQuantity = useCallback((index) => {
        const newCart = [...cartItems];
        newCart[index].quantity += 1;
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }, [cartItems]);

    const decreaseQuantity = useCallback((index) => {
        const newCart = [...cartItems];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCartItems(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }, [cartItems]);

    const removeFromCart = useCallback((index) => {
        const newCart = cartItems.filter((_, i) => i !== index);
        setCartItems(newCart);
        setCartCount(newCart.reduce((total, item) => total + item.quantity, 0));
        localStorage.setItem('cart', JSON.stringify(newCart));
    }, [cartItems]);

    const handleBuy = useCallback(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const cartMessage = encodeURIComponent(
            t.whatsappMessage + '%0A%0A' +
            cartItems.map(item => `✔ ${item.name} x${item.quantity} - $${item.price * item.quantity}`).join('%0A') +
            '%0A%0A' + t.total + ': $' + total
        );

        const whatsappUrl = `https://wa.me/?text=${cartMessage}`;
        window.open(whatsappUrl, '_blank');

        localStorage.removeItem('cart');
        setCartItems([]);
        setCartCount(0);
        setShowCart(false);
    }, [cartItems, t]);

    const toggleLanguageDropdown = useCallback((e) => {
        e.stopPropagation();
        setShowLanguageDropdown(prev => !prev);
        setShowMap(false);
    }, []);

    const selectLanguage = useCallback((languageCode) => {
        onLanguageChange(languageCode);
        setShowLanguageDropdown(false);
    }, [onLanguageChange]);

    useEffect(() => {
        const handleClickOutside = () => {
            if (showLanguageDropdown) setShowLanguageDropdown(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showLanguageDropdown]);

    return (
        <header className={`navbar ${(showCart || showMap || showLanguageDropdown) ? 'modal-open' : ''}`}>
            <div className="top-bar">
                <div className="left-icons">
                    <button
                        className="hamburger"
                        onClick={() => isMobile && setMenuOpen(!menuOpen)}
                    >
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </button>
                </div>

                <div className="logo-container">
                    <button onClick={() => scrollToSection('home')} className="logo-button">
                        <img src={logo} alt="Fruity Flakes Logo" className="logo" />
                    </button>
                </div>

                <div className="right-icons">
                    <div className="language-selector">
                        <button
                            className="language-icon"
                            onClick={toggleLanguageDropdown}
                        >
                            <FontAwesomeIcon icon={faGlobe} />
                            <FontAwesomeIcon icon={faChevronDown} className="chevron" />
                        </button>
                        {showLanguageDropdown && (
                            <div className="language-dropdown">
                                {languages.map((lang) => (
                                    <div
                                        key={lang.code}
                                        className={`language-option ${selectedLanguage === lang.code ? 'selected' : ''}`}
                                        onClick={() => selectLanguage(lang.code)}
                                    >
                                        {lang.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="location-icon" onClick={() => setShowMap(!showMap)}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </button>

                    <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {cartCount > 0 && (
                            <span className="cart-count">{cartCount}</span>
                        )}
                    </div>
                </div>
            </div>

            {(menuOpen || !isMobile) && (
                <nav className={`menu-bar ${isMobile ? 'vertical' : 'horizontal'}`}>
                    <button onClick={() => scrollToSection('menu')}>{t.menu}</button>
                    <button onClick={() => scrollToSection('details')}>{t.details}</button>
                    <button onClick={() => scrollToSection('events')}>{t.events}</button>
                    <button onClick={() => scrollToSection('contact')}>{t.contact}</button>
                </nav>
            )}

            {showCart && (
                <div className="cart-modal">
                    <div className="cart-header">
                        <h3>
                            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '10px' }} />
                            {t.cartTitle}
                        </h3>
                        <button className="close-cart" onClick={() => setShowCart(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">{t.emptyCart}</div>
                    ) : (
                        <>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {cartItems.map((item, index) => (
                                    <li key={index} className="cart-item">
                                        <div className="cart-item-info">
                                            <div className="cart-item-name">{item.name}</div>
                                            <div className="cart-item-price">
                                                ${item.price * item.quantity}
                                            </div>
                                        </div>
                                        <div className="cart-item-actions">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => decreaseQuantity(index)}
                                                title={t.decrease}
                                            >
                                                <FontAwesomeIcon icon={faMinus} size="xs" />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => increaseQuantity(index)}
                                                title={t.increase}
                                            >
                                                <FontAwesomeIcon icon={faPlus} size="xs" />
                                            </button>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromCart(index)}
                                                title={t.remove}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="cart-total">
                                {t.total}: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                            </div>

                            <button className="buy-btn" onClick={handleBuy}>
                                {t.buyButton}
                            </button>
                        </>
                    )}
                </div>
            )}

            {showMap && (
                <div className="map-modal">
                    <div className="map-header">
                        <h3>{t.locationTitle}</h3>
                        <button className="close-map" onClick={() => setShowMap(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className="map-container">
                        <MapContainer
                            center={storeLocation}
                            zoom={15}
                            style={{ height: '400px', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={storeLocation}>
                                <Popup>{storeName}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;