'use client';

import React from 'react';
import Image from 'next/image';
import styles from './YourDoctorVetClinics.module.scss';

// Данные ветеринарных клиник
const vetClinics = [
  {
    id: 1,
    name: 'Ветеринарная клиника «АлаДу»',
    nameLink: null,
    workingHours: 'с 11:00 до 15:00',
    address: 'г. Сухум, р-н Турбаза, ул. Джелия, 5',
    addressLink: 'https://2gis.ru/abkhazia/geo/70030076604499430',
    contacts: '+7 (940) 951-05-09',
    image: '/assets/YourDoctor_Vet1.jpg'
  },
  {
    id: 2,
    name: 'Ветеринарная клиника «Солёный Пёс»',
    nameLink: null,
    workingHours: 'с 09:00 до 18:00',
    address: 'г. Сухум, Имама Шамиля, 56',
    addressLink: 'https://2gis.ru/abkhazia/geo/70030076604632646',
    contacts: '+7 (940) 722-81-54',
    image: '/assets/YourDoctor_Vet2.jpg'
  },
];

const YourDoctorVetClinics: React.FC = () => {
  return (
    <div className={styles.vetWrapper}>
      {/* Заголовок */}
      <section className={styles.titleSection}>
        <h1 className={styles.mainTitle}>Ветеринарные клиники</h1>
      </section>

      {/* Карточки ветеринарных клиник */}
      <section className={styles.cardsSection}>
        {vetClinics.map((clinic) => (
          <div key={clinic.id} className={styles.vetCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              <Image
                src={clinic.image}
                alt={clinic.name}
                fill
                className={styles.vetImage}
              />
            </div>

            {/* Информация */}
            <div className={styles.infoContainer}>
              <h2 className={styles.vetName}>
                {clinic.nameLink ? (
                  <a href={clinic.nameLink} target="_blank" rel="noopener noreferrer">
                    {clinic.name}
                  </a>
                ) : (
                  clinic.name
                )}
              </h2>
              
              <div className={styles.infoBlock}>
                {clinic.workingHours && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Режим работы:</span>
                    <span className={styles.infoValue}>{clinic.workingHours}</span>
                  </div>
                )}
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Адрес:</span>
                  <span className={`${styles.infoValue} ${clinic.addressLink ? styles.addressLink : ''}`}>
                    {clinic.addressLink ? (
                      <a href={clinic.addressLink} target="_blank" rel="noopener noreferrer">{clinic.address}</a>
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