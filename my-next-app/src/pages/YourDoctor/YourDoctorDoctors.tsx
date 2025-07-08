'use client';

import React from 'react';
import styles from './YourDoctorDoctors.module.scss';

// Данные врачей по больницам
const doctorsData = [
  {
    id: 1,
    hospitalName: 'Республиканская больница',
    doctors: [
      'Ардзинба Илона — кардиолог (Лабквест)',
      'Пкин Гунда — кардиолог (Лабквест)',
      'Арчелия Анжела — терапевт',
      'Анкваб Рената — эндокринолог',
      'Берзения Эка — ЛОР врач (Лабквест)',
      'Гургулия Кесоу — эндоскопический хирург (Лабквест, МРТ)',
      'Тарба Манана — узист',
      'Арнаут Анри — сосудистый хирург (Лабквест)',
      'Трапш Гудиса — хирург',
      'Чагава Маврик — хирург',
      'Тарба Астанда — невролог (Лабквест)',
      'Иванба Нара — невролог',
      'Свинухов Александр — нейрохирург',
      'Отырба Олег — нейрохирург',
      'Чалян Влад — травматолог',
      'Иванба Астамур — травматолог'
    ]
  },
  {
    id: 2,
    hospitalName: 'Городская больница 2',
    doctors: [
      'Аргун Инна — врач ультразвуковой диагностики'
    ]
  },
  {
    id: 3,
    hospitalName: 'Женская консультация',
    doctors: [
      'Шурдулава Элизабет — гинеколог',
      'Шулумба Кама — гинеколог',
      'Гургулия Асида — гинеколог (Лабквест)',
      'Джикирба Асида — гинеколог',
      'Джакония Эльвира — терапевт'
    ]
  },
  {
    id: 4,
    hospitalName: '«Лабквест»',
    doctors: [
      'Кварчия Астанда — педиатр',
      'Тарасова Дарья — педиатр',
      'Авидзба Леонида — педиатр',
      'Хагуш Астанда — терапевт',
      'Асландзия Хатуна — врач ультразвуковой диагностики',
      'Гургулия Асида — акушер — гинеколог, УЗИ по беременности',
      'Гарцкия Гунда — гинеколог',
      'Шакая Аэлита — гепатолог',
      'Маркарян Самвел — уролог'
    ]
  },
  {
    id: 5,
    hospitalName: 'Детская больница',
    doctors: [
      'Гегия Марина — педиатр',
      'Апба Зита — хирург',
      'Адлейба Саида — узист'
    ]
  },
  {
    id: 6,
    hospitalName: 'Роддом',
    doctors: [
      'Воробьёва Виктория',
      'Адзынба Мадина',
      'Бигвава Астанда'
    ]
  },
  {
    id: 7,
    hospitalName: 'Центр женского здоровья «Мама»',
    doctors: [
      'Гогия Виктория — проктолог'
    ]
  },
  {
    id: 8,
    hospitalName: 'Клинико-диагностический центр',
    doctors: [
      'Гургулия Кесоу — эндоскопический хирург'
    ]
  },
  {
    id: 9,
    hospitalName: 'Клиника прозрение',
    doctors: [
      'Гулария Астамур — офтальмолог'
    ]
  },
  {
    id: 10,
    hospitalName: 'Глазная больница',
    doctors: [
      'Жиба Мадина — офтальмолог'
    ]
  },
  {
    id: 11,
    hospitalName: 'Педиатр',
    doctors: [
      'Аршба Сельма Константиновна — педиатр'
    ]
  }
];

const YourDoctorDoctors: React.FC = () => {
  return (
    <div className={styles.doctorsWrapper}>
      {/* Заголовок */}
      <div className={styles.titleContainer}>
        <h2 className={styles.mainTitle}>Врачи</h2>
      </div>

      {/* Список врачей по больницам */}
      <div className={styles.doctorsContainer}>
        {doctorsData.map((hospital) => (
          <div key={hospital.id} className={styles.hospitalSection}>
            <div className={styles.hospitalTitleContainer}>
              <h3 className={styles.hospitalTitle}>{hospital.hospitalName}</h3>
            </div>
            <div className={styles.doctorsListContainer}>
              <div className={hospital.hospitalName === '«Лабквест»' ? styles.doctorsListUnderlined : styles.doctorsList}>
                {hospital.doctors.map((doctor, index) => {
                  const shouldNumber = hospital.doctors.length > 1;
                  return (
                    <span key={index}>
                      {shouldNumber ? `${index + 1}. ` : ''}{doctor}
                      {index < hospital.doctors.length - 1 && '\n'}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourDoctorDoctors; 