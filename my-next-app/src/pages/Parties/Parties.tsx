import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Parties.module.scss';
import tabStyles from './MainTabs.module.scss';
import cardStyles from './PartyCardSuhum.module.scss';

const Parties: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Вечеринки и яркие впечатления</h1>

        {/* Neon party icon */}
        <div className={styles.centerIcon}>
          <Image
            src="/assets/parties1.png"
            alt="Party icon"
            width={150}
            height={150}
          />
        </div>
        {/* Banner with background image */}
        <section className={styles.bannerSection}>
          <div className={styles.bannerContent}>
            <p className={styles.bannerText}>
              <strong>Абхазия зажигает огни!</strong>
              <br />
              От атмосферных винодельческих вечеров с дегустациями местных вин до зажигательных пляжных вечеринок под открытым небом — здесь каждый найдёт свой идеальный вечер.
              <br />
              <br />
              Готовы окунуться в атмосферу беззаботного отдыха? Выбирайте событие по настроению — и вперёд за впечатлениями!
            </p>
          </div>

          {/* Decorative Images */}
          <Image
            src="/assets/IMG_1932.jpg"
            alt="Banner"
            fill
            priority
            className={styles.bannerBackground}
          />
          <Image
            src="/assets/parties2.jpg"
            alt="Decor 1"
            width={160}
            height={160}
            className={styles.decorTopLeft}
          />
          <Image
            src="/assets/parties3.jpg"
            alt="Decor 3"
            width={160}
            height={160}
            className={styles.decorBottomLeft}
          />
          <Image
            src="/assets/parties4.jpg"
            alt="Decor 4"
            width={160}
            height={160}
            className={styles.decorBottomCenter}
          />
          <Image
            src="/assets/parties5.png"
            alt="Decor 5"
            width={160}
            height={160}
            className={styles.decorTopRight}
          />
          <Image
            src="/assets/parties6.jpg"
            alt="Decor 6"
            width={160}
            height={160}
            className={styles.decorBottomRight}
          />
        </section>

        {/* Main Tabs */}
        <section className={tabStyles.mainTabs}>
          <div className={tabStyles.tabItem}>
            <div className={tabStyles.tabLabel}>Сухум</div>
          </div>
          <div className={tabStyles.tabItem}>
            <div className={tabStyles.tabLabel}>Гагра</div>
          </div>
          <div className={tabStyles.tabItem}>
            <div className={tabStyles.tabLabel}>Пицунда</div>
          </div>
          <div className={tabStyles.tabItem}>
            <div className={tabStyles.tabLabel}>Гудаута</div>
          </div>
          <div className={tabStyles.tabItem}>
            <div className={`${tabStyles.tabLabel} ${tabStyles.tabLabelMultiline}`}>Новый Афон</div>
          </div>
          <div className={tabStyles.tabItem}>
            <div className={tabStyles.tabLabel}>Гулрипш</div>
          </div>
          <div className={tabStyles.tabItem}>
            <div className={tabStyles.tabLabel}>Очамчыра</div>
          </div>
          <div className={tabStyles.tabItem}>
            <div className={tabStyles.tabLabel}>Ткуарчал</div>
          </div>
          <div className={tabStyles.tabItem}>
            <div className={tabStyles.tabLabel}>Гал</div>
          </div>
        </section>

        {/* Party Card Suhum */}
        <section className={cardStyles.partyCard}>
          {/* City Image */}
          <div className={cardStyles.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStyles.contentSection}>
            {/* City Title */}
            <div className={cardStyles.cityTitle}>
              <h2 className={cardStyles.cityTitleText}>Сухум</h2>
            </div>

            {/* Events Container */}
            <div className={cardStyles.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStyles.eventItem}>
                <div className={cardStyles.eventHeader}>
                  <div className={cardStyles.eventArrow}></div>
                  <h3 className={cardStyles.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStyles.eventDate}>
                  <div className={cardStyles.calendarIcon}></div>
                  <span className={cardStyles.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStyles.eventLocation}>
                  <div className={cardStyles.locationIcon}></div>
                  <span className={cardStyles.locationText}>г. Сухум, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStyles.eventDescription}>
                  <h4 className={cardStyles.descriptionTitle}>О событии</h4>
                  <p className={cardStyles.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStyles.eventLink}>
                    <span className={cardStyles.linkText}>
                      <span className={cardStyles.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStyles.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStyles.adBlock}>
                <div className={cardStyles.adContent}>
                  <span className={cardStyles.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStyles.eventItem}>
                <div className={cardStyles.eventHeader}>
                  <div className={cardStyles.eventArrow}></div>
                  <h3 className={cardStyles.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStyles.eventDate}>
                  <div className={cardStyles.calendarIcon}></div>
                  <span className={cardStyles.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStyles.eventLocation}>
                  <div className={cardStyles.locationIcon}></div>
                  <span className={cardStyles.locationText}>г. Сухум, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStyles.eventDescription}>
                  <h4 className={cardStyles.descriptionTitle}>О событии</h4>
                  <p className={cardStyles.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStyles.eventLink}>
                    <span className={cardStyles.linkText}>
                      <span className={cardStyles.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStyles.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStyles.adBlock}>
                <div className={cardStyles.adContent}>
                  <span className={cardStyles.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStyles.eventItem}>
                <div className={cardStyles.eventHeader}>
                  <div className={cardStyles.eventArrow}></div>
                  <h3 className={cardStyles.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStyles.eventDate}>
                  <div className={cardStyles.calendarIcon}></div>
                  <span className={cardStyles.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStyles.eventLocation}>
                  <div className={cardStyles.locationIcon}></div>
                  <span className={cardStyles.locationText}>г. Сухум, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStyles.eventDescription}>
                  <h4 className={cardStyles.descriptionTitle}>О событии</h4>
                  <p className={cardStyles.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStyles.eventLink}>
                    <span className={cardStyles.linkText}>
                      <span className={cardStyles.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStyles.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStyles.adBlock}>
                <div className={cardStyles.adContent}>
                  <span className={cardStyles.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Parties; 