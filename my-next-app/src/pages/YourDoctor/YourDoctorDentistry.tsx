"use client";

import React from 'react';
import styles from './YourDoctorDentistry.module.scss';
import config from '@/config';

type Dentistry = {
  id: number;
  name: string;
  name_link: string;
  working_hours: string;
  address: string;
  address_link: string;
  contacts: string;
  image_url: string;
  order: number;
};

const API_BASE = config.API_BASE;

type Props = { dentistries: Dentistry[] };

const YourDoctorDentistry: React.FC<Props> = ({ dentistries }) => {
  return (
    <div className={styles.stomacWrapper}>
      {/* Заголовок */}
      <section className={styles.titleSection}>
        <h1 className={styles.mainTitle}>Стоматологические клиники</h1>
      </section>

      {/* Карточки стоматологических клиник */}
      <section className={styles.cardsSection}>
        {dentistries?.map((dentistry: Dentistry) => (
          <div key={dentistry.id} className={styles.stomacCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              {dentistry.image_url && (
                <img
                  src={`${API_BASE}/media/${dentistry.image_url}`}
                  alt={dentistry.name}
                  className={styles.stomacImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>

            {/* Информация */}
            <div className={styles.infoContainer}>
              <h2 className={styles.stomacName}>
                {dentistry.name_link ? (
                  <a href={dentistry.name_link} target="_blank" rel="noopener noreferrer">
                    {dentistry.name}
                  </a>
                ) : (
                  dentistry.name
                )}
              </h2>
              
              <div className={styles.infoBlock}>
                {dentistry.working_hours && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Режим работы:</span>
                    <span className={styles.infoValue}>{dentistry.working_hours}</span>
                  </div>
                )}
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Адрес:</span>
                  <span className={`${styles.infoValue} ${dentistry.address_link ? styles.addressLink : ''}`}>
                    {dentistry.address_link ? (
                      <a href={dentistry.address_link} target="_blank" rel="noopener noreferrer">{dentistry.address}</a>
                    ) : (
                      dentistry.address
                    )}
                  </span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Контакты:</span>
                  <span className={styles.infoValue}>{dentistry.contacts}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default YourDoctorDentistry; 