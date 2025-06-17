import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './TransportCommunications.module.scss';

const TransportCommunications = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>
          Транспортное сообщение республики Абхазия
        </h1>

        <section className={styles.transportBlock}>
          <h2 className={styles.blockTitle}>
            Сухумский международный аэропорт имени В.Г. Ардзинба
          </h2>
          <div className={styles.imagesContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/airport1.jpg"
                alt="Сухумский международный аэропорт"
                width={788}
                height={426}
                className={styles.image}
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/airport2.png"
                alt="Карта аэропорта Сухум"
                width={645}
                height={426}
                className={styles.image}
              />
            </div>
          </div>
        </section>

        <section className={styles.transportBlock}>
          <h2 className={styles.blockTitle}>Железнодорожный вокзал Сухум</h2>
          <div className={styles.imagesContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/vokzal1.jpg"
                alt="Железнодорожный вокзал Сухум"
                width={788}
                height={426}
                className={styles.image}
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/vokzal2.png"
                alt="Карта Ж/Д вокзала Сухум"
                width={671}
                height={426}
                className={styles.image}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TransportCommunications;