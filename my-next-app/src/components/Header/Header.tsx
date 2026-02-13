'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from '@/i18n/LocaleContext';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const t = useTranslations('header');
  const { locale } = useLocale();

  useEffect(() => {
    const applyPlaceholder = () => {
      const sections = Array.from(document.querySelectorAll('[class*="cardsSection"]'));
      sections.forEach((el) => {
        const hasItems = el.querySelectorAll('[class*="buildingCard"]').length > 0 || Array.from(el.children).some(c => c.textContent && c.textContent.trim().length > 0 && !c.className.includes('noInfoPlaceholder'));
        const existing = el.querySelector('.noInfoPlaceholder');
        if (!hasItems) {
          if (!existing) {
            const div = document.createElement('div');
            div.className = 'noInfoPlaceholder';
            div.style.color = '#999';
            div.style.fontSize = 'clamp(24px, 6vw, 64px)';
            div.style.textAlign = 'center';
            div.style.padding = 'clamp(60px, 15vw, 200px) 20px';
            div.style.lineHeight = '1.2';
            try {
              // @ts-ignore
              const txt = (window as any).__NEXT_LOCALE === 'en' ? 'No information available yet' : undefined;
              div.textContent = txt || (document.documentElement.lang === 'en' ? 'No information available yet' : 'Пока нет информации');
            } catch (e) {
              div.textContent = 'Пока нет информации';
            }
            el.appendChild(div);
          }
        } else if (existing) {
          existing.remove();
        }
      });
    };

    applyPlaceholder();
    const mo = new MutationObserver(() => applyPlaceholder());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [locale]);
  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.mobileMenuOverlay} ${menuOpen ? styles.active : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}>
        <nav className={styles.mobileNavList}>
          <Link href="#" className={`${styles.mobileNavButton} ${styles.blueOutline}`} onClick={closeMenu}>
            {t('classifieds')}
            <span className={styles.soonBadge}>{t('soon')}</span>
          </Link>
        </nav>

        <div className={styles.figureWrapper}>
          <Image
            src="/assets/Guy11.png"
            alt="Decorative character"
            width={100}
            height={100}
            className={styles.figureImage}
          />
        </div>

        <div className={styles.mobileLanguageSelect}>
          <LanguageSwitcher />
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Left block: Logo */}
          <Link href={`/${locale}`} className={styles.logoSection} onClick={closeMenu}>
          <Image
            src="/assets/IMG_1557.png"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logoImage}
          />
          <h1 className={styles.logoText}>Land of Soul</h1>
        </Link>

        {/* Center navigation buttons */}
        <nav className={styles.nav}>
          <Link href="#" className={`${styles.navButton} ${styles.blueOutline}`}>
            {t('classifieds')}
            <span className={styles.soonBadge}>{t('soon')}</span>
          </Link>
        </nav>

        {/* Decorative image (Guy) */}
        <div className={styles.figureWrapper}>
          <Image
            src="/assets/Guy11.png"
            alt="Decorative character"
            width={137}
            height={137}
            className={styles.figureImage}
          />
        </div>

        {/* Right block: language select */}
        <div className={styles.languageSelect}>
          <LanguageSwitcher />
        </div>

        </div>
      </header>

      {/* Burger button - fixed position */}
      <button className={`${styles.burgerButton} ${menuOpen ? styles.active : ''}`} onClick={toggleMenu} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </>
  );
};

export default Header;
