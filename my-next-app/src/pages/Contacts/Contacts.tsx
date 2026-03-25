"use client";

import React from 'react';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Contacts.module.scss';
import { useTranslations } from '@/i18n/LocaleContext';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
});

const Contacts: React.FC = () => {
  const t = useTranslations('contactsPage');

  const items = [
    {
      role: t('emailRole'),
      value: 'landofsoulweb@yandex.com',
      href: 'mailto:landofsoulweb@yandex.com',
      kind: 'email' as const,
    },
    {
      role: t('telegramRole'),
      value: '@Sasha_200121',
      href: 'https://t.me/Sasha_200121',
      kind: 'person' as const,
    },
  ];

  return (
    <>
      <Header />
      <main className={`${styles.main} ${montserrat.className}`}>
        <section className={styles.heroCard}>
          <div className={styles.backdrop} />

          <div className={styles.heroContent}>
            <div className={styles.infoPane}>
              <span className={styles.badge}>{t('eyebrow')}</span>
              <h1 className={styles.title}>{t('title')}</h1>
              <p className={styles.description}>{t('description')}</p>
            </div>

            <div className={styles.contactPane}>
              <div className={styles.contactPaneHeader}>
                <h2 className={styles.contactPaneTitle}>{t('panelTitle')}</h2>
                <p className={styles.contactPaneText}>{t('panelText')}</p>
              </div>

              <div className={styles.contactList}>
                {items.map((item) => (
                  <a
                    key={item.value}
                    href={item.href}
                    className={styles.contactItem}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className={styles.iconBadge} aria-hidden>
                      {item.kind === 'email' ? (
                        <svg viewBox="0 0 24 24" className={styles.mailIcon}>
                          <path d="M4 6.5H20C20.8284 6.5 21.5 7.17157 21.5 8V16C21.5 16.8284 20.8284 17.5 20 17.5H4C3.17157 17.5 2.5 16.8284 2.5 16V8C2.5 7.17157 3.17157 6.5 4 6.5Z" fill="none" stroke="currentColor" strokeWidth="1.7"/>
                          <path d="M3.5 8L10.9635 13.3304C11.5794 13.7703 12.4206 13.7703 13.0365 13.3304L20.5 8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <Image src="/assets/telegram.svg" alt="Telegram" width={20} height={20} />
                      )}
                    </span>

                    <span className={styles.contactMeta}>
                      <span className={styles.contactRole}>{item.role}</span>
                      <span className={styles.contactValue}>{item.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contacts;