import React from 'react';
import cardStyles from './MarkheulCard.module.scss';

type Props = {
  title?: string;
  description?: string;
  imageUrl?: string;
  locationLink?: string;
};

const toParagraphsHtml = (text: string) => {
  const normalized = (text || '').replace(/\r\n/g, '\n');
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  const applyBold = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Заменяем все переносы строк на <br> теги
  const escaped = escapeHtml(normalized);
  const withBreaks = escaped.replace(/\n/g, '<br />');
  const withBold = applyBold(withBreaks);
  
  return [withBold]; // Возвращаем как один абзац с <br> тегами
};

const MarkheulCard: React.FC<Props> = ({ title, description, imageUrl, locationLink }) => {
  const paragraphs = toParagraphsHtml(description || '');
  return (
    <section className={cardStyles.markheulCard}>
      <div className={cardStyles.imageSection}>
        {imageUrl ? (
          <img src={imageUrl} alt={title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }} />
        ) : null}
      </div>
      <div className={cardStyles.titleSection}>
        {locationLink ? (
          <h2 className={cardStyles.titleText}>
            <a href={locationLink} target="_blank" rel="noopener noreferrer" className={cardStyles.titleLink}>
              <span className={cardStyles.titleDesktop}>{title || ''}</span>
              <span className={cardStyles.titleMobile}>{title || ''}</span>
            </a>
          </h2>
        ) : (
          <h2 className={cardStyles.titleText}>
            <span className={cardStyles.titleDesktop}>{title || ''}</span>
            <span className={cardStyles.titleMobile}>{title || ''}</span>
          </h2>
        )}
      </div>
      <div className={cardStyles.contentSection}>
        <div className={cardStyles.textContent}>
          <div className={cardStyles.textBlock}>
            {paragraphs.map((html, idx) => (
              <p key={idx} className={cardStyles.contentText} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarkheulCard; 