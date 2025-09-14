import React from 'react';
import styles from './ImportantPublicBehavior.module.scss';
import config from '@/config';

type ImportantRule = {
  id: number;
  rule_type: string;
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
  content: string;
  order: number;
  rules: ImportantRule[];
  images: ImportantImage[];
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

// Компонент для текстовых блоков
const TextBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className={styles.textSection}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    <p>{children}</p>
  </section>
);

// Компонент для изображений
const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
  <div className={styles.imageContainer}>
    <img src={src} alt={alt} className={styles.image} style={{ width: '100%', height: 'auto' }} />
  </div>
);

const ImportantPublicBehavior: React.FC<Props> = ({ section }) => {
  // Группируем правила по типам
  const rulesByType = section.rules.reduce((acc, rule) => {
    if (!acc[rule.rule_type]) {
      acc[rule.rule_type] = [];
    }
    acc[rule.rule_type].push(rule);
    return acc;
  }, {} as Record<string, ImportantRule[]>);

  return (
    <div className={styles.contentSection}>
      <h2 className={styles.mainTitle}>{section.title}</h2>
      
      {/* Отображаем изображения */}
      {section.images.map((image) => (
        <ImageBlock 
          key={image.id} 
          src={image.image_url.startsWith('http') ? image.image_url : `${API_BASE}${image.image_url}`} 
          alt={image.alt_text} 
        />
      ))}
      
      <div id="public-behavior-text">
        {/* Отображаем контент секции */}
        {section.content && (
          <div dangerouslySetInnerHTML={{ __html: formatText(section.content) }} />
        )}
        
        {/* Отображаем правила */}
        {Object.entries(rulesByType).map(([ruleType, rules]) => (
          <div key={ruleType}>
            {rules.map((rule) => (
              <TextBlock key={rule.id} title={rule.title}>
                <div dangerouslySetInnerHTML={{ __html: formatText(rule.description) }} />
              </TextBlock>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportantPublicBehavior; 