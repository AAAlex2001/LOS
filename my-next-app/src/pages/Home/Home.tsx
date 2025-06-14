import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from '../../styles/pages/Home.module.scss';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className={styles.home}>
        {/* Main Tabs */}
        <section className={styles.tabsSection}>
          {['Об Абхазии', 'Чем заняться', 'Запланируйте поездку', 'Необходимо в поездке'].map((label, idx) => (
            <div key={label} className={`${styles.tabItem} ${idx === 0 ? styles.active : ''}`}>
              <span>{label}</span>
              <div className={styles.tabUnderline} />
            </div>
          ))}
        </section>

        {/* Hero Video/Slider section */}
        <section className={styles.heroSection}>
          <div className={styles.videoPlaceholder}>
            <span>Видеоряд сменяющийся</span>
          </div>
        </section>

        {/* Banner */}
        <section className={styles.bannerSection}>
          <div className={styles.bannerContent}>
            <h2 className={styles.bannerText}>
              Пейзажи, которые захватывают дух, богатая история и&nbsp;вкусная еда, Абхазия не&nbsp;просто
              удивит&nbsp;— она&nbsp;покорит&nbsp;вас!<br />Готовы к&nbsp;путешествию, которое останется в&nbsp;сердце
              навсегда?
            </h2>
          </div>
        </section>

        {/* Cities Grid */}
        <section className={styles.citiesSection}>
          <h2 className={styles.sectionTitle}>Незабываемые виды Абхазии</h2>
          <div className={styles.cardsGrid}>
            {[
              { img: '/assets/city_gagra.jpg', title: 'Гагра', desc: 'Жемчужина Абхазии с пальмовой набережной, замками и крепостями' },
              { img: '/assets/city_sukhum.jpg', title: 'Сухум', desc: 'Солнечная столица с Ботаническим садом и колониальными особняками' },
              { img: '/assets/city_gudauta.jpg', title: 'Гудаута', desc: 'Уютный городок с мандариновыми садами и чистейшими пляжами' },
              { img: '/assets/city_newafon.jpg', title: 'Новый Афон', desc: 'Духовный центр с древними пещерами и Несторовой горой' },
              { img: '/assets/city_pitsunda.jpg', title: 'Пицунда', desc: 'Царство реликтовых сосен и золотистых галечных пляжей' },
              { img: '/assets/city_ochamchira.jpg', title: 'Очамчира', desc: 'Тихий приморский город с атмосферой старинного порта' },
              { img: '/assets/city_gal.png', title: 'Гал', desc: 'Край чайных плантаций, зелёных холмов и гостеприимных жителей' },
              { img: '/assets/city_gulripsh.jpg', title: 'Гулрыпш', desc: 'Горное селение с водопадами и панорамными видами' },
              { img: '/assets/city_tkuarchal.jpg', title: 'Ткуарчал', desc: 'Город шахтёров в окружении живописных горных хребтов' },
            ].map((card) => (
              <div key={card.title} className={styles.cityCard}>
                <div className={styles.cardImageWrapper}>
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className={styles.cardTextWrapper}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Заголовок перед CTA-блоком */}
        <h2 className={`${styles.sectionTitleBlue}`}>Отдых в Абхазии — с комфортом!</h2>

        {/* CTA-блок «Мандарин» */}
        <section className={styles.ctaWrapper}>
          {/* Decorative circle */}
          <img src="/assets/Mand3.png" alt="decorative" className={styles.decorCircle} />

          {/* Banner with background */}
          <div className={styles.ctaBanner}>
            <p className={styles.ctaQuestion}>
              Вы уже вдохновились горными пейзажами, лазурным морем и гостеприимством Абхазии?
            </p>
            <p className={styles.ctaText}>
              Пора забронировать уютное жильё через&nbsp;<span className={styles.highlight}>«Мандарин»</span> —
              проверенный сервис аренды с&nbsp;лучшими вариантами!
            </p>
          </div>
        </section>

        {/* Promo Section (Group 10) */}
        <section className={styles.group10}>
          {/* city card */}
          <div className={styles.group10Card}>
            <img src="/assets/big_image.jpg" alt="promo city" className={styles.group10CardImg} />
            <div className={styles.group10CardText}>
              <h3 className={styles.group10Title}>Частный сектор</h3>
              <p className={styles.group10Desc}>Гостевые дома в горах или аутентичные домики с национальным колоритом</p>
            </div>
          </div>

          {/* btn sign up */}
          <button className={styles.group10Btn}>
            <span>Подобрать жильё</span>
            <svg className={styles.group10BtnIcon} viewBox="0 0 24 100" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="12 4 4 12" />
              <polyline points="12 4 20 12" />
              <line x1="12" y1="5" x2="12" y2="35" />
            </svg>
          </button>

          {/* txt tagline */}
          <div className={styles.group10TagWrap}>
            <p className={styles.group10Tagline}>
              Без&nbsp;комиссий&nbsp;· Поддержка&nbsp;24/7&nbsp;· Гарантия&nbsp;заселения
            </p>
          </div>
        </section>

        {/* Call-to-action Buttons */}
        <section className={styles.buttonsSection}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <Link href="#" key={idx} className={styles.ovalButton}>
              <span>Ваш&nbsp;доктор</span>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage; 