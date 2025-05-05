import React, { useMemo } from 'react';
import './details.css';
import food from '../../assets/icons/food.png';
import delivery from '../../assets/icons/delivery.png';
import packing from '../../assets/icons/packing.png';
import e1 from '../../assets/pics/dueña.png';
import { translations } from '../../components/navbar/language/translations';

const Details = ({ selectedLanguage = 'en' }) => {
    // Memoize translations to prevent recalculating on every render
    const t = useMemo(() => translations[selectedLanguage] || translations['en'], [selectedLanguage]);

    // Memoize feature items to optimize rendering
    const features = useMemo(() => [
        {
            icon: food,
            alt: t.featureFoodAlt,
            title: t.featureFoodTitle,
            description: t.featureFoodDescription
        },
        {
            icon: packing,
            alt: t.featurePackingAlt,
            title: t.featurePackingTitle,
            description: t.featurePackingDescription
        },
        {
            icon: delivery,
            alt: t.featureDeliveryAlt,
            title: t.featureDeliveryTitle,
            description: t.featureDeliveryDescription
        }
    ], [t]);

    return (
        <div className="details-page">
            {/* Section 1: Why Choose Fruity Flakes */}
            <section className="why-choose-section">
                <h1>{t.whyChooseTitle}</h1>
                <p className="intro-text">
                    {t.whyChooseIntro}
                </p>
                <p className="highlight-text">
                    {t.whyChooseHighlight}
                </p>
                <div className="features-container">
                    {features.map((feature, index) => (
                        <div className="feature" key={index}>
                            <img
                                src={feature.icon}
                                alt={feature.alt}
                                className="feature-icon"
                                loading="lazy" // Optimización de carga
                            />
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 2: Founder's Message */}
            <section className="founder-section">
                <div className="founder-content">
                    <div className="founder-image">
                        <img 
                            src={e1} 
                            alt={t.founderAlt} 
                            className="founder-photo"
                            loading="lazy" // Optimización de carga
                        />
                    </div>
                    <div className="founder-message">
                        <h2>{t.founderTitle}</h2>
                        {[t.founderParagraph1, t.founderParagraph2, t.founderParagraph3].map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                        <p className="signature">
                            {t.founderSignature}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default React.memo(Details);