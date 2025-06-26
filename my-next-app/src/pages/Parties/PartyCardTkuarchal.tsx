import React from 'react';
import cardStyles from './PartyCardTkuarchal.module.scss';

const PartyCardTkuarchal: React.FC = () => {
  return (
    <section className={cardStyles.partyCard}>
      {/* City Image */}
      <div className={cardStyles.cityImageSection}></div>

      {/* Content Section */}
      <div className={cardStyles.contentSection}>
        {/* City Title */}
        <div className={cardStyles.cityTitle}>
          <h2 className={cardStyles.cityTitleText}>Ткуарчал</h2>
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
              <span className={cardStyles.locationText}>г. Ткуарчал, Рижский проспект, дом 3</span>
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
              <span className={cardStyles.locationText}>г. Ткуарчал, Рижский проспект, дом 3</span>
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
              <span className={cardStyles.locationText}>г. Ткуарчал, Рижский проспект, дом 3</span>
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
  );
};

export default PartyCardTkuarchal; 