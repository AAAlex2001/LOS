'use client';

import React from 'react';
import Image from 'next/image';
import styles from './YourDoctorPrivateClinics.module.scss';

// Данные частных клиник
const clinics = [
  {
    id: 1,
    name: 'Центр женского здоровья «Мама»',
    nameLink: null,
    workingHours: 'с 08:00 до 19:00',
    address: 'г. Сухум, ул. Эшба, 142А',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEkYfw9lTkIHQFppfXxwdH5lZw==/',
    contacts: '+7 (940) 725-88-44',
    image: '/assets/PrivateClinics1.jpg'
  },
  {
    id: 2,
    name: '«ЛабКвест»',
    nameLink: null,
    workingHours: 'пн-пт 08:00–19:00, сб 08:00–17:00, вс 09:00–17:00',
    address: 'г. Сухум ул. Воронова, 8',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEgYdgZmQEEGQFpofXV4d3VlbA==/',
    contacts: '+7 (940) 755-03-03',
    image: '/assets/PrivateClinics2.jpg'
  },
  {
    id: 3,
    name: '«ЛабКвест»',
    nameLink: null,
    workingHours: 'пн-сб 8:00–17:00',
    address: 'г. Сухум, ул. Агрба, д. 9',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEkYfwBgTEEEQFppfXxxeHRlYA==/',
    contacts: '+7 (840) 226-47-15 / +7 (840) 226-45-43',
    image: '/assets/PrivateClinics3.jpg'
  },
  {
    id: 4,
    name: 'Клинико-диагностический центр',
    nameLink: null,
    workingHours: 'с 08:00 до 22:00',
    address: 'г. Сухум, ул. Эшба, 189',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEkYfwBgTEEEQFppfXxxeHRlYA==/',
    contacts: '+7 (940) 760-46-04',
    image: '/assets/PrivateClinics4.jpg'
  },
  {
    id: 5,
    name: 'Медицинский центр «Илифиа»',
    nameLink: null,
    workingHours: 'с 08:30 до 18:00',
    address: 'г. Сухум, ул. Воронова, 59',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEkYfwBgTEEEQFppfXxxeHRlYA==/',
    contacts: '+7 (940) 710-11-55',
    image: '/assets/PrivateClinics5.jpg'
  },
];

const YourDoctorPrivateClinics: React.FC = () => {
  return (
    <div className={styles.clinicsWrapper}>
      {/* Заголовок */}
      <section className={styles.titleSection}>
        <h1 className={styles.mainTitle}>Частные клиники</h1>
      </section>

      {/* Карточки клиник */}
      <section className={styles.cardsSection}>
        {clinics.map((clinic) => (
          <div key={clinic.id} className={styles.clinicsCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              <Image
                src={clinic.image}
                alt={clinic.name}
                fill
                className={styles.clinicsImage}
              />
            </div>

            {/* Информация */}
            <div className={styles.infoContainer}>
              <h2 className={styles.clinicsName}>
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

export default YourDoctorPrivateClinics; 