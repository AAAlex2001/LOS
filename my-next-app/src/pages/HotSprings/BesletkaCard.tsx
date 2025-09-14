import React from 'react';
import cardStyles from './BesletkaCard.module.scss';

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

const BesletkaCard: React.FC<Props> = ({ title, description, imageUrl }) => {
  const paragraphs = (description || '').split('\n\n').filter(Boolean);
  return (
    <section className={cardStyles.besletkaCard}>
      <div className={cardStyles.imageSection}>
        {imageUrl ? (
          <img src={imageUrl} alt={title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
      </div>
      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>{title || ''}</span>
          <span className={cardStyles.titleMobile}>{title || ''}</span>
        </h2>
      </div>
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            {paragraphs.map((p, idx) => (
              <p key={idx} className={cardStyles.contentText}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BesletkaCard; 