import React from 'react';
import cardStyles from './PartyCardOchamchira.module.scss';
import AdSlider from '@/components/AdSlider/AdSlider';

interface PartyEvent {
  id: number;
  title: string;
  date_info?: string;
  location?: string;
  description?: string;
  event_url?: string;
  order: number;
}

interface PartyCity {
  id: number;
  name: string;
  slug: string;
  city_image?: string;
  events: PartyEvent[];
  order: number;
}

interface PartyCardOchamchiraProps {
  city?: PartyCity;
}

const PartyCardOchamchira: React.FC<PartyCardOchamchiraProps> = ({ city }) => {
  const toImageUrl = (p?: string) => {
    if (!p) return '';
    return p.startsWith('http') ? p : `http://109.196.103.12:8000${p}`;
  };

  return (
    <section className={cardStyles.partyCard}>
      {/* City Image */}
      <div 
        className={cardStyles.cityImageSection}
        style={{
          backgroundImage: city?.city_image 
            ? `url('${toImageUrl(city.city_image)}')` 
            : undefined
        }}
      ></div>

      {/* Content Section */}
      <div className={cardStyles.contentSection}>
        {/* City Title */}
        <div className={cardStyles.cityTitle}>
          <h2 className={cardStyles.cityTitleText}>{city?.name || 'Очамчыра'}</h2>
        </div>

        {/* Events Container */}
        <div className={cardStyles.eventsContainer}>
          {city?.events && city.events.length > 0 ? (
            city.events
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((event) => (
                <div key={event.id} className={cardStyles.eventItem}>
                  <div className={cardStyles.eventHeader}>
                    <div className={cardStyles.eventArrow}></div>
                    <h3 className={cardStyles.eventTitle}>{event.title}</h3>
                  </div>
                  {event.date_info && (
                    <div className={cardStyles.eventDate}>
                      <div className={cardStyles.calendarIcon}></div>
                      <span className={cardStyles.dateText}>{event.date_info}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className={cardStyles.eventLocation}>
                      <div className={cardStyles.locationIcon}></div>
                      <span className={cardStyles.locationText}>{event.location}</span>
                    </div>
                  )}
                  {event.description && (
                    <div className={cardStyles.eventDescription}>
                      <h4 className={cardStyles.descriptionTitle}>О событии</h4>
                      <p className={cardStyles.descriptionText} style={{ whiteSpace: 'pre-line' }}>
                        {event.description}
                      </p>
                      {event.event_url && (
                        <div className={cardStyles.eventLink}>
                          <span className={cardStyles.linkText}>
                            <span className={cardStyles.linkLabel}>Ссылка на мероприятие: </span>
                            <a 
                              href={event.event_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={cardStyles.linkUrl}
                            >
                              {event.event_url}
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div style={{ 
              color: '#999', 
              fontSize: 'clamp(24px, 6vw, 64px)', 
              textAlign: 'center', 
              padding: 'clamp(60px, 15vw, 200px) 20px',
              lineHeight: '1.2'
            }}>
              Пока нет информации
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartyCardOchamchira; 