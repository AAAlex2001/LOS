import React from 'react';
import Link from 'next/link';
import styles from './Popup.module.scss';

const popupItems = [
  { label: 'Города Абхазии', href: '/cities' },
  // { label: 'Аренда жилья', href: '/rent' },
  { label: 'Связь', href: '/mobile-communication' },
  { label: 'Такси', href: '/taxi' },
  { label: 'Банки', href: '/banks' },
];

const Popup: React.FC = () => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupVariaties}>
        {popupItems.map((item, index) => (
          <Link key={index} href={item.href} className={styles.inactive}>
            <span className={styles.popupText}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popup; 