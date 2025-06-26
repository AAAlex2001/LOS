import React from 'react';
import cardStyles from './TskuaraCard.module.scss';

const TskuaraCard: React.FC = () => {
  return (
    <section className={cardStyles.tskuaraCard}>
      {/* Tskuara Image */}
      <div className={cardStyles.imageSection}></div>

      {/* Title Section */}
      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>Цкуара — источники в Приморском (Гудаута, Новый Афон)</span>
          <span className={cardStyles.titleMobile}>Цкуара — источники<br/>в Приморском</span>
        </h2>
      </div>

      {/* Content Section */}
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              В Гудаутском районе Абхазии, селе Приморское (Санапиро, Цкуара), также имеются собственные сероводородные источники. Село Приморское, с бальнеологической лечебницей под названием «Оздоровительный комплекс Цкуара» и эвкалиптовой рощей, находится примерно посередине между абхазским городом Новый Афон и Гудаутой.
            </p>
            
            <p className={cardStyles.contentText}>
              Ещё в 19 веке в Приморском было пробурено несколько минеральных скважин, и на месте одной из них и была построена водолечебница под открытым небом, действующая и по сей день. Уникальность её в том, что, купаясь в горячих ваннах, посетители могут одновременно наслаждаться великолепными видами: горной речкой, водопадом и эвкалиптовой рощей.
            </p>
            
            <p className={cardStyles.contentText}>
              Термы села Приморское (Цкуара) называют также Гудаутскими и Новоафонскими (из-за близости к ним знаменитых абхазских городов Гудаута и Новый Афон), но по факту эти источники находятся между двумя этими городами — в Приморском.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              Состав воды в этом месторождении богат сульфатами, магнием, кальцием и азотом - 1 литр минеральной воды Приморского источника содержит до 1,9 мг сероводорода, общий уровень минерализации составляет 6 грамм на литр. Температура воды в месте выхода на поверхность составляет +47 градусов.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              <strong>Оздоровительный бальнеологический комплекс в Приморском состоит из:</strong>
            </p>
            
            <p className={cardStyles.contentText}>
              — 3 бассейнов (один из которых рассчитан на 10–15 человек, а два других — на 6 человек);<br/>
              — горячих сероводородных душей;<br/>
              — массажного отделения;<br/>
              — грязевого отделения;<br/>
              — кафе.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              <strong>Горячий ключ в Приморском помогает справиться с заболеваниями:</strong>
            </p>
            
            <p className={cardStyles.contentText}>
              — органов пищеварения и ЖКТ;<br/>
              — сердечно-сосудистой системы;<br/>
              — костно-мышечной системы;<br/>
              — дерматологии;<br/>
              — гинекологическими и урологическими;<br/>
              — ЦНС;<br/>
              — последствиями облучений и лучевой болезнью.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              Посетители отмечают положительный эффект лечебных грязей в борьбе с панкреатитом, ревматизмом, кожными болезнями, грибковыми заболеваниями, нервными расстройствами и бесплодием. Также воды оказывают общеукрепляющее и омолаживающее воздействие на весь организм, делает кожу гладкой и шелковистой.
            </p>
            
            <p className={cardStyles.contentText}>
              Противопоказаниями к принятию горячих ванн являются онкологические заболевания, болезни крови, туберкулёз.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              Конечно положительный эффект в виде улучшения самочувствия и сна, поднятия настроения, можно заметить сразу после одного посещения ванн. Но для видимых результатов и избавления от заболеваний, рекомендуется пройти сразу курс процедур, состоящий из 10–15 сеансов. Конечно, для этого нужно будет пожить на курорте 10–15 дней.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              <strong>Цены на посещение оздоровительного комплекса с горячими источниками Цкуара:</strong>
            </p>
            
            <p className={cardStyles.contentText}>
              Взрослые — 300 рублей. Дети до 6 лет — бесплатно. Дети (6-12 лет) — 150 рублей. Пользование шкафчиком для хранения вещей — 20 рублей. Парковка — 50 рублей. Массаж от 400 рублей за 15 минут до 2000 за 1 час.
            </p>
          </div>
          
          <div className={cardStyles.textBlock}>
            <p className={cardStyles.contentText}>
              <strong>График работы:</strong> ежедневно с 09:00 до 19:00.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TskuaraCard; 