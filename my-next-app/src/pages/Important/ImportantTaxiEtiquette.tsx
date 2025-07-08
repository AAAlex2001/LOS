import React from 'react';
import styles from './ImportantTaxiEtiquette.module.scss';

// Компонент для правил этикета
const EtiquetteRule = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className={styles.etiquetteRule}>
    <div className={styles.ruleNumber}>{number}.</div>
    <div className={styles.ruleContent}>
      <h3 className={styles.ruleTitle}>{title}</h3>
      <p className={styles.ruleDescription}>{description}</p>
    </div>
  </div>
);

const ImportantTaxiEtiquette: React.FC = () => {
  const passengerRules = [
    {
      title: "Приветствие и благодарность — норма",
      description: "Всегда начинайте поездку с приветствия и завершайте поездку словами благодарности. Это создаёт доброжелательную атмосферу с первых минут."
    },
    {
      title: "Очередность и вежливость при посадке",
      description: "Сначала садятся старшие, дети и женщины, затем остальные. При выходе — наоборот: сначала выходят те, кто ближе к двери. Простые вещи — но создают ощущение порядка и уважения."
    },
    {
      title: "Пристёгиваем ремни",
      description: "Безопасность — превыше всего. Пристёгиваться в такси нужно и водителю, и пассажирам, даже на коротких расстояниях."
    },
    {
      title: "Чистота — обоюдная забота",
      description: "Песок, еда, напитки — лучше оставить за пределами салона. Не сорите, не начинайте сидеть, не оставляйте личные вещи в салоне автомобиля."
    },
    {
      title: "Не курить без разрешения",
      description: "Даже если водитель курит, обязательно спросите: «Можно покурить?» В идеале — курение только вне машины."
    },
    {
      title: "Уважайте тишину",
      description: "Не все настроены на беседу. Если не хотите разговаривать — дайте понять мягко. Если хотите — начните с лёгкой фразы."
    },
    {
      title: "Не торопите водителя",
      description: "Дороги в Абхазии — не автобаны. Дайте водителю вести безопасно. Если опаздываете — предупредите в начале пути."
    },
    {
      title: "Чаевые — приятный бонус",
      description: "Необязательно, но если поездка прошла хорошо — округлите сумму или оставьте 50-100 рублей. Это поощряется."
    }
  ];

  const driverRules = [
    {
      title: "Вежливое приветствие — с порога",
      description: "Улыбнитесь, поздоровайтесь. Это настраивает пассажира на доверие и делает поездку спокойнее."
    },
    {
      title: "Чистый салон — ваша визитная карточка",
      description: "Автомобиль должен быть чистым изнутри: без запахов, пыли, мусора и песка на сиденьях. Чистота важна особенно для туристов."
    },
    {
      title: "Помощь при посадке",
      description: "Откройте дверь, при необходимости помогите с багажом. Это покажет уровень сервиса и уважения."
    },
    {
      title: "Не курите в салоне",
      description: "Даже если пассажир не возражает — лучше проявить профессионализм и воздержаться."
    },
    {
      title: "Соблюдайте тишину по умолчанию",
      description: "Не навязывайте разговор. Если пассажир настроен на общение — он сам даст понять. Особенно важно с уставшими туристами."
    },
    {
      title: "Пристёгивайтесь сами и напоминайте пассажирам",
      description: "Безопасность — в приоритете. Дайте понять, что это правило, а не просьба."
    },
    {
      title: "Водите спокойно",
      description: "Без резких манёвров, сигналов и обгонов. Особенно — при женщинах, детях, пожилых и туристах, не привыкших к дорогам Абхазии."
    },
    {
      title: "Будьте терпеливы",
      description: "Если пассажир долго садится, уточняет маршрут или спрашивает дорогу — оставайтесь вежливы. Это часть работы."
    },
    {
      title: "Принимайте оплату корректно",
      description: "Не намекайте на чаевые. Не раздражайтесь, если дают крупную купюру. Лучше заранее уточните: «Есть мелкие купюры?»"
    }
  ];

  return (
    <div className={styles.contentSection}>
      <h2 className={styles.mainTitle}>Такси-этикет</h2>
      
      <div className={styles.fullWidthSection}>
        <div className={styles.backgroundImageSection}>
          <div className={styles.introOverlay}>
            <p className={styles.introText}>
              Этикет для пассажиров: чтобы ваша поездка на такси прошла без недопонимания и оставила 
              только положительные впечатления, рекомендуем соблюдать простые правила.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.rulesContainer}>
        {passengerRules.map((rule, index) => (
          <EtiquetteRule
            key={index}
            number={index + 1}
            title={rule.title}
            description={rule.description}
          />
        ))}
      </div>

      <div className={styles.conclusionSection}>
        <p className={styles.conclusionText}>
          Такси — это тоже часть путешествия. Уважение, вежливость и спокойствие делают его лучше для всех!
        </p>
      </div>

      <div className={styles.fullWidthSection}>
        <div className={styles.backgroundImageSection}>
          <div className={styles.introOverlay}>
            <p className={styles.introText}>
              Этикет водителя такси: как создать комфорт для пассажира и заработать уважение
            </p>
          </div>
        </div>
      </div>

      <div className={styles.driverIntroSection}>
        <p className={styles.driverIntroText}>
          Таксист в Абхазии — это не просто перевозчик, а представитель 
          гостеприимной страны. Вот несколько простых правил, которые 
          сделают вашу работу приятнее, а сервис — качественнее.
        </p>
      </div>

      <div className={styles.rulesContainer}>
        {driverRules.map((rule, index) => (
          <EtiquetteRule
            key={`driver-${index}`}
            number={index + 1}
            title={rule.title}
            description={rule.description}
          />
        ))}
      </div>

      <div className={styles.finalConclusionSection}>
        <p className={styles.finalConclusionText}>
          Уважение к пассажиру — это уважение к себе. Таксист с хорошим 
          сервисом всегда выигрывает в репутации, чаевых и количестве 
          клиентов.
        </p>
      </div>
    </div>
  );
};

export default ImportantTaxiEtiquette; 