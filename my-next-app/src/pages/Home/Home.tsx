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