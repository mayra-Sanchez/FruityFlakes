import React from 'react';
import './menu.css';
import splashLeft from '../../assets/splash-left.png';
import splashRight from '../../assets/splash-right.png';
import img1 from '../../assets/comida.jpg';
import img2 from '../../assets/comida.jpg';
import img3 from '../../assets/comida.jpg';
import img4 from '../../assets/comida.jpg';
import img5 from '../../assets/comida.jpg';
import img6 from '../../assets/comida.jpg';

const products = [
    { name: 'Snow Fruity', image: img1 },
    { name: 'Empanadas', image: img2 },
    { name: 'Fruit Salad - Yogurt Bowl', image: img3 },
    { name: 'Arancinis', image: img4 },
    { name: 'Bubble Tea', image: img5 },
    { name: 'Fruit Bowl XL', image: img6 },
];

const Menu = () => {
    return (
        <div className="menu-section">
            <img src={splashLeft} alt="splash" className="splash left" />
            <img src={splashRight} alt="splash" className="splash right" />
            <h1 className="title">FROM OUR FOOD TRUCK TO YOUR DOORSTEP!</h1>
            <p className="subtitle">NOW YOU CAN ENJOY FRUITY FLAKES WHEREVER YOU ARE!</p>
            <p className="description">
                OUR ORDERING SYSTEM LETS YOU GET YOUR FAVOURITE TREATS DELIVERED STRAIGHT TO YOUR DOORSTEP. WHETHER YOU'RE TREATING THE FAMILY, SURPRISING A MATE, OR JUST INDULGING YOURSELF, WE BRING THE FRESHNESS AND FLAVOUR OF OUR PRODUCTS RIGHT TO YOU!
            </p>
            <div className="scroll-container">
                {products.map((product, index) => (
                    <div key={index} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <p>{product.name.toUpperCase()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
