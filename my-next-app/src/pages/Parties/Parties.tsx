import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Parties.module.scss';
import tabStyles from './MainTabs.module.scss';
import cardStyles from './PartyCardSuhum.module.scss';
import cardStylesGagra from './PartyCardGagra.module.scss';
import cardStylesPitsunda from './PartyCardPitsunda.module.scss';
import cardStylesGudauta from './PartyCardGudauta.module.scss';
import cardStylesNewafon from './PartyCardNewafon.module.scss';
import cardStylesGulripsh from './PartyCardGulripsh.module.scss';
import cardStylesOchamchira from './PartyCardOchamchira.module.scss';
import cardStylesTkuarchal from './PartyCardTkuarchal.module.scss';
import cardStylesGal from './PartyCardGal.module.scss';

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

        {/* Party Card Gagra */}
        <section className={cardStylesGagra.partyCard}>
          {/* City Image */}
          <div className={cardStylesGagra.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStylesGagra.contentSection}>
            {/* City Title */}
            <div className={cardStylesGagra.cityTitle}>
              <h2 className={cardStylesGagra.cityTitleText}>Гагра</h2>
            </div>

            {/* Events Container */}
            <div className={cardStylesGagra.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStylesGagra.eventItem}>
                <div className={cardStylesGagra.eventHeader}>
                  <div className={cardStylesGagra.eventArrow}></div>
                  <h3 className={cardStylesGagra.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStylesGagra.eventDate}>
                  <div className={cardStylesGagra.calendarIcon}></div>
                  <span className={cardStylesGagra.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesGagra.eventLocation}>
                  <div className={cardStylesGagra.locationIcon}></div>
                  <span className={cardStylesGagra.locationText}>г. Гагра, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGagra.eventDescription}>
                  <h4 className={cardStylesGagra.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGagra.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStylesGagra.eventLink}>
                    <span className={cardStylesGagra.linkText}>
                      <span className={cardStylesGagra.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGagra.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStylesGagra.adBlock}>
                <div className={cardStylesGagra.adContent}>
                  <span className={cardStylesGagra.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStylesGagra.eventItem}>
                <div className={cardStylesGagra.eventHeader}>
                  <div className={cardStylesGagra.eventArrow}></div>
                  <h3 className={cardStylesGagra.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStylesGagra.eventDate}>
                  <div className={cardStylesGagra.calendarIcon}></div>
                  <span className={cardStylesGagra.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesGagra.eventLocation}>
                  <div className={cardStylesGagra.locationIcon}></div>
                  <span className={cardStylesGagra.locationText}>г. Гагра, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGagra.eventDescription}>
                  <h4 className={cardStylesGagra.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGagra.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesGagra.eventLink}>
                    <span className={cardStylesGagra.linkText}>
                      <span className={cardStylesGagra.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGagra.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStylesGagra.adBlock}>
                <div className={cardStylesGagra.adContent}>
                  <span className={cardStylesGagra.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStylesGagra.eventItem}>
                <div className={cardStylesGagra.eventHeader}>
                  <div className={cardStylesGagra.eventArrow}></div>
                  <h3 className={cardStylesGagra.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStylesGagra.eventDate}>
                  <div className={cardStylesGagra.calendarIcon}></div>
                  <span className={cardStylesGagra.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStylesGagra.eventLocation}>
                  <div className={cardStylesGagra.locationIcon}></div>
                  <span className={cardStylesGagra.locationText}>г. Гагра, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGagra.eventDescription}>
                  <h4 className={cardStylesGagra.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGagra.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesGagra.eventLink}>
                    <span className={cardStylesGagra.linkText}>
                      <span className={cardStylesGagra.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGagra.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStylesGagra.adBlock}>
                <div className={cardStylesGagra.adContent}>
                  <span className={cardStylesGagra.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Party Card Pitsunda */}
        <section className={cardStylesPitsunda.partyCard}>
          {/* City Image */}
          <div className={cardStylesPitsunda.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStylesPitsunda.contentSection}>
            {/* City Title */}
            <div className={cardStylesPitsunda.cityTitle}>
              <h2 className={cardStylesPitsunda.cityTitleText}>Пицунда</h2>
            </div>

            {/* Events Container */}
            <div className={cardStylesPitsunda.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStylesPitsunda.eventItem}>
                <div className={cardStylesPitsunda.eventHeader}>
                  <div className={cardStylesPitsunda.eventArrow}></div>
                  <h3 className={cardStylesPitsunda.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStylesPitsunda.eventDate}>
                  <div className={cardStylesPitsunda.calendarIcon}></div>
                  <span className={cardStylesPitsunda.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesPitsunda.eventLocation}>
                  <div className={cardStylesPitsunda.locationIcon}></div>
                  <span className={cardStylesPitsunda.locationText}>г. Пицунда, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesPitsunda.eventDescription}>
                  <h4 className={cardStylesPitsunda.descriptionTitle}>О событии</h4>
                  <p className={cardStylesPitsunda.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStylesPitsunda.eventLink}>
                    <span className={cardStylesPitsunda.linkText}>
                      <span className={cardStylesPitsunda.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesPitsunda.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStylesPitsunda.adBlock}>
                <div className={cardStylesPitsunda.adContent}>
                  <span className={cardStylesPitsunda.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStylesPitsunda.eventItem}>
                <div className={cardStylesPitsunda.eventHeader}>
                  <div className={cardStylesPitsunda.eventArrow}></div>
                  <h3 className={cardStylesPitsunda.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStylesPitsunda.eventDate}>
                  <div className={cardStylesPitsunda.calendarIcon}></div>
                  <span className={cardStylesPitsunda.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesPitsunda.eventLocation}>
                  <div className={cardStylesPitsunda.locationIcon}></div>
                  <span className={cardStylesPitsunda.locationText}>г. Пицунда, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesPitsunda.eventDescription}>
                  <h4 className={cardStylesPitsunda.descriptionTitle}>О событии</h4>
                  <p className={cardStylesPitsunda.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesPitsunda.eventLink}>
                    <span className={cardStylesPitsunda.linkText}>
                      <span className={cardStylesPitsunda.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesPitsunda.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStylesPitsunda.adBlock}>
                <div className={cardStylesPitsunda.adContent}>
                  <span className={cardStylesPitsunda.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStylesPitsunda.eventItem}>
                <div className={cardStylesPitsunda.eventHeader}>
                  <div className={cardStylesPitsunda.eventArrow}></div>
                  <h3 className={cardStylesPitsunda.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStylesPitsunda.eventDate}>
                  <div className={cardStylesPitsunda.calendarIcon}></div>
                  <span className={cardStylesPitsunda.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStylesPitsunda.eventLocation}>
                  <div className={cardStylesPitsunda.locationIcon}></div>
                  <span className={cardStylesPitsunda.locationText}>г. Пицунда, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesPitsunda.eventDescription}>
                  <h4 className={cardStylesPitsunda.descriptionTitle}>О событии</h4>
                  <p className={cardStylesPitsunda.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesPitsunda.eventLink}>
                    <span className={cardStylesPitsunda.linkText}>
                      <span className={cardStylesPitsunda.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesPitsunda.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStylesPitsunda.adBlock}>
                <div className={cardStylesPitsunda.adContent}>
                  <span className={cardStylesPitsunda.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Party Card Gudauta */}
        <section className={cardStylesGudauta.partyCard}>
          {/* City Image */}
          <div className={cardStylesGudauta.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStylesGudauta.contentSection}>
            {/* City Title */}
            <div className={cardStylesGudauta.cityTitle}>
              <h2 className={cardStylesGudauta.cityTitleText}>Гудаута</h2>
            </div>

            {/* Events Container */}
            <div className={cardStylesGudauta.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStylesGudauta.eventItem}>
                <div className={cardStylesGudauta.eventHeader}>
                  <div className={cardStylesGudauta.eventArrow}></div>
                  <h3 className={cardStylesGudauta.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStylesGudauta.eventDate}>
                  <div className={cardStylesGudauta.calendarIcon}></div>
                  <span className={cardStylesGudauta.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesGudauta.eventLocation}>
                  <div className={cardStylesGudauta.locationIcon}></div>
                  <span className={cardStylesGudauta.locationText}>г. Гудаута, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGudauta.eventDescription}>
                  <h4 className={cardStylesGudauta.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGudauta.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStylesGudauta.eventLink}>
                    <span className={cardStylesGudauta.linkText}>
                      <span className={cardStylesGudauta.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGudauta.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStylesGudauta.adBlock}>
                <div className={cardStylesGudauta.adContent}>
                  <span className={cardStylesGudauta.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStylesGudauta.eventItem}>
                <div className={cardStylesGudauta.eventHeader}>
                  <div className={cardStylesGudauta.eventArrow}></div>
                  <h3 className={cardStylesGudauta.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStylesGudauta.eventDate}>
                  <div className={cardStylesGudauta.calendarIcon}></div>
                  <span className={cardStylesGudauta.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesGudauta.eventLocation}>
                  <div className={cardStylesGudauta.locationIcon}></div>
                  <span className={cardStylesGudauta.locationText}>г. Гудаута, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGudauta.eventDescription}>
                  <h4 className={cardStylesGudauta.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGudauta.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesGudauta.eventLink}>
                    <span className={cardStylesGudauta.linkText}>
                      <span className={cardStylesGudauta.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGudauta.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStylesGudauta.adBlock}>
                <div className={cardStylesGudauta.adContent}>
                  <span className={cardStylesGudauta.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStylesGudauta.eventItem}>
                <div className={cardStylesGudauta.eventHeader}>
                  <div className={cardStylesGudauta.eventArrow}></div>
                  <h3 className={cardStylesGudauta.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStylesGudauta.eventDate}>
                  <div className={cardStylesGudauta.calendarIcon}></div>
                  <span className={cardStylesGudauta.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStylesGudauta.eventLocation}>
                  <div className={cardStylesGudauta.locationIcon}></div>
                  <span className={cardStylesGudauta.locationText}>г. Гудаута, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGudauta.eventDescription}>
                  <h4 className={cardStylesGudauta.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGudauta.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesGudauta.eventLink}>
                    <span className={cardStylesGudauta.linkText}>
                      <span className={cardStylesGudauta.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGudauta.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStylesGudauta.adBlock}>
                <div className={cardStylesGudauta.adContent}>
                  <span className={cardStylesGudauta.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Party Card New Afon */}
        <section className={cardStylesNewafon.partyCard}>
          {/* City Image */}
          <div className={cardStylesNewafon.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStylesNewafon.contentSection}>
            {/* City Title */}
            <div className={cardStylesNewafon.cityTitle}>
              <h2 className={cardStylesNewafon.cityTitleText}>Новый Афон</h2>
            </div>

            {/* Events Container */}
            <div className={cardStylesNewafon.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStylesNewafon.eventItem}>
                <div className={cardStylesNewafon.eventHeader}>
                  <div className={cardStylesNewafon.eventArrow}></div>
                  <h3 className={cardStylesNewafon.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStylesNewafon.eventDate}>
                  <div className={cardStylesNewafon.calendarIcon}></div>
                  <span className={cardStylesNewafon.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesNewafon.eventLocation}>
                  <div className={cardStylesNewafon.locationIcon}></div>
                  <span className={cardStylesNewafon.locationText}>г. Новый Афон, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesNewafon.eventDescription}>
                  <h4 className={cardStylesNewafon.descriptionTitle}>О событии</h4>
                  <p className={cardStylesNewafon.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStylesNewafon.eventLink}>
                    <span className={cardStylesNewafon.linkText}>
                      <span className={cardStylesNewafon.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesNewafon.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStylesNewafon.adBlock}>
                <div className={cardStylesNewafon.adContent}>
                  <span className={cardStylesNewafon.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStylesNewafon.eventItem}>
                <div className={cardStylesNewafon.eventHeader}>
                  <div className={cardStylesNewafon.eventArrow}></div>
                  <h3 className={cardStylesNewafon.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStylesNewafon.eventDate}>
                  <div className={cardStylesNewafon.calendarIcon}></div>
                  <span className={cardStylesNewafon.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesNewafon.eventLocation}>
                  <div className={cardStylesNewafon.locationIcon}></div>
                  <span className={cardStylesNewafon.locationText}>г. Новый Афон, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesNewafon.eventDescription}>
                  <h4 className={cardStylesNewafon.descriptionTitle}>О событии</h4>
                  <p className={cardStylesNewafon.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesNewafon.eventLink}>
                    <span className={cardStylesNewafon.linkText}>
                      <span className={cardStylesNewafon.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesNewafon.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStylesNewafon.adBlock}>
                <div className={cardStylesNewafon.adContent}>
                  <span className={cardStylesNewafon.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStylesNewafon.eventItem}>
                <div className={cardStylesNewafon.eventHeader}>
                  <div className={cardStylesNewafon.eventArrow}></div>
                  <h3 className={cardStylesNewafon.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStylesNewafon.eventDate}>
                  <div className={cardStylesNewafon.calendarIcon}></div>
                  <span className={cardStylesNewafon.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStylesNewafon.eventLocation}>
                  <div className={cardStylesNewafon.locationIcon}></div>
                  <span className={cardStylesNewafon.locationText}>г. Новый Афон, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesNewafon.eventDescription}>
                  <h4 className={cardStylesNewafon.descriptionTitle}>О событии</h4>
                  <p className={cardStylesNewafon.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesNewafon.eventLink}>
                    <span className={cardStylesNewafon.linkText}>
                      <span className={cardStylesNewafon.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesNewafon.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStylesNewafon.adBlock}>
                <div className={cardStylesNewafon.adContent}>
                  <span className={cardStylesNewafon.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Party Card Gulripsh */}
        <section className={cardStylesGulripsh.partyCard}>
          {/* City Image */}
          <div className={cardStylesGulripsh.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStylesGulripsh.contentSection}>
            {/* City Title */}
            <div className={cardStylesGulripsh.cityTitle}>
              <h2 className={cardStylesGulripsh.cityTitleText}>Гулрипш</h2>
            </div>

            {/* Events Container */}
            <div className={cardStylesGulripsh.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStylesGulripsh.eventItem}>
                <div className={cardStylesGulripsh.eventHeader}>
                  <div className={cardStylesGulripsh.eventArrow}></div>
                  <h3 className={cardStylesGulripsh.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStylesGulripsh.eventDate}>
                  <div className={cardStylesGulripsh.calendarIcon}></div>
                  <span className={cardStylesGulripsh.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesGulripsh.eventLocation}>
                  <div className={cardStylesGulripsh.locationIcon}></div>
                  <span className={cardStylesGulripsh.locationText}>г. Гулрипш, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGulripsh.eventDescription}>
                  <h4 className={cardStylesGulripsh.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGulripsh.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStylesGulripsh.eventLink}>
                    <span className={cardStylesGulripsh.linkText}>
                      <span className={cardStylesGulripsh.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGulripsh.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStylesGulripsh.adBlock}>
                <div className={cardStylesGulripsh.adContent}>
                  <span className={cardStylesGulripsh.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStylesGulripsh.eventItem}>
                <div className={cardStylesGulripsh.eventHeader}>
                  <div className={cardStylesGulripsh.eventArrow}></div>
                  <h3 className={cardStylesGulripsh.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStylesGulripsh.eventDate}>
                  <div className={cardStylesGulripsh.calendarIcon}></div>
                  <span className={cardStylesGulripsh.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesGulripsh.eventLocation}>
                  <div className={cardStylesGulripsh.locationIcon}></div>
                  <span className={cardStylesGulripsh.locationText}>г. Гулрипш, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGulripsh.eventDescription}>
                  <h4 className={cardStylesGulripsh.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGulripsh.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesGulripsh.eventLink}>
                    <span className={cardStylesGulripsh.linkText}>
                      <span className={cardStylesGulripsh.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGulripsh.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStylesGulripsh.adBlock}>
                <div className={cardStylesGulripsh.adContent}>
                  <span className={cardStylesGulripsh.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStylesGulripsh.eventItem}>
                <div className={cardStylesGulripsh.eventHeader}>
                  <div className={cardStylesGulripsh.eventArrow}></div>
                  <h3 className={cardStylesGulripsh.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStylesGulripsh.eventDate}>
                  <div className={cardStylesGulripsh.calendarIcon}></div>
                  <span className={cardStylesGulripsh.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStylesGulripsh.eventLocation}>
                  <div className={cardStylesGulripsh.locationIcon}></div>
                  <span className={cardStylesGulripsh.locationText}>г. Гулрипш, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGulripsh.eventDescription}>
                  <h4 className={cardStylesGulripsh.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGulripsh.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesGulripsh.eventLink}>
                    <span className={cardStylesGulripsh.linkText}>
                      <span className={cardStylesGulripsh.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGulripsh.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStylesGulripsh.adBlock}>
                <div className={cardStylesGulripsh.adContent}>
                  <span className={cardStylesGulripsh.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Party Card Ochamchira */}
        <section className={cardStylesOchamchira.partyCard}>
          {/* City Image */}
          <div className={cardStylesOchamchira.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStylesOchamchira.contentSection}>
            {/* City Title */}
            <div className={cardStylesOchamchira.cityTitle}>
              <h2 className={cardStylesOchamchira.cityTitleText}>Очамчыра</h2>
            </div>

            {/* Events Container */}
            <div className={cardStylesOchamchira.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStylesOchamchira.eventItem}>
                <div className={cardStylesOchamchira.eventHeader}>
                  <div className={cardStylesOchamchira.eventArrow}></div>
                  <h3 className={cardStylesOchamchira.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStylesOchamchira.eventDate}>
                  <div className={cardStylesOchamchira.calendarIcon}></div>
                  <span className={cardStylesOchamchira.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesOchamchira.eventLocation}>
                  <div className={cardStylesOchamchira.locationIcon}></div>
                  <span className={cardStylesOchamchira.locationText}>г. Очамчыра, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesOchamchira.eventDescription}>
                  <h4 className={cardStylesOchamchira.descriptionTitle}>О событии</h4>
                  <p className={cardStylesOchamchira.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStylesOchamchira.eventLink}>
                    <span className={cardStylesOchamchira.linkText}>
                      <span className={cardStylesOchamchira.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesOchamchira.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStylesOchamchira.adBlock}>
                <div className={cardStylesOchamchira.adContent}>
                  <span className={cardStylesOchamchira.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStylesOchamchira.eventItem}>
                <div className={cardStylesOchamchira.eventHeader}>
                  <div className={cardStylesOchamchira.eventArrow}></div>
                  <h3 className={cardStylesOchamchira.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStylesOchamchira.eventDate}>
                  <div className={cardStylesOchamchira.calendarIcon}></div>
                  <span className={cardStylesOchamchira.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesOchamchira.eventLocation}>
                  <div className={cardStylesOchamchira.locationIcon}></div>
                  <span className={cardStylesOchamchira.locationText}>г. Очамчыра, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesOchamchira.eventDescription}>
                  <h4 className={cardStylesOchamchira.descriptionTitle}>О событии</h4>
                  <p className={cardStylesOchamchira.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesOchamchira.eventLink}>
                    <span className={cardStylesOchamchira.linkText}>
                      <span className={cardStylesOchamchira.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesOchamchira.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStylesOchamchira.adBlock}>
                <div className={cardStylesOchamchira.adContent}>
                  <span className={cardStylesOchamchira.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStylesOchamchira.eventItem}>
                <div className={cardStylesOchamchira.eventHeader}>
                  <div className={cardStylesOchamchira.eventArrow}></div>
                  <h3 className={cardStylesOchamchira.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStylesOchamchira.eventDate}>
                  <div className={cardStylesOchamchira.calendarIcon}></div>
                  <span className={cardStylesOchamchira.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStylesOchamchira.eventLocation}>
                  <div className={cardStylesOchamchira.locationIcon}></div>
                  <span className={cardStylesOchamchira.locationText}>г. Очамчыра, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesOchamchira.eventDescription}>
                  <h4 className={cardStylesOchamchira.descriptionTitle}>О событии</h4>
                  <p className={cardStylesOchamchira.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesOchamchira.eventLink}>
                    <span className={cardStylesOchamchira.linkText}>
                      <span className={cardStylesOchamchira.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesOchamchira.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStylesOchamchira.adBlock}>
                <div className={cardStylesOchamchira.adContent}>
                  <span className={cardStylesOchamchira.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Party Card Tkuarchal */}
        <section className={cardStylesTkuarchal.partyCard}>
          {/* City Image */}
          <div className={cardStylesTkuarchal.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStylesTkuarchal.contentSection}>
            {/* City Title */}
            <div className={cardStylesTkuarchal.cityTitle}>
              <h2 className={cardStylesTkuarchal.cityTitleText}>Ткуарчал</h2>
            </div>

            {/* Events Container */}
            <div className={cardStylesTkuarchal.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStylesTkuarchal.eventItem}>
                <div className={cardStylesTkuarchal.eventHeader}>
                  <div className={cardStylesTkuarchal.eventArrow}></div>
                  <h3 className={cardStylesTkuarchal.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStylesTkuarchal.eventDate}>
                  <div className={cardStylesTkuarchal.calendarIcon}></div>
                  <span className={cardStylesTkuarchal.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesTkuarchal.eventLocation}>
                  <div className={cardStylesTkuarchal.locationIcon}></div>
                  <span className={cardStylesTkuarchal.locationText}>г. Ткуарчал, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesTkuarchal.eventDescription}>
                  <h4 className={cardStylesTkuarchal.descriptionTitle}>О событии</h4>
                  <p className={cardStylesTkuarchal.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStylesTkuarchal.eventLink}>
                    <span className={cardStylesTkuarchal.linkText}>
                      <span className={cardStylesTkuarchal.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesTkuarchal.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStylesTkuarchal.adBlock}>
                <div className={cardStylesTkuarchal.adContent}>
                  <span className={cardStylesTkuarchal.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStylesTkuarchal.eventItem}>
                <div className={cardStylesTkuarchal.eventHeader}>
                  <div className={cardStylesTkuarchal.eventArrow}></div>
                  <h3 className={cardStylesTkuarchal.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStylesTkuarchal.eventDate}>
                  <div className={cardStylesTkuarchal.calendarIcon}></div>
                  <span className={cardStylesTkuarchal.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesTkuarchal.eventLocation}>
                  <div className={cardStylesTkuarchal.locationIcon}></div>
                  <span className={cardStylesTkuarchal.locationText}>г. Ткуарчал, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesTkuarchal.eventDescription}>
                  <h4 className={cardStylesTkuarchal.descriptionTitle}>О событии</h4>
                  <p className={cardStylesTkuarchal.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesTkuarchal.eventLink}>
                    <span className={cardStylesTkuarchal.linkText}>
                      <span className={cardStylesTkuarchal.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesTkuarchal.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStylesTkuarchal.adBlock}>
                <div className={cardStylesTkuarchal.adContent}>
                  <span className={cardStylesTkuarchal.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStylesTkuarchal.eventItem}>
                <div className={cardStylesTkuarchal.eventHeader}>
                  <div className={cardStylesTkuarchal.eventArrow}></div>
                  <h3 className={cardStylesTkuarchal.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStylesTkuarchal.eventDate}>
                  <div className={cardStylesTkuarchal.calendarIcon}></div>
                  <span className={cardStylesTkuarchal.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStylesTkuarchal.eventLocation}>
                  <div className={cardStylesTkuarchal.locationIcon}></div>
                  <span className={cardStylesTkuarchal.locationText}>г. Ткуарчал, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesTkuarchal.eventDescription}>
                  <h4 className={cardStylesTkuarchal.descriptionTitle}>О событии</h4>
                  <p className={cardStylesTkuarchal.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesTkuarchal.eventLink}>
                    <span className={cardStylesTkuarchal.linkText}>
                      <span className={cardStylesTkuarchal.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesTkuarchal.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStylesTkuarchal.adBlock}>
                <div className={cardStylesTkuarchal.adContent}>
                  <span className={cardStylesTkuarchal.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Party Card Gal */}
        <section className={cardStylesGal.partyCard}>
          {/* City Image */}
          <div className={cardStylesGal.cityImageSection}></div>

          {/* Content Section */}
          <div className={cardStylesGal.contentSection}>
            {/* City Title */}
            <div className={cardStylesGal.cityTitle}>
              <h2 className={cardStylesGal.cityTitleText}>Гал</h2>
            </div>

            {/* Events Container */}
            <div className={cardStylesGal.eventsContainer}>
              {/* Event 1: Караоке-бар */}
              <div className={cardStylesGal.eventItem}>
                <div className={cardStylesGal.eventHeader}>
                  <div className={cardStylesGal.eventArrow}></div>
                  <h3 className={cardStylesGal.eventTitle}>Караоке-бар "Space"</h3>
                </div>
                <div className={cardStylesGal.eventDate}>
                  <div className={cardStylesGal.calendarIcon}></div>
                  <span className={cardStylesGal.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesGal.eventLocation}>
                  <div className={cardStylesGal.locationIcon}></div>
                  <span className={cardStylesGal.locationText}>г. Гал, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGal.eventDescription}>
                  <h4 className={cardStylesGal.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGal.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut. Magna et dignissim non facilisi faucibus. Ultricies praesent sit nullam arcu tempus neque odio bibendum.
                  </p>
                  <div className={cardStylesGal.eventLink}>
                    <span className={cardStylesGal.linkText}>
                      <span className={cardStylesGal.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGal.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 1 */}
              <div className={cardStylesGal.adBlock}>
                <div className={cardStylesGal.adContent}>
                  <span className={cardStylesGal.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 2: Пляж */}
              <div className={cardStylesGal.eventItem}>
                <div className={cardStylesGal.eventHeader}>
                  <div className={cardStylesGal.eventArrow}></div>
                  <h3 className={cardStylesGal.eventTitle}>Пляж "Мокко"</h3>
                </div>
                <div className={cardStylesGal.eventDate}>
                  <div className={cardStylesGal.calendarIcon}></div>
                  <span className={cardStylesGal.dateText}>27 декабря 2024 – 30 июня 2025 вт–вс 12:00–20:00</span>
                </div>
                <div className={cardStylesGal.eventLocation}>
                  <div className={cardStylesGal.locationIcon}></div>
                  <span className={cardStylesGal.locationText}>г. Гал, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGal.eventDescription}>
                  <h4 className={cardStylesGal.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGal.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesGal.eventLink}>
                    <span className={cardStylesGal.linkText}>
                      <span className={cardStylesGal.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGal.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Block 2 */}
              <div className={cardStylesGal.adBlock}>
                <div className={cardStylesGal.adContent}>
                  <span className={cardStylesGal.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
                </div>
              </div>

              {/* Event 3: Ресторан */}
              <div className={cardStylesGal.eventItem}>
                <div className={cardStylesGal.eventHeader}>
                  <div className={cardStylesGal.eventArrow}></div>
                  <h3 className={cardStylesGal.eventTitle}>Ресторан «Нартаа»</h3>
                </div>
                <div className={cardStylesGal.eventDate}>
                  <div className={cardStylesGal.calendarIcon}></div>
                  <span className={cardStylesGal.dateText}>30 июня 2025 18:00–20:00</span>
                </div>
                <div className={cardStylesGal.eventLocation}>
                  <div className={cardStylesGal.locationIcon}></div>
                  <span className={cardStylesGal.locationText}>г. Гал, Рижский проспект, дом 3</span>
                </div>
                <div className={cardStylesGal.eventDescription}>
                  <h4 className={cardStylesGal.descriptionTitle}>О событии</h4>
                  <p className={cardStylesGal.descriptionText}>
                    Lorem ipsum dolor sit amet consectetur. Pretium mauris pellentesque id nisl pretium. Egestas leo sed est at velit diam aliquet. Bibendum pellentesque sit posuere quam orci. Pretium nibh id amet dolor massa malesuada augue elementum. Nulla vestibulum tortor lobortis tincidunt id non. Ac a at faucibus habitasse vitae gravida arcu ut.
                  </p>
                  <div className={cardStylesGal.eventLink}>
                    <span className={cardStylesGal.linkText}>
                      <span className={cardStylesGal.linkLabel}>Ссылка на мероприятие: </span>
                      <span className={cardStylesGal.linkUrl}>Pellentesque in vitae pellentesque</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Final Ad Block */}
              <div className={cardStylesGal.adBlock}>
                <div className={cardStylesGal.adContent}>
                  <span className={cardStylesGal.adText}>Сменяющийся видеоряд/картинка с видом Абхазии/реклама</span>
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