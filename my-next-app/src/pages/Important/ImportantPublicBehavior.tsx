import React from 'react';
import styles from './ImportantPublicBehavior.module.scss';
import config from '@/config';

type ImportantRule = {
  id: number;
  rule_type?: string;
  title: string;
  description: string;
  order: number;
};

type ImportantImage = {
  id: number;
  title?: string;
  description?: string;
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
const TextBlock = ({ title, children }: { title: string; children: string }) => (
  <section className={styles.textSection}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    <div>{children}</div>
  </section>
);

// Компонент для изображений с подписью
const ImageBlock = ({ src, alt, title, description }: { src: string; alt: string; title?: string; description?: string }) => (
  <div className={styles.imageContainer}>
    <img src={src} alt={alt} className={styles.image} style={{ width: '100%', height: 'auto' }} />
    {(title || description) && (
      <div className={styles.imageCaption}>
        {title && <h3 className={styles.sectionTitle}>{title}</h3>}
        {description && <p dangerouslySetInnerHTML={{ __html: formatText(description) }} />}
      </div>
    )}
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
    <div className={styles.contentSection} id="public-behavior-text">
      <h2 className={styles.mainTitle}>{section.title}</h2>
      
      {/* Отображаем картинку секции */}
      {section.image_url && (
        <div className={styles.imageContainer}>
          <img 
            src={section.image_url.startsWith('http') ? section.image_url : `${API_BASE}/media/${section.image_url}`} 
            alt={section.title} 
            className={styles.image} 
            style={{ width: '100%', height: 'auto' }} 
          />
        </div>
      )}
      
      {/* Отображаем правила как отдельные секции */}
      {Object.entries(rulesByType).map(([ruleType, rules]) => (
        <div key={ruleType}>
          {rules.map((rule) => (
            <TextBlock key={rule.id} title={rule.title}>
              <div dangerouslySetInnerHTML={{ __html: formatText(rule.description) }} />
            </TextBlock>
          ))}
        </div>
      ))}
      
      {/* Отображаем дополнительные изображения */}
      {section.images.map((image) => (
        <ImageBlock
          key={image.id}
          src={image.image_url.startsWith('http') ? image.image_url : `${API_BASE}/media/${image.image_url}`}
          alt={image.alt_text}
          title={image.title}
          description={image.description}
        />
      ))}
    </div>
  );
};

export default ImportantPublicBehavior; 