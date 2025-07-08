'use client';

import React from 'react';
import Image from 'next/image';
import styles from './YourDoctorDentistry.module.scss';

// Данные стоматологических клиник
const dentistries = [
  {
    id: 1,
    name: 'Стоматология «Mary Dent»',
    nameLink: null,
    workingHours: 'пн-вс 09:00-20:00',
    address: 'г. Сухум, ул. Агрба, 6',
    addressLink: 'https://2gis.ru/abkhazia/firm/70000001091323585',
    contacts: '+7 (940) 740-70-00',
    image: '/assets/YourDoctor_Stomac1.jpg'
  },
  {
    id: 2,
    name: 'Стоматология «Dentium»',
    nameLink: null,
    workingHours: 'пн-пт 09:00-16:30, сб-вс выходные',
    address: 'г. Сухум, ул. Ардзинба, 69',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEgYdgVgSkQHQFppfXxxc3xiZg==/',
    contacts: '+7 (940) 778-87-08',
    image: '/assets/YourDoctor_Stomac2.jpg'
  },
  {
    id: 3,
    name: 'Стоматология «Corona Dental Clinic»',
    nameLink: null,
    workingHours: 'пн-сб 09:00-19:30, вс — выходной',
    address: 'г. Гагра, ул. Лакоба, 9А',
    addressLink: 'https://yandex.ru/maps/10280/gagra/house/YEkYdABnSUMFQFppfX53c35nYw==/',
    contacts: '+7 (940) 903-03-33',
    image: '/assets/YourDoctor_Stomac3.jpg'
  },
  {
    id: 4,
    name: 'Стоматология «Akua Dent»',
    nameLink: null,
    workingHours: 'пн-пт 09:00-18:00, сб-вс выходные',
    address: 'г. Сухум, ул. Ардзинба, 95',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEgYdgZmS0wDQFppfXxxcH9mbQ==/',
    contacts: '+7 (940) 955-25-55',
    image: '/assets/YourDoctor_Stomac4.jpg'
  },
  {
    id: 5,
    name: 'Стоматология «Гигия»',
    nameLink: null,
    workingHours: 'пн-сб 10:00-18:00, вс — выходной',
    address: 'г. Сухум, ул. Имама Шамиля, 82',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEgYdgdlTUEEQFppfXxxc3VlZg==/',
    contacts: '+7 (940) 727-13-13',
    image: '/assets/YourDoctor_Stomac5.jpg'
  },
  {
    id: 6,
    name: 'Стоматология «Rideamus»',
    nameLink: null,
    workingHours: 'с 08:30 до 19:30',
    address: 'г. Сухум, ул. Когония, 41',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEgYdgZnTEYDQFpofXV4dn9lYA==/',
    contacts: '+7 (940) 705-50-00',
    image: '/assets/YourDoctor_Stomac6.jpg'
  },
  {
    id: 7,
    name: 'Стоматология «Аполония»',
    nameLink: null,
    workingHours: 'с 09:00 до 17:00',
    address: 'г. Сухум, ул. Ардзинба, 50',
    addressLink: 'https://yandex.ru/maps/10281/suhum/house/YEgYdgVhTkwFQFppfXxxc3tnYA==/',
    contacts: '+7 (940) 725-88-58 / +7 (840) 223-31-13',
    image: '/assets/YourDoctor_Stomac7.jpg'
  },
];

const YourDoctorDentistry: React.FC = () => {
  return (
    <div className={styles.stomacWrapper}>
      {/* Заголовок */}
      <section className={styles.titleSection}>
        <h1 className={styles.mainTitle}>Стоматологические клиники</h1>
      </section>

      {/* Карточки стоматологических клиник */}
      <section className={styles.cardsSection}>
        {dentistries.map((dentistry) => (
          <div key={dentistry.id} className={styles.stomacCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              <Image
                src={dentistry.image}
                alt={dentistry.name}
                fill
                className={styles.stomacImage}
              />
            </div>

            {/* Информация */}
            <div className={styles.infoContainer}>
              <h2 className={styles.stomacName}>
                {dentistry.nameLink ? (
                  <a href={dentistry.nameLink} target="_blank" rel="noopener noreferrer">
                    {dentistry.name}
                  </a>
                ) : (
                  dentistry.name
                )}
              </h2>
              
              <div className={styles.infoBlock}>
                {dentistry.workingHours && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Режим работы:</span>
                    <span className={styles.infoValue}>{dentistry.workingHours}</span>
                  </div>
                )}
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Адрес:</span>
                  <span className={`${styles.infoValue} ${dentistry.addressLink ? styles.addressLink : ''}`}>
                    {dentistry.addressLink ? (
                      <a href={dentistry.addressLink} target="_blank" rel="noopener noreferrer">{dentistry.address}</a>
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