'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsPitsunda.module.scss';

const restaurants = [
    {
        id: 1,
        name: 'Апсара',
        address: 'Гагрский район, Пицунда',
        addressLink: 'https://yandex.com/maps/-/CDxtjOMo',
        workingHours: 'с 10:00 до 00:00',
        image: '/assets/RestaurantsPitsunda1.jpg',
        phone: null,
        nameLink: null,
        website: null,
    },
    {
        id: 2,
        name: 'Амшын',
        website: 'https://amshinrestoran.ru/',
        address: 'Гагрский район, Пицунда, Набережная Кипарисовая аллея',
        addressLink: 'https://yandex.com/maps/-/CDxtjSLF',
        phone: '+7 (940) 711-27-77',
        workingHours: 'с 10:00 до 00:00',
        image: '/assets/RestaurantsPitsunda2.jpg',
        nameLink: null,
    },
    {
        id: 3,
        name: 'XL',
        nameLink: 'https://www.instagram.com/cafe__xl__pitsunda/',
        address: 'Пицунда, ул. Гочуа, 54',
        addressLink: 'https://yandex.com/maps/-/CDxtrKpN',
        phone: '+7 (940) 961-67-00',
        workingHours: 'с 08:00 до 22:00',
        image: '/assets/RestaurantsPitsunda3.jpg',
        website: null,
    },
    {
        id: 4,
        name: 'Чегем-Terrace',
        address: 'Пицунда, Кипарисовая аллея, 2',
        addressLink: 'https://yandex.com/maps/-/CDxtr2yc',
        phone: '+7 (940) 710-42-22',
        workingHours: 'с 09:00 до 23:00',
        image: '/assets/RestaurantsPitsunda4.jpg',
        nameLink: null,
        website: null,
    },
    {
        id: 5,
        name: 'Веранда',
        address: 'Пицунда, Кипарисовая аллея, 11',
        addressLink: 'https://yandex.com/maps/-/CDxtvYJL',
        workingHours: 'с 08:00 до 22:00',
        image: '/assets/RestaurantsPitsunda5.jpg',
        phone: null,
        nameLink: null,
        website: null,
    },
    {
        id: 6,
        name: 'Арго',
        nameLink: 'https://instagram.com/_kafe_argo?r=nametag',
        address: 'Пицунда, ул. Гочуа, 51',
        addressLink: 'https://yandex.com/maps/-/CDxtvNov',
        phone: '+7 (940) 728-88-77',
        workingHours: 'с 10:00 до 00:00',
        image: '/assets/RestaurantsPitsunda6.jpg',
        website: null,
    },
];

const RestaurantsPitsunda: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>Пицунда: рестораны и кафе</h1>
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
                                <h2 className={`${styles.restaurantName} ${restaurant.nameLink ? styles.clickable : ''}`}>
                                    {restaurant.nameLink ? (
                                        <a href={restaurant.nameLink} target="_blank" rel="noopener noreferrer">{restaurant.name}</a>
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

export default RestaurantsPitsunda;
