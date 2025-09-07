"use client";

import React from 'react';
import styles from './YourDoctorVetClinics.module.scss';
import config from '@/config';

type VetClinic = {
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

type Props = { vet_clinics: VetClinic[] };

const YourDoctorVetClinics: React.FC<Props> = ({ vet_clinics }) => {
  return (
    <div className={styles.vetWrapper}>
      {/* Заголовок */}
      <section className={styles.titleSection}>
        <h1 className={styles.mainTitle}>Ветеринарные клиники</h1>
      </section>

      {/* Карточки ветеринарных клиник */}
      <section className={styles.cardsSection}>
        {vet_clinics?.map((clinic: VetClinic) => (
          <div key={clinic.id} className={styles.vetCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              {clinic.image_url && (
                <img
                  src={`${API_BASE}/media/${clinic.image_url}`}
                  alt={clinic.name}
                  className={styles.vetImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>

            {/* Информация */}
            <div className={styles.infoContainer}>
              <h2 className={styles.vetName}>
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
                    <span className={styles.infoLabel}>Режим работы:</span>
                    <span className={styles.infoValue}>{clinic.working_hours}</span>
                  </div>
                )}
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Адрес:</span>
                  <span className={`${styles.infoValue} ${clinic.address_link ? styles.addressLink : ''}`}>
                    {clinic.address_link ? (
                      <a href={clinic.address_link} target="_blank" rel="noopener noreferrer">{clinic.address}</a>
                    ) : (
                      clinic.address
                    )}
                  </span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Контакты:</span>
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

export default YourDoctorVetClinics; 