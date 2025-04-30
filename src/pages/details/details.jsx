import React from 'react';
import './details.css';
import food from '../../assets/icons/food.png';
import delivery from '../../assets/icons/delivery.png';
import packing from '../../assets/icons/packing.png';

const Details = () => {
    return (
        <div className="details-page">
            {/* Section 1: Why Choose Fruity Flakes */}
            <section className="why-choose-section">
                <h1>WHY CHOOSE FRUITY FLAKES?</h1>
                <p className="intro-text">
                    WE BRING YOU FRESH, HIGH-QUALITY FLAVOURS IN EVERY BITE, WITH A DELICIOUS RANGE OF SWEET AND SAVOURY OPTIONS. OUR CATERING SERVICE MAKES ANY EVENT SPECIAL, AND ORDERING IS EASY WITH DOORSTEP DELIVERY. PLUS, OUR PERSONALISED GIFT OPTIONS ARE PERFECT FOR ANY OCCASION.
                </p>
                <p className="highlight-text">
                    MORE THAN JUST FOOD – WE CREATE FLAVOURFUL, JOYFUL EXPERIENCES!
                </p>
                <div className="features-container">
                    <div className="feature">
                        <img
                            src={food}
                            alt="Food Product Icon"
                            className="feature-icon"
                        />
                        <h3>OUR PRODUCTS ARE ONE OF A KIND</h3>
                        <p>COMBINING FRESHNESS, FLAVOUR, AND CREATIVITY IN EVERY BITE. DELICIOUS TREATS YOU WON’T FIND ANYWHERE ELSE!</p>
                    </div>
                    <div className="feature">
                        <img
                            src={packing}
                            alt="Packaging Icon"
                            className="feature-icon"
                        />
                        <h3>CAREFULLY PACKAGED</h3>
                        <p>EVERY FRUITY FLAKES ORDER IS CAREFULLY PACKAGED TO ENSURE FRESHNESS, QUALITY, AND A PERFECT PRESENTATION – READY TO ENJOY OR GIFT!</p>
                    </div>
                    <div className="feature">
                        <img
                            src={delivery}
                            alt="Delivery Icon"
                            className="feature-icon"
                        />
                        <h3>WE DELIVER ACROSS PERTH</h3>
                        <p>BRINGING OUR FRESH AND DELICIOUS TREATS STRAIGHT TO YOUR DOOR – QUICK, EASY, AND HASSLE-FREE</p>
                    </div>
                </div>
            </section>

            {/* Section 2: Founder’s Message */}
            <section className="founder-section">
                <div className="founder-content">
                    <div className="founder-image">
                        {/* Placeholder for the image */}
                        <div className="image-placeholder">
                            <p>[Image of Founder with Fruity Flakes Branding]</p>
                        </div>
                    </div>
                    <div className="founder-message">
                        <h2>¡THANKS FOR BEING HERE!</h2>
                        <p>
                            HEY! I’M VIVIANA, THE FOUNDER OF FRUITY FLAKES, AND I JUST WANTED TO SAY A MASSIVE THANK YOU FOR STOPPING BY, PLACING YOUR ORDER AND SUPPORTING THIS FLAVOUR-PACKED DREAM. EVERY BITE OF FRUIT WE SLICE, EVERY RECIPE WE CREATE AND EVERY SMILE WE SHARE FROM OUR FOOD TRUCK IS MADE WITH LOVE AND A WHOLE LOTTA CULTURE.
                        </p>
                        <p>
                            FRUITY FLAKES WAS BORN TO BRING PEOPLE TOGETHER, BRIGHTEN YOUR DAY, AND SERVE UP MOMENTS WORTH SAVOURING. THANKS FOR CHOOSING US, FOR TRUSTING OUR FLAVOURS, AND FOR BEING PART OF THIS RIDE.
                        </p>
                        <p>
                            WE’LL KEEP THE GOOD VIBES AND BOLD FLAVOURS COMING – PROMISE!
                        </p>
                        <p className="signature">
                            WITH LOVE, VIVI 💛
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Details;