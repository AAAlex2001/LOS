"use client";

import React from 'react';
import styles from './YourDoctorPrivateClinics.module.scss';
import config from '@/config';
import { useTranslations } from '@/i18n/TranslationsContext';

type PrivateClinic = {
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

type Props = { private_clinics: PrivateClinic[] };

const YourDoctorPrivateClinics: React.FC<Props> = ({ private_clinics }) => {
  const t = useTranslations();
  
  return (
    <div className={styles.clinicsWrapper}>
      {/* Заголовок */}
      <section className={styles.titleSection}>
        <h1 className={styles.mainTitle}>{t('yourDoctor.privateClinics')}</h1>
      </section>

      {/* Карточки клиник */}
      <section className={styles.cardsSection}>
        {private_clinics?.map((clinic: PrivateClinic) => (
          <div key={clinic.id} className={styles.clinicsCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              {clinic.image_url && (
                <img
                  src={`${API_BASE}/media/${clinic.image_url}`}
                  alt={clinic.name}
                  className={styles.clinicsImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>

            {/* Информация */}
            <div className={styles.infoContainer}>
              <h2 className={styles.clinicsName}>
                {clinic.name_link ? (
                  <a href={clinic.name_link} target="_blank" rel="noopener noreferrer">
                    {clinic.name}
                  </a>
                ) : (
                  clinic.name
                )}
              </h2>
              
              <div className={styles.infoBlock}>
                {clinic.working_hours && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('common.workingHours')}:</span>
                    <span className={styles.infoValue}>{clinic.working_hours}</span>
                  </div>
                )}
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>{t('common.address')}:</span>
                  <span className={`${styles.infoValue} ${clinic.address_link ? styles.addressLink : ''}`}>
                    {clinic.address_link ? (
                      <a href={clinic.address_link} target="_blank" rel="noopener noreferrer">{clinic.address}</a>
                    ) : (
                      clinic.address
                    )}
                  </span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>{t('common.contacts')}:</span>
                  <span className={styles.infoValue}>{clinic.contacts}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default YourDoctorPrivateClinics; 