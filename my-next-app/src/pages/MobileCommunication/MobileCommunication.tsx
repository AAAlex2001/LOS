import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './MobileCommunication.module.scss';

interface ProviderCard {
  id: number;
  img?: string;
  description?: string;
  site: string;
}

const mobileProviders: ProviderCard[] = [
  {
    id: 1,
    img: '/assets/MobileCommunications1.svg',
    description: 'Аквафон — первый мобильный оператор Абхазии. Данная сотовая связь предоставляет современные услуги мобильной связи на всей территории республики, обеспечивая наших абонентов быстрым и устойчивым соединением, максимальным качеством связи и высокой скоростью мобильного интернета.',
    site: 'https://aquafon.com/',
  },
  {
    id: 2,
    img: '/assets/MobileCommunications2.svg',
    description: 'Компания «А-Мобайл» появилась на рынке телекоммуникационных услуг Абхазии в ноябре 2006 года. «А-Мобайл» предлагает абонентам разнообразные тарифы с акцентом на потребление мобильного интернета; инновационные мобильные сервисы и приложения, расширяющие возможности пользователей; услуги фиксированного домашнего интернета и IP TV.',
    site: 'https://www.a-mobile.biz/',
  },
];

const internetProviders: ProviderCard[] = [
  {
    id: 3,
    img: '/assets/MobileCommunications3.svg',
    description: 'Компания предоставляет услуги высокоскоростного доступа в Интернет и цифрового кабельного телевидения в Сухуме, постоянно расширяя зону покрытия сети. Особое внимание уделяется внешним каналам связи и обеспечению оптимальной и надёжной связности с российскими и зарубежными сетями.',
    site: 'https://abazatele.com/',
  },
  {
    id: 4,
    img: '/assets/MobileCommunications4.svg',
    description: 'Компания предоставляет услуги высокоскоростного доступа в Интернет и цифрового кабельного телевидения, бесплатный онлайн-кинотеатр, постоянно расширяет зону покрытия сети. Особое внимание уделяется внешним каналам связи и обеспечению оптимальной и надёжной связности с российскими и зарубежными сетями.',
    site: 'https://www.cyxym.net/',
  },
];

const MobileCommunication: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Интернет и мобильная связь</h1>
        
        <div className={styles.fullWidthSection}>
          <div className={styles.backgroundImageSection}>
            <div className={styles.introOverlay}>
              <p className={styles.introText}>
                Интернет и мобильная связь, которым можно доверять. 
                Сравните и подключайтесь — все провайдеры здесь!
              </p>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Мобильная связь</h2>
          <div className={styles.providersContainer}>
            {mobileProviders.map((provider) => (
              <article key={provider.id} className={styles.card}>
                {provider.img && (
                  <img
                    className={styles.cardImg}
                    src={provider.img}
                    alt="provider logo"
                  />
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardDescription}>{provider.description}</p>
                  <a
                    href={provider.site}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    САЙТ: {provider.site}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Интернет</h2>
          <div className={styles.providersContainer}>
            {internetProviders.map((provider) => (
              <article key={provider.id} className={styles.card}>
                {provider.img && (
                  <img
                    className={styles.cardImg}
                    src={provider.img}
                    alt="provider logo"
                  />
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardDescription}>{provider.description}</p>
                  <a
                    href={provider.site}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    САЙТ: {provider.site}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MobileCommunication; 