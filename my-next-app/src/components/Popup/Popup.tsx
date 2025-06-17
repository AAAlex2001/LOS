import React from 'react';
import Link from 'next/link';
import styles from './Popup.module.scss';

interface PopupItem {
  label: string;
  href: string;
}

interface PopupProps {
  items: PopupItem[];
}

const Popup: React.FC<PopupProps> = ({ items }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupVariaties}>
        {items.map((item, index) => (
          <Link key={index} href={item.href} className={styles.inactive}>
            <span className={styles.popupText}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popup; 