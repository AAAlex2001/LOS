import React from 'react';
import cardStyles from './GagraCard.module.scss';

const GagraCard: React.FC = () => {
  return (
    <section className={cardStyles.gagraCard}>
      <div className={cardStyles.imageSection}></div>
      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>Источники и&nbsp;грязи в&nbsp;Гаграх</span>
          <span className={cardStyles.titleMobile}>Источники и&nbsp;грязи<br/>в&nbsp;Гаграх</span>
        </h2>
      </div>
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              В&nbsp;городе Гагра расположился бальнеологический санаторий, эта&nbsp;здравница была знаменита ещё&nbsp;во&nbsp;времена русских царей&nbsp;— в&nbsp;1903&nbsp;году по&nbsp;приказу Российского Императора в&nbsp;этом месте, на&nbsp;берегу Чёрного моря, построили климатическую станцию&nbsp;— и&nbsp;она&nbsp;стала первым русским курортом на&nbsp;Черноморском побережье.
            </p>
            <p className={cardStyles.contentText}>
              Природных гейзеров в&nbsp;Гагре два: их&nbsp;минеральный состав примерно одинаков (азот, сульфиды, сульфаты, кальций и&nbsp;магний), температура&nbsp;же&nbsp;немного отличается: +42&nbsp;и&nbsp;+44&nbsp;градуса.
            </p>
            <p className={cardStyles.contentText}>
              Сегодня на&nbsp;территории Гагры работают десятки лечебниц, это&nbsp;самый популярный оздоровительный курорт Абхазии. Все&nbsp;здравницы используют термальные минеральные воды сероводородного источника «Гагра».
            </p>
            <p className={cardStyles.contentText}>
              <strong>Данные воды используются для&nbsp;лечения</strong> системы кровообращения, дыхательной системы и&nbsp;ЛОР-органов.
            </p>
            <p className={cardStyles.contentText}>
              Общекурортная лечебница Гагры сегодня расположилась по&nbsp;адресу:<br/>ул.&nbsp;Демерджипа, 49.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GagraCard; 