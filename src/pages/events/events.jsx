import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './events.css';
import splashLeft from '../../assets/splash-left.png';
import e1 from '../../assets/pics/dueña.png';
import e2 from '../../assets/regalos/empanada.png';
import e3 from '../../assets/pics/3.png';
import e4 from '../../assets/regalos/helado.png';
import e5 from '../../assets/pics/2.png';
import e6 from '../../assets/regalos/aji.png';
import e7 from '../../assets/pics/7.png';
import e8 from '../../assets/pics/6.png';
import { translations } from '../../components/navbar/language/translations';

const Events = ({ selectedLanguage = 'en' }) => {
    const [modalImg, setModalImg] = useState(null);
    const t = translations[selectedLanguage] || translations['en'];

    const images = useMemo(() => [e1, e2, e3, e4, e5, e6, e7, e8], []);
    const giftImages = useMemo(() => [e2, e4, e6], []);

    const whatsappUrl = useMemo(() => {
        const message = encodeURIComponent(t.whatsappMessage);
        return `https://wa.me/61432360084?text=${message}`;
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
                {/* Grid normal para desktop */}
                <div className="grid-collage desktop-collage">
                    {images.map((img, index) => (
                        <img
                            src={img}
                            alt={`${t.eventAlt}-${index}`}
                            key={`desktop-${index}`}
                            onClick={() => openModal(img)}
                            loading="lazy"
                        />
                    ))}
                </div>

                {/* Swiper para móviles */}
                <div className="mobile-swiper">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1.5}
                        centeredSlides={true}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            480: {
                                slidesPerView: 2,
                            },
                            640: {
                                slidesPerView: 2.5,
                            }
                        }}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={`mobile-${index}`}>
                                <img
                                    src={img}
                                    alt={`${t.eventAlt}-${index}`}
                                    onClick={() => openModal(img)}
                                    loading="lazy"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {modalImg && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button
                            className="close-modal"
                            onClick={closeModal}
                            aria-label="Cerrar"
                        >
                            &times;
                        </button>
                        <img
                            src={modalImg}
                            alt="Imagen ampliada"
                            className="modal-img"
                        />
                    </div>
                </div>
            )}

            <div className="gift-section">
                <h2>{t.giftTitle}</h2>
                <p>{t.giftDescription}</p>

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        480: {
                            slidesPerView: 1.5,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        }
                    }}
                >
                    {giftImages.map((img, index) => (
                        <SwiperSlide key={`gift-${index}`}>
                            <div className="gift-card">
                                <div className="gift-image-container">
                                    <img
                                        src={img}
                                        alt={`${t.giftAlt} ${index + 1}`}
                                        loading="lazy"
                                    />
                                </div>
                                <strong>{t.giftCardTitle}</strong>
                                <p>{t.giftCardDescription}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default React.memo(Events);