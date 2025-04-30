import React, { useState } from 'react';
import './events.css';
import splashLeft from '../../assets/splash-left.png';
import e1 from '../../assets/pics/foto_collage.jpg';
import e2 from '../../assets/pics/foto_collage.jpg';
import e3 from '../../assets/pics/foto_collage.jpg';
import e4 from '../../assets/pics/foto_collage.jpg';
import e5 from '../../assets/pics/foto_collage.jpg';
import e6 from '../../assets/pics/foto_collage.jpg';
import e7 from '../../assets/pics/foto_collage.jpg';
import e8 from '../../assets/pics/foto_collage.jpg';

const images = [e1, e2, e3, e4, e5, e6, e7, e8];

const Events = () => {
    const [modalImg, setModalImg] = useState(null);
    const whatsappText = encodeURIComponent("Hola, estoy interesado en contratar un evento con Fruity Flakes 🍓🎉");

    const openModal = (img) => setModalImg(img);
    const closeModal = () => setModalImg(null);

    return (
        <div className="events-section">
            <div className="events-left">
                <h1>FRUITY FLAKES<br />CATERING & EVENTS</h1>
                <p>
                    WE BRING THE FRESH, UNIQUE FLAVOURS OF FRUITY FLAKES TO YOUR SPECIAL EVENTS!
                    OUR CUSTOMISED CATERING SERVICE OFFERS ALL YOUR FAVOURITE TREATS, PERFECT FOR PARTIES, CORPORATE GATHERINGS, AND CELEBRATIONS.
                    WE TAKE CARE OF EVERY DETAIL SO YOU CAN ENJOY A DELICIOUS AND VIBRANT EXPERIENCE. LET US MAKE YOUR EVENT UNFORGETTABLE!
                </p>
                <a
                    href={`https://wa.me/573001234567?text=${whatsappText}`}
                    className="order-now"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ORDER NOW
                </a>
                <img src={splashLeft} alt="splash" className="splash-left" />
            </div>

            <div className="events-right">
                <div className="grid-collage">
                    {images.map((img, index) => (
                        <img
                            src={img}
                            alt={`event-${index}`}
                            key={index}
                            onClick={() => openModal(img)}
                        />
                    ))}
                </div>
            </div>

            {modalImg && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <img src={modalImg} alt="zoomed" />
                    </div>
                </div>
            )}

            <div className="gift-section">
                <h2>FRUITY FLAKES GIFTS: SWEET TREATS<br />FOR EVERY OCCASION</h2>
                <p>
                    SURPRISE SOMEONE WITH A UNIQUE AND DELICIOUS GIFT! OUR HANDCRAFTED GIFT OPTIONS ARE PERFECT FOR ANY OCCASION—BIRTHDAYS,
                    ANNIVERSARIES, OR SPECIAL EVENTS. WE CREATE FRESH, PERSONALISED SELECTIONS WITH OUR BEST PRODUCTS, GUARANTEED TO BRIGHTEN
                    SOMEONE’S DAY. SWEETEN EVERY MOMENT WITH FRUITY FLAKES!
                </p>

                <div className="gift-items">
                    {[1, 2, 3].map((i) => (
                        <div className="gift-card" key={i}>
                            <div className="gift-image-container">
                                <img src={e1} alt={`gift ${i}`} />
                                {/* <img src={bow} alt="bow" className="gift-bow" /> */}
                            </div>
                            <strong>BLA BLA BLA BLA BLA</strong>
                            <p>BLA BLA BLA BLA BLA BLA BLA</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Events;
