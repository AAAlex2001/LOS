'use client';

import React from 'react';
import Image from 'next/image';
import styles from './YourDoctorHospitals.module.scss';

// Данные больниц
const hospitals = [
  {
    id: 1,
    name: 'Республиканская больница',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'Сухум, ул. Эшба, 164',
    addressLink: 'https://yandex.com/maps/-/CDXJjD1p',
    contacts: '+7 (940) 222-20-98',
    image: '/assets/YourDoctror_Hospital1.jpg'
  },
  {
    id: 2,
    name: 'Сухумская городская больница № 2',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'Сухум, ул. Конфедератов, 45',
    addressLink: 'https://yandex.com/maps/-/CDXJnG6O',
    contacts: '+7 (940) 226-32-39',
    image: '/assets/YourDoctror_Hospital2.jpg'
  },
  {
    id: 3,
    name: 'Детская больница',
    nameLink: null,
    workingHours: 'не указан',
    address: 'Сухум, Черкесская ул., 2',
    addressLink: 'https://yandex.com/maps/-/CDXJjCy4',
    contacts: '+7 (840) 226-47-15 / +7 (840) 226-45-43',
    image: '/assets/YourDoctror_Hospital3.jpg'
  },
  {
    id: 4,
    name: 'Сухумский Родильный Дом',
    nameLink: null,
    workingHours: 'не указан',
    address: 'Сухум, ул. Эшба, 162',
    addressLink: 'https://yandex.com/maps/-/CDXJvLzD',
    contacts: 'не указаны',
    image: '/assets/YourDoctror_Hospital4.jpg'
  },
  {
    id: 5,
    name: 'Городская больница',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'Кабардинская ул., 9, Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDSwIUJX',
    contacts: '+7 (840) 234-19-34',
    image: '/assets/YourDoctror_Hospital5.jpg'
  },
  {
    id: 6,
    name: 'Пицундская больница',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'Пицунда, ул. Гицба',
    addressLink: 'https://yandex.com/maps/-/CDHbN8z~',
    contacts: '+7 (940) 232-10-60',
    image: '/assets/YourDoctror_Hospital6.png'
  },
  {
    id: 7,
    name: 'Гудаутская центральная районная больница',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'Гудаута, ул. Гобечия, 49',
    addressLink: 'https://yandex.com/maps/-/CDxruF~l',
    contacts: '+7 (940) 993-04-92',
    image: '/assets/YourDoctror_Hospital7.jpg'
  },
  {
    id: 8,
    name: 'Центральная районная больница Гулрыпшского района',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'Посёлок городского типа Агудзера Гулрыпшский район',
    addressLink: 'https://yandex.com/maps/-/CDxHeF8~',
    contacts: '+7 (940) 274-45-25',
    image: '/assets/YourDoctror_Hospital8.jpg'
  },
  {
    id: 9,
    name: 'Психиатрическая больница',
    nameLink: null,
    workingHours: 'не указан',
    address: 'село Гулрыпш',
    addressLink: 'https://yandex.com/maps/-/CDxHePIA',
    contacts: '+7 (840) 229-48-44',
    image: '/assets/YourDoctror_Hospital9.jpg'
  },
  {
    id: 10,
    name: 'Ткуарчальская ЦРБ',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'г. Ткуарчал, проспект Владислава Ардзинба 25А',
    addressLink: 'https://yandex.ru/maps/105966/tkvarcheli/house/YEgYcABpQUwPQFpofXR0cHprYA==/',
    contacts: '2-20-85 / 2-22-18',
    image: '/assets/YourDoctror_Hospital10.png'
  },
  {
    id: 11,
    name: 'Очамчирская центральная районная больница',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'Очамчыра, ул. Владислава Ардзинба, 49',
    addressLink: 'https://yandex.com/maps/-/CDxdMH-P',
    contacts: '+7 (940) 927-48-44',
    image: '/assets/YourDoctror_Hospital11.jpg'
  },
  {
    id: 12,
    name: 'Гальская центральная районная больница',
    nameLink: null,
    workingHours: 'круглосуточно',
    address: 'г. Гал, ул. Самурзаканская 114',
    addressLink: 'https://yandex.ru/maps/105967/gali/house/YEgYcQNjTEYDQFpofXpzcn1mbA==/',
    contacts: '+ 7 (940) 770-55-53',
    image: '/assets/YourDoctror_Hospital12.jpg'
  },
];

const YourDoctorHospitals: React.FC = () => {
  return (
    <div className={styles.hospitalsWrapper}>
      {/* Заголовок */}
      <section className={styles.titleSection}>
        <h1 className={styles.mainTitle}>Больницы</h1>
      </section>

      {/* Карточки больниц */}
      <section className={styles.cardsSection}>
        {hospitals.map((hospital) => (
          <div key={hospital.id} className={styles.hospitalCard}>
            {/* Изображение */}
            <div className={styles.imageContainer}>
              <Image
                src={hospital.image}
                alt={hospital.name}
                fill
                className={styles.hospitalImage}
              />
            </div>

            {/* Информация */}
            <div className={styles.infoContainer}>
              <h2 className={styles.hospitalName}>
                {hospital.nameLink ? (
                  <a href={hospital.nameLink} target="_blank" rel="noopener noreferrer">
                    {hospital.name}
                  </a>
                ) : (
                  hospital.name
                )}
              </h2>
              
              <div className={styles.infoBlock}>
                {hospital.workingHours && (
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Режим работы:</span>
                    <span className={styles.infoValue}>{hospital.workingHours}</span>
                  </div>
                )}
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Адрес:</span>
                  <span className={`${styles.infoValue} ${hospital.addressLink ? styles.addressLink : ''}`}>
                    {hospital.addressLink ? (
                      <a href={hospital.addressLink} target="_blank" rel="noopener noreferrer">{hospital.address}</a>
                    ) : (
                      hospital.address
                    )}
                  </span>
                </div>
                
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Контакты:</span>
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