import React from 'react';
import './community.css';
// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import splashLeft from '../../assets/splash-left.png';
import splashRight from '../../assets/splash-right.png';
// Import the device images
import device1 from '../../assets/redes/43.png';
import device2 from '../../assets/redes/44.png';
import device3 from '../../assets/redes/45.png';
import device4 from '../../assets/redes/46.png';
import { translations } from '../../components/navbar/language/translations';
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube } from 'react-icons/fa';

const Community = ({ selectedLanguage = 'en' }) => {
    const t = translations[selectedLanguage] || translations['en'];

    return (
        <div className="community-page">
            <img src={splashLeft} alt={t.splashAlt} className="splash left" loading="lazy" />
            <img src={splashRight} alt={t.splashAlt} className="splash right" loading="lazy" />
            {/* Header Section */}
            <div className="community-header">
                <h1>{t.communityTitle}</h1>
                <p>{t.communitySubtitle}</p>
            </div>

            {/* Desktop Devices Grid */}
            <div className="devices-container-desktop">
                <DeviceItem
                    image={device1}
                    alt="Device 1"
                    icon={<FaInstagram className="social-icon" />}
                    url="https://www.instagram.com/fruityflakesau"
                    handle={t.instagramHandle}
                />
                <DeviceItem
                    image={device2}
                    alt="Device 2"
                    icon={<FaFacebook className="social-icon" />}
                    url="https://www.facebook.com/fruityflakesau/"
                    handle={t.facebookHandle}
                />
                <DeviceItem
                    image={device3}
                    alt="Device 3"
                    icon={<FaTiktok className="social-icon" />}
                    url="https://www.tiktok.com/@fruityflakesau"
                    handle={t.tiktokHandle}
                />
                <DeviceItem
                    image={device4}
                    alt="Device 4"
                    icon={<FaYoutube className="social-icon" />}
                    url="https://www.youtube.com/@fruityflakesau"
                    handle={t.youtubeHandle}
                />
            </div>

            {/* Mobile Swiper */}
            <div className="devices-container-mobile">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <DeviceItem
                            image={device1}
                            alt="Device 1"
                            icon={<FaInstagram className="social-icon" />}
                            url="https://www.instagram.com/fruityflakesau"
                            handle={t.instagramHandle}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <DeviceItem
                            image={device2}
                            alt="Device 2"
                            icon={<FaFacebook className="social-icon" />}
                            url="https://www.facebook.com/fruityflakesau/"
                            handle={t.facebookHandle}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <DeviceItem
                            image={device3}
                            alt="Device 3"
                            icon={<FaTiktok className="social-icon" />}
                            url="https://www.tiktok.com/@fruityflakesau"
                            handle={t.tiktokHandle}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <DeviceItem
                            image={device4}
                            alt="Device 4"
                            icon={<FaYoutube className="social-icon" />}
                            url="https://www.youtube.com/@fruityflakesau"
                            handle={t.youtubeHandle}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

// Componente reutilizable para los ítems de dispositivo
const DeviceItem = ({ image, alt, icon, url, handle }) => {
    return (
        <div className="device-item">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img src={image} alt={alt} className="device-image" />
            </a>
            <div className="social-handle">
                {icon}
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {handle}
                </a>
            </div>
        </div>
    );
};

export default Community;