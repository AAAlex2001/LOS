import React from 'react';
import cardStyles from './BabusharaCard.module.scss';

const BabusharaCard: React.FC = () => {
  return (
    <section className={cardStyles.babusharaCard}>
      {/* Image */}
      <div className={cardStyles.imageSection}></div>

      {/* Title */}
      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>Бабушара</span>
          <span className={cardStyles.titleMobile}>Бабушара</span>
        </h2>
      </div>

      {/* Content */}
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              В селе Бабушара находится единственный аэропорт Абхазии — но он не функционирует для пассажирских перевозок. Второй достопримечательностью посёлка является «дикий» горячий сероводородный ключ — большой бассейн под открытым небом и настоящий гейзер. На данный момент вход свободный. Вода в бассейнах +25°C до +45° круглый год.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BabusharaCard; 