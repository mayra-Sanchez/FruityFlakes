import React, { useEffect, useState, useMemo } from 'react';
import './menu.css';
import splashLeft from '../../assets/splash-left.png';
import splashRight from '../../assets/splash-right.png';
import arancini1 from '../../assets/products/arancini/3.png';
import arancini2 from '../../assets/products/arancini/4.png';
import chicken1 from '../../assets/products/chicken parmi sandwich/7.png';
import chicken2 from '../../assets/products/chicken parmi sandwich/8.png';
import empanada1 from '../../assets/products/empanadas/1.png';
import empanada2 from '../../assets/products/empanadas/2.png';
import fuitsalad1 from '../../assets/products/fruit salad/16.png';
import fuitsalad2 from '../../assets/products/fruit salad/17.png';
import fruitysnow1 from '../../assets/products/fruity snow cone/14.png';
import fruitysnow2 from '../../assets/products/fruity snow cone/15.png';
import snowcoffee from '../../assets/products/snow coffe/11.png';
import snowcone from '../../assets/products/snow cone/9.png';
import steaksanga1 from '../../assets/products/STEAK SANGA/5.png';
import steaksanga2 from '../../assets/products/STEAK SANGA/6.png';
import topicalpunch1 from '../../assets/products/tropical fruit punch/10.png';
import waffer1 from '../../assets/products/waffer/12.png';
import waffer2 from '../../assets/products/waffer/13.png';
import { translations } from '../../components/navbar/language/translations';

const Menu = ({ selectedLanguage = 'en' }) => {
    const t = translations[selectedLanguage] || translations['en'];
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const products = useMemo(() => [
        {
          name: t.products.arancini.name,
          images: [arancini1, arancini2],
          description: t.products.arancini.description,
          price: 12.99
        },
        {
          name: t.products.chickenParmi.name,
          images: [chicken1, chicken2],
          description: t.products.chickenParmi.description,
          price: 12.99
        },
        {
          name: t.products.empanadas.name,
          images: [empanada1, empanada2],
          description: t.products.empanadas.description,
          price: 12.99
        },
        {
          name: t.products.fruitSalad.name,
          images: [fuitsalad1, fuitsalad2],
          description: t.products.fruitSalad.description,
          price: 12.99
        },
        {
          name: t.products.fruitySnowCone.name,
          images: [fruitysnow1, fruitysnow2],
          description: t.products.fruitySnowCone.description,
          price: 12.99
        },
        {
          name: t.products.snowCoffee.name,
          images: [snowcoffee],
          description: t.products.snowCoffee.description,
          price: 12.99
        },
        {
          name: t.products.snowCone.name,
          images: [snowcone],
          description: t.products.snowCone.description,
          price: 12.99
        },
        {
          name: t.products.steakSanga.name,
          images: [steaksanga1, steaksanga2],
          description: t.products.steakSanga.description,
          price: 12.99
        },
        {
          name: t.products.tropicalPunch.name,
          images: [topicalpunch1],
          description: t.products.tropicalPunch.description,
          price: 12.99
        },
        {
          name: t.products.waffer.name,
          images: [waffer1, waffer2],
          description: t.products.waffer.description,
          price: 12.99
        },
    ], [t]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const savedCart = localStorage.getItem('cart');
            setCart(savedCart ? JSON.parse(savedCart) : []);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const addToCart = (product) => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = savedCart.findIndex(item => item.name === product.name);
        let updatedCart;
        
        if (existingItemIndex >= 0) {
            updatedCart = [...savedCart];
            updatedCart[existingItemIndex].quantity += 1;
        } else {
            updatedCart = [...savedCart, { 
                ...product, 
                quantity: 1,
                price: product.price
            }];
        }
    
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div className="menu-section" id="menu">
            <img src={splashLeft} alt={t.splashAlt} className="splash left" loading="lazy" />
            <img src={splashRight} alt={t.splashAlt} className="splash right" loading="lazy" />
            <h1 className="title">{t.menuTitle}</h1>
            <p className="subtitle">{t.menuSubtitle}</p>
            <p className="description">{t.menuDescription}</p>
            <div className="scroll-container">
                {products.map((product, index) => (
                    <ProductCard 
                        key={index} 
                        product={product} 
                        onViewDetails={() => setSelectedProduct(product)}
                        onAddToCart={() => addToCart(product)}
                        addToCartText={t.addToCart}
                        selectedLanguage={selectedLanguage}
                    />
                ))}
            </div>

            {selectedProduct && (
                <ProductModal 
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                    }}
                    closeText={t.close}
                    addToCartText={t.addToCart}
                    priceText={t.price}
                />
            )}
        </div>
    );
};

const ProductCard = ({ product, onViewDetails, onAddToCart, addToCartText, selectedLanguage }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (product.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % product.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [product.images]);

    return (
        <div className="product-card" onClick={onViewDetails}>
            <div className="image-wrapper">
                {product.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={product.name}
                        className={`product-image ${currentImage === idx ? 'active' : ''}`}
                        loading="lazy"
                    />
                ))}
            </div>
            <p className="product-name">{product.name.toUpperCase()}</p>
            <button onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
            }}>{addToCartText}</button>
        </div>
    );
};

const ProductModal = ({ product, onClose, onAddToCart, closeText, addToCartText, priceText }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (product.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % product.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [product.images]);

    const goToPrev = () => {
        setCurrentImage((prev) => 
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImage((prev) => 
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                <div className="modal-image-container">
                    {product.images.length > 1 && (
                        <button className="modal-arrow left" onClick={goToPrev}>&lt;</button>
                    )}
                    
                    <div className="modal-image-wrapper">
                        {product.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={product.name}
                                className={`modal-image ${currentImage === idx ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                    
                    {product.images.length > 1 && (
                        <button className="modal-arrow right" onClick={goToNext}>&gt;</button>
                    )}
                </div>
                
                <div className="modal-info">
                    <h2>{product.name.toUpperCase()}</h2>
                    <p className="modal-price">{priceText}: ${product.price.toFixed(2)}</p>
                    <p className="modal-description">{product.description}</p>
                    <button className="modal-add-btn" onClick={onAddToCart}>
                        {addToCartText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Menu);