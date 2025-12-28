"use client";

import React from 'react';
import styles from './YourDoctorHospitals.module.scss';
import config from '@/config';
import { useTranslations } from '@/i18n/TranslationsContext';

type Hospital = {
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

type Props = { hospitals: Hospital[] };

const YourDoctorHospitals: React.FC<Props> = ({ hospitals }) => {
  const t = useTranslations();
  
  return (
    <div className={styles.hospitalsWrapper}>
      {/* Заголовок */}
      <section className={styles.titleSection}>
        <h1 className={styles.mainTitle}>{t('yourDoctor.hospitals')}</h1>
      </section>

      {/* Карточки больниц */}
      <section className={styles.cardsSection}>
        {hospitals?.map((hospital: Hospital) => (
          <div key={hospital.id} className={styles.hospitalCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              {hospital.image_url && (
                <img
                  src={`${API_BASE}/media/${hospital.image_url}`}
                  alt={hospital.name}
                  className={styles.hospitalImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>

            {/* Информация */}
            <div className={styles.infoContainer}>
              <h2 className={styles.hospitalName}>
                {hospital.name_link ? (
                  <a href={hospital.name_link} target="_blank" rel="noopener noreferrer">
                    {hospital.name}
                  </a>
                ) : (
                  hospital.name
                )}
              </h2>
              
              <div className={styles.infoBlock}>
                {hospital.working_hours && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('common.workingHours')}:</span>
                    <span className={styles.infoValue}>{hospital.working_hours}</span>
                  </div>
                )}
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>{t('common.address')}:</span>
                  <span className={`${styles.infoValue} ${hospital.address_link ? styles.addressLink : ''}`}>
                    {hospital.address_link ? (
                      <a href={hospital.address_link} target="_blank" rel="noopener noreferrer">{hospital.address}</a>
                    ) : (
                      hospital.address
                    )}
                  </span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>{t('common.contacts')}:</span>
                  <span className={styles.infoValue}>{hospital.contacts}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default YourDoctorHospitals; 