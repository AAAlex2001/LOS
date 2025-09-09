'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsOchamchira.module.scss';

const restaurants = [
    {
        id: 1,
        name: 'Кафе',
        address: 'Очамчира',
        addressLink: 'https://yandex.com/maps/-/CDxd4P-y',
        phone: '+7 (940) 996-28-48',
        workingHours: 'с 09:00 до 00:00',
        image: '/assets/RestaurantsOchamchira1.jpg',
        name_link: null,
        website: null,
    },
    {
        id: 2,
        name: 'Акьафурта',
        name_link: 'https://www.instagram.com/akiafurta_ochamchira',
        address: 'Очамчыра, ул. Баграта Шинкуба, 41',
        addressLink: 'https://yandex.com/maps/-/CDxdaV4R',
        phone: '+7 (940) 927-55-12',
        workingHours: 'с 10:00 до 23:00',
        image: '/assets/RestaurantsOchamchira2.jpg',
        website: null,
    },
    {
        id: 3,
        name: 'Пиццерия',
        address: 'Очамчыра, ул. Леонтия Лабахуа, 64',
        addressLink: 'https://yandex.com/maps/-/CDxdaXyJ',
        workingHours: 'с 10:00 до 23:00',
        image: '/assets/RestaurantsOchamchira3.jpg',
        phone: null,
        name_link: null,
        website: null,
    },
    {
        id: 4,
        name: 'Breeze',
        address: 'Очамчыра, улица Джонуа',
        addressLink: 'https://yandex.com/maps/-/CDxdeBiz',
        phone: '+7 (940) 714-00-00',
        workingHours: 'с 08:00 до 20:00',
        image: '/assets/RestaurantsOchamchira4.jpg',
        name_link: null,
        website: null,
    },
    {
        id: 5,
        name: 'Alagamta',
        name_link: 'https://www.instagram.com/naala.kubrava?igsh=NzNhbWd4d3lvMm9j',
        address: 'Очамчыра, улица Владислава Ардзинба',
        addressLink: 'https://yandex.com/maps/-/CDxdeW9p',
        phone: '+7 (940) 700-99-97',
        workingHours: 'с 09:00 до 21:00',
        image: '/assets/RestaurantsOchamchira5.jpg',
        website: null,
    },
];

const RestaurantsOchamchira: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>Очамчыра: рестораны и кафе</h1>
                </section>
                <section className={styles.cardsSection}>
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className={styles.restaurantCard}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    fill
                                    className={styles.restaurantImage}
                                />
                            </div>
                            <div className={styles.infoContainer}>
                                <h2 className={`${styles.restaurantName} ${restaurant.name_link ? styles.clickable : ''}`}>
                                    {restaurant.name_link ? (
                                        <a href={restaurant.name_link} target="_blank" rel="noopener noreferrer">{restaurant.name}</a>
                                    ) : (
                                        restaurant.name
                                    )}
                                </h2>
                                <div className={styles.infoBlock}>
                                    {restaurant.address &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Адрес:</span>
                                            <span className={`${styles.infoValue} ${restaurant.addressLink ? styles.addressLink : ''}`}>
                                                {restaurant.addressLink ? (
                                                    <a href={restaurant.addressLink} target="_blank" rel="noopener noreferrer">{restaurant.address}</a>
                                                ) : (
                                                    restaurant.address
                                                )}
                                            </span>
                                        </div>
                                    }
                                    {restaurant.phone &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Телефон:</span>
                                            <span className={styles.infoValue}>{restaurant.phone}</span>
                                        </div>
                                    }
                                    {restaurant.website &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Сайт:</span>
                                            <span className={styles.infoValue}>
                                                <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a>
                                            </span>
                                        </div>
                                    }
                                    {restaurant.workingHours &&
                                        <div className={styles.infoItem}>
                                            <span className={styles.infoLabel}>Часы работы:</span>
                                            <span className={styles.infoValue}>{restaurant.workingHours}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default RestaurantsOchamchira;
