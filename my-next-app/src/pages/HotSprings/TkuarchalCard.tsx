import React from 'react';
import cardStyles from './TkuarchalCard.module.scss';

const TkuarchalCard: React.FC = () => {
  return (
    <section className={cardStyles.tkuarchalCard}>
      <div className={cardStyles.imageSection}></div>
      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>Источники&nbsp;Ткуарчал</span>
          <span className={cardStyles.titleMobile}>Источники&nbsp;Ткуарчал</span>
        </h2>
      </div>
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              В&nbsp;80&nbsp;км&nbsp;от&nbsp;Сухума находится единственный курорт в&nbsp;Абхазии, расположенный не&nbsp;на&nbsp;Черноморском побережье, а&nbsp;в&nbsp;горах. Речь о&nbsp;городке Ткуарчал, раскинувшемся в&nbsp;долине реки Аалдзга. Это&nbsp;уникальное место: городок полностью окружён горами и&nbsp;имеет единственную выездную дорогу.
            </p>
            <p className={cardStyles.contentText}>
              В&nbsp;окрестностях Ткуарчала (5&nbsp;км&nbsp;от&nbsp;города), над&nbsp;обрывом речки Аалдзга, находится радоновый горячий ключ (который иногда называют Акармарским источником, по&nbsp;близко находящемуся к&nbsp;нему посёлку Акармар).
            </p>
            <p className={cardStyles.contentText}>
              <strong>Целебные свойства данного ключа</strong> используют для&nbsp;лечения нервной системы и&nbsp;опорно-двигательного аппарата.
            </p>
            <p className={cardStyles.contentText}>
              Для&nbsp;туристов здесь оборудована лечебница с&nbsp;радоновыми ваннами (санаторий Радон Ткуарчал). Кстати, на&nbsp;месте нынешних радоновых ванн Ткуарчала, в&nbsp;19&nbsp;веке находился загородный дом&nbsp;абхазского правителя князя Чачба, который очень любил принимать радоновые бочки вместо ванн.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TkuarchalCard; 