import React from 'react';
import cardStyles from './BesletkaCard.module.scss';

const BesletkaCard: React.FC = () => {
  return (
    <section className={cardStyles.besletkaCard}>
      <div className={cardStyles.imageSection}></div>
      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>Беслетка</span>
          <span className={cardStyles.titleMobile}>Беслетка</span>
        </h2>
      </div>
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              Недалеко от&nbsp;Сухума, на&nbsp;фонтанирующей речке Беслетка, находятся первые найденные в&nbsp;Абхазии горячие источники. Минеральные скважины, расположенные на&nbsp;реке Беслетка, не&nbsp;подходят для&nbsp;питьевого лечения из-за&nbsp;слишком высокого содержания в&nbsp;воде минералов и&nbsp;солей. Зато они&nbsp;великолепно подходят для&nbsp;бальнеологического лечения&nbsp;— температура источника составляет от&nbsp;29&nbsp;до&nbsp;41&nbsp;градуса.
            </p>
            <p className={cardStyles.contentText}>
              Данный горячий ключ хорошо лечит заболевания костно-мышечной и&nbsp;кровеносной систем человека. Всего на&nbsp;реке Беслетка было обнаружено 6&nbsp;минеральных скважин, вода из&nbsp;которых сейчас поступает в&nbsp;специальные ванны:
            </p>
            <p className={cardStyles.contentText}>
              Скважина №&nbsp;1&nbsp;— горячая, минеральная азото-сульфато-хлоридо-натриевая вода температурой +33&nbsp;градуса.
            </p>
            <p className={cardStyles.contentText}>
              Скважина №&nbsp;2&nbsp;— самая «прохладная», сульфидно-натриево-хлоридная минералка температурой +29&nbsp;градусов;
            </p>
            <p className={cardStyles.contentText}>
              Скважина №&nbsp;4-к – горячая, азото-сульфатно-хлоридо-натриево-кальциевая минералка температурой +35&nbsp;градусов;
            </p>
            <p className={cardStyles.contentText}>
              Скважина №&nbsp;6-к – горячая, сульфидно-хлоридо-натриевая вода температурой +37,5&nbsp;градусов;
            </p>
            <p className={cardStyles.contentText}>
              Скважина №&nbsp;7&nbsp;— горячая, сульфидно-хлоридо-натриевая, температурой +35,5&nbsp;градусов;
            </p>
            <p className={cardStyles.contentText}>
              Скважина №&nbsp;8&nbsp;— самая горячая, азотно-сульфатно-хлоридо-натриево-кальциевая, температурой +41,6&nbsp;градусов.
            </p>
            <p className={cardStyles.contentText}>
              <strong>Горячие ключи Беслетки лечат:</strong>
            </p>
            <p className={cardStyles.contentText}>
              —&nbsp;заболевания ЖКТ;<br/>
              —&nbsp;заболевания опорно-двигательного аппарата;<br/>
              —&nbsp;заболевания нервной системы;<br/>
              —&nbsp;кожные заболевания;<br/>
              —&nbsp;последствия облучений.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BesletkaCard; 