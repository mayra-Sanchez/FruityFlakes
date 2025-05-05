import React from 'react';
import './home.css';
import video from '../../assets/video/video_inicial.mov';

const Home = () => {
    return (
        <div className="home-page">
            <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={video} type="video/mp4" />
                Tu navegador no soporta el video.
            </video>
        </div>
    );
};

export default Home;
