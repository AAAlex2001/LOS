import React from 'react';
import cardStyles from './MarkheulCard.module.scss';

const MarkheulCard: React.FC = () => {
  return (
    <section className={cardStyles.markheulCard}>
      <div className={cardStyles.imageSection}></div>
      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>Мархеул</span>
          <span className={cardStyles.titleMobile}>Мархеул</span>
        </h2>
      </div>
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              В посёлке Мархеул расположился целебный минеральный ключ. Воды в Мархеульском ключе натриево-кальциево-гидрокарбонатные, температурой +18 градусов. На поверхность выходит ключ с глубины 110 метров. Особенность их в том, что они содержат не только минеральные, но и органические вещества. Однако это питьевой источник, поэтому бассейнов здесь нет.
            </p>
            <p className={cardStyles.contentText}>
              <strong>Мархеульский источник лечит заболевания</strong> почек, урологической сферы, обмена веществ, имеет хороший мочегонный эффект.
            </p>
            <p className={cardStyles.contentText}>
              О лечебном эффекте Мархеульского ключа ходят легенды: по утверждениям местных жителей, данная вода выводит камни из почек, но пить её нужно дозированно, курсом в 2–4 недели, иначе может спровоцироваться нежелательно обострение.
            </p>
            <p className={cardStyles.contentText}>
              Находится питьевой фонтан в небольшой белой арке, и набрать воды в нём может любой желающий совершенно бесплатно.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarkheulCard; 