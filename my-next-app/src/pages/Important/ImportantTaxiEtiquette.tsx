import React from 'react';
import styles from './ImportantTaxiEtiquette.module.scss';
import config from '@/config';
import { useTranslations } from '@/i18n/TranslationsContext';

type ImportantRule = {
  id: number;
  rule_type?: string;
  title: string;
  description: string;
  order: number;
};

type ImportantImage = {
  id: number;
  image_url: string;
  alt_text: string;
  order: number;
};

type ImportantSection = {
  id: number;
  section_type: string;
  title: string;
  subtitle: string;
  content: string;
  image_url: string;
  order: number;
  rules: ImportantRule[];
  images: ImportantImage[];
  passenger_intro_text: string;
  passenger_background_url: string;
  passenger_conclusion_text: string;
  driver_intro_text: string;
  driver_background_url: string;
  driver_description_text: string;
  driver_conclusion_text: string;
};

type Props = {
  section: ImportantSection;
};

const API_BASE = config.API_BASE;

const formatText = (text: string) => {
  if (!text) return '';
  
  // Простая замена всех переносов на <br />
  let formatted = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n/g, '<br />');
  
  // Заменяем **текст** на <strong>текст</strong>
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  return formatted;
};

// Компонент для правил этикета
const EtiquetteRule = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className={styles.etiquetteRule}>
    <div className={styles.ruleNumber}>{number}.</div>
    <div className={styles.ruleContent}>
      <h3 className={styles.ruleTitle}>{title}</h3>
      <p className={styles.ruleDescription} dangerouslySetInnerHTML={{ __html: formatText(description) }} />
    </div>
  </div>
);

const ImportantTaxiEtiquette: React.FC<Props> = ({ section }) => {
  const t = useTranslations();
  
  // Проверяем существование section
  if (!section) {
    return <div>{t('common.loading')}</div>;
  }

  // Группируем правила по типам
  const passengerRules = (section.rules || []).filter(rule => rule.rule_type === 'passenger').sort((a, b) => a.order - b.order);
  const driverRules = (section.rules || []).filter(rule => rule.rule_type === 'driver').sort((a, b) => a.order - b.order);

  return (
    <div className={styles.contentSection}>
      <h2 className={styles.mainTitle}>{section.title}</h2>
      
      {/* Отображаем контент секции */}
      {section.content && (
        <div dangerouslySetInnerHTML={{ __html: formatText(section.content) }} />
      )}
      
      <div className={styles.fullWidthSection}>
        <div 
          className={styles.backgroundImageSection}
          style={{
            backgroundImage: section.passenger_background_url 
              ? `url(${API_BASE}/media/${section.passenger_background_url})`
              : "url('/assets/IMG_1932.jpg')"
          }}
        >
          <div className={styles.introOverlay}>
            <p className={styles.introText}>
              {section.passenger_intro_text || t('taxiEtiquette.passengerIntro')}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.rulesContainer}>
        {passengerRules.map((rule, index) => (
          <EtiquetteRule
            key={rule.id}
            number={index + 1}
            title={rule.title}
            description={rule.description}
          />
        ))}
      </div>

      <div className={styles.conclusionSection}>
        <p className={styles.conclusionText}>
          {section.passenger_conclusion_text || t('taxiEtiquette.passengerConclusion')}
        </p>
      </div>

      <div className={styles.fullWidthSection}>
        <div 
          className={styles.backgroundImageSection}
          style={{
            backgroundImage: section.driver_background_url 
              ? `url(${API_BASE}/media/${section.driver_background_url})`
              : "url('/assets/IMG_1932.jpg')"
          }}
        >
          <div className={styles.introOverlay}>
            <p className={styles.introText}>
              {section.driver_intro_text || t('taxiEtiquette.driverIntro')}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.driverIntroSection}>
        <p className={styles.driverIntroText}>
          {section.driver_description_text || t('taxiEtiquette.driverDescription')}
        </p>
      </div>

      <div className={styles.rulesContainer}>
        {driverRules.map((rule, index) => (
          <EtiquetteRule
            key={rule.id}
            number={index + 1}
            title={rule.title}
            description={rule.description}
          />
        ))}
      </div>

      <div className={styles.finalConclusionSection}>
        <p className={styles.finalConclusionText}>
          {section.driver_conclusion_text || t('taxiEtiquette.driverConclusion')}
        </p>
      </div>
    </div>
  );
};

export default ImportantTaxiEtiquette; 