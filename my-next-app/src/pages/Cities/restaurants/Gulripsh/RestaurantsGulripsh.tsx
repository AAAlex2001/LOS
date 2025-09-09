'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsGulripsh.module.scss';

const restaurants = [
    {
        id: 1,
        name: 'Хурма',
        address: 'Гулрыпшский район, село Мачара',
        addressLink: 'https://yandex.com/maps/-/CDxHqS-e',
        phone: '+7 (940) 713-33-21',
        workingHours: 'с 10:00 до 00:00',
        image: '/assets/RestaurantsGulripsh1.jpg',
        name_link: null,
        website: null,
    },
    {
        id: 2,
        name: 'Апсхара',
        name_link: 'https://instagram.com/_apsxara_restoran_',
        address: 'Гулрыпшский район, поселок Тхубын',
        addressLink: 'https://yandex.com/maps/-/CDxHqDM7',
        workingHours: 'с 10:00 до 00:00',
        image: '/assets/RestaurantsGulripsh2.jpg',
        phone: null,
        website: null,
    },
    {
        id: 3,
        name: 'Ресторан',
        address: 'Гулрыпшский район, село Мерхеул',
        addressLink: 'https://yandex.com/maps/-/CDxHq-zo',
        workingHours: 'с 09:00 до 21:00',
        image: '/assets/RestaurantsGulripsh3.jpg',
        phone: null,
        name_link: null,
        website: null,
    },
    {
        id: 4,
        name: 'Мясниково',
        address: 'Гулрыпшский район, село Верхний Гулрыпш',
        addressLink: 'https://yandex.com/maps/-/CDxHuIp7',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsGulripsh4.jpg',
        phone: null,
        name_link: null,
        website: null,
    },
];

const RestaurantsGulripsh: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>Гулрыпш: рестораны и кафе</h1>
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

export default RestaurantsGulripsh;
