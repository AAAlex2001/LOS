import React from 'react';
import cardStyles from './KyndykCard.module.scss';

type Props = {
  title?: string;
  description?: string; // supports **bold** and \n\n paragraph breaks
  imageUrl?: string;
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

  return normalized
    .split(/\n{2,}/)
    .map((raw) => {
      const hasBullets = /(^|\n)\s*[—\-•]\s+/.test(raw);
      const escaped = escapeHtml(raw.trim());
      const withBreaks = escaped.replace(/\n+/g, hasBullets ? '<br />' : ' ');
      return applyBold(withBreaks).trim();
    })
    .filter(Boolean);
};

const KyndykCard: React.FC<Props> = ({ title, description, imageUrl }) => {
  const paragraphs = toParagraphsHtml(description || '');
  return (
    <section className={cardStyles.kyndykCard}>
      <div className={cardStyles.imageSection}>
        {imageUrl ? (
          <img src={imageUrl} alt={title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
      </div>

      <div className={cardStyles.titleSection}>
        <h2 className={cardStyles.titleText}>
          <span className={cardStyles.titleDesktop}>{title || ''}</span>
          <span className={cardStyles.titleMobile}>{title || ''}</span>
        </h2>
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

export default KyndykCard; 