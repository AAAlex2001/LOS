"use client";

import React from 'react';
import styles from './YourDoctorDoctors.module.scss';

type DoctorsGroup = {
  id: number;
  hospital_name: string;
  doctors: string[];
  order: number;
};

type Props = { doctors_groups: DoctorsGroup[] };

const YourDoctorDoctors: React.FC<Props> = ({ doctors_groups }) => {
  return (
    <div className={styles.doctorsWrapper}>
      {/* Заголовок */}
      <div className={styles.titleContainer}>
        <h2 className={styles.mainTitle}>Врачи</h2>
      </div>

      {/* Список врачей по больницам */}
      <div className={styles.doctorsContainer}>
        {doctors_groups?.map((hospital: DoctorsGroup) => (
          <div key={hospital.id} className={styles.hospitalSection}>
            <div className={styles.hospitalTitleContainer}>
              <h3 className={styles.hospitalTitle}>{hospital.hospital_name}</h3>
            </div>
            <div className={styles.doctorsListContainer}>
              <div className={hospital.hospital_name === '«Лабквест»' ? styles.doctorsListUnderlined : styles.doctorsList}>
                {hospital.doctors.map((doctor: string, index: number) => {
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