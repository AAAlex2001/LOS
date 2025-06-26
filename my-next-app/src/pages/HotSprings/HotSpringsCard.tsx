import React from 'react';
import cardStyles from './HotSpringsCard.module.scss';

const HotSpringsCard: React.FC = () => {
  return (
    <section className={cardStyles.hotSpringsCard}>
      {/* Hot Springs Image */}
      <div className={cardStyles.imageSection}></div>

      {/* Title Section */}
      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>Термальные источники в селе Кындыг</span>
          <span className={cardStyles.titleMobile}>Термальные источники<br/>в селе Кындыг</span>
        </h2>
      </div>

      {/* Content Section */}
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              В селе Кындыг находится самый известный термальный ключ Абхазии — горячий гейзер с одноимённым названием. Местные жители выстроили на гейзере термальный комплекс «Кындыгский источник» под открытым небом, и теперь круглогодично сюда приезжают тысячи туристов.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              <strong>Оздоровительная инфраструктура курорта Кындыг:</strong>
            </p>
            
            <p className={cardStyles.contentText}>
              — бассейны разной температуры;<br/>
              — горячие души;<br/>
              — грязевые ванны.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              Комплекс бассейнов представляет собой несколько купелей, вода перетекает из одной в другую, постепенно остывая. То есть, в самом прохладном бассейне вода получается уже «бывшая в употреблении» посетителями горячих бассейнов.
            </p>
            
            <p className={cardStyles.contentText}>
              Горячие души представляют собой нехитрое приспособление: горячая минеральная вода стекает по жёлобу на посетителя курорта, сидящего или лежащего на лавочке, которую специально установили прямо под струёй. Также имеются «стоячие» души.
            </p>
            
            <p className={cardStyles.contentText}>
              Рядом с минеральными душами находится озеро с лечебной грязью. После обмазывания грязями на теле остаётся ощутимый запах сероводорода. Также на территории курорта Кындыг имеется небольшая эвкалиптовая роща с лавочками.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              <strong>Горячие минеральные воды Кындыга прописаны людям с заболеваниями:</strong>
            </p>
            
            <p className={cardStyles.contentText}>
              — костно-мышечной системы;<br/>
              — сердечно-сосудистой системы;<br/>
              — гинекологическими и урологическими;<br/>
              — ЖКТ;<br/>
              — нервной системы;<br/>
              — дерматологическими;<br/>
              — последствиями радиоактивного облучения (в том числе и облучения в качестве лечения онкологии).
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              Принятие минеральных ванн не должно превышать по времени 30 минут за сеанс или 45 минут за несколько сеансов в день. Оптимальный курс грязевых и водных процедур в Кындыге — 10 сеансов. Эффекта от них должно хватить на год.
            </p>
            
            <p className={cardStyles.contentText}>
              На территории курорта Кындыг имеется небольшое кафе «Ласточка», где посетители могут перекусить и выпить чай. Имейте в виду, что, как и на пляже, идти в кафе разрешено только в одетом виде. Также есть небольшая палатка по продаже мёда, пирожковая палатка и маленький магазинчик.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              <strong>Стоимость входа на термальные источники Кындыг:</strong> Взрослые: 300 рублей. Дети: 200 рублей.
            </p>
            
            <p className={cardStyles.contentText}>
              Камера хранения: 50 рублей в день.<br/>
              Парковка перед комплексом: 50 рублей. Туалет: 10 рублей. Для детей есть прокат надувных кругов и надувные горки — от 200 рублей на 10 минут.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              <strong>Режим работы:</strong> «Кындыг-1» работает ежедневно с 7:00 до 20:00, без перерывов и выходных. «Кындыг-2» открыт с 7:00 до 22:00.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotSpringsCard;