import React, { useState, useMemo } from 'react';
import './events.css';
import splashLeft from '../../assets/splash-left.png';
import e1 from '../../assets/pics/dueña.png';
import e2 from '../../assets/pics/negocio.png';
import e3 from '../../assets/pics/3.png';
import e4 from '../../assets/pics/5.png';
import e5 from '../../assets/pics/2.png';
import e6 from '../../assets/pics/4.png';
import e7 from '../../assets/pics/7.png';
import e8 from '../../assets/pics/6.png';
import { translations } from '../../components/navbar/language/translations';

const Events = ({ selectedLanguage = 'en' }) => {
    const [modalImg, setModalImg] = useState(null);
    const t = translations[selectedLanguage] || translations['en'];
    
    // Memoize images array to prevent unnecessary recalculations
    const images = useMemo(() => [e1, e2, e3, e4, e5, e6, e7, e8], []);
    
    // Memoize WhatsApp message
    const whatsappUrl = useMemo(() => {
        const message = encodeURIComponent(t.whatsappMessage);
        return `https://wa.me/573001234567?text=${message}`;
    }, [t.whatsappMessage]);

    const openModal = (img) => setModalImg(img);
    const closeModal = () => setModalImg(null);

    return (
        <div className="events-section">
            <div className="events-left">
                <h1>{t.eventsTitle}</h1>
                <p>{t.eventsDescription}</p>
                <a
                    href={whatsappUrl}
                    className="order-now"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t.orderNowButton}
                </a>
                <img 
                    src={splashLeft} 
                    alt={t.splashAlt} 
                    className="splash-left"
                    loading="lazy"
                />
            </div>

            <div className="events-right">
                <div className="grid-collage">
                    {images.map((img, index) => (
                        <img
                            src={img}
                            alt={`${t.eventAlt}-${index}`}
                            key={index}
                            onClick={() => openModal(img)}
                            loading="lazy"
                        />
                    ))}
                </div>
            </div>

            {modalImg && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-modal" onClick={closeModal}>&times;</span>
                        <img src={modalImg} alt={t.zoomedImageAlt} />
                    </div>
                </div>
            )}

            <div className="gift-section">
                <h2>{t.giftTitle}</h2>
                <p>{t.giftDescription}</p>

                <div className="gift-items">
                    {[1, 2, 3].map((i) => (
                        <div className="gift-card" key={i}>
                            <div className="gift-image-container">
                                <img 
                                    src={e1} 
                                    alt={`${t.giftAlt} ${i}`} 
                                    loading="lazy"
                                />
                            </div>
                            <strong>{t.giftCardTitle}</strong>
                            <p>{t.giftCardDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Events);