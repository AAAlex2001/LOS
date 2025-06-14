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
          <h2 className={styles.sectionTitle}>Популярные города</h2>
          <div className={styles.cardsGrid}>
            {[
              { img: '/assets/city1.jpg', title: 'Гагра', desc: 'Жемчужина Абхазии с пальмовой набережной, замками и крепостями' },
              { img: '/assets/city2.jpg', title: 'Сухум', desc: 'Курортный центр с богатой историей и живописными видами' },
              { img: '/assets/city3.jpg', title: 'Новый Афон', desc: 'Монастырь, гроты и удивительная природа' },
              { img: '/assets/city4.jpg', title: 'Пицунда', desc: 'Пляжи, сосновый бор и тёплое море' },
              { img: '/assets/city5.jpg', title: 'Цандрыпш', desc: 'Курорт у самой границы с уникальной атмосферой' },
              { img: '/assets/city6.jpg', title: 'Гудаута', desc: 'Тихий отдых вдали от шума' },
              { img: '/assets/city7.jpg', title: 'Очамчира', desc: 'Древний город на побережье с богатой историей' },
              { img: '/assets/city8.jpg', title: 'Ткварчели', desc: 'Горный город среди живописных склонов' },
              { img: '/assets/city9.jpg', title: 'Батум', desc: 'Курорт с уникальной архитектурой и ночной жизнью' },
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