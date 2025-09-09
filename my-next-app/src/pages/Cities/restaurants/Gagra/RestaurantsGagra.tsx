'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsGagra.module.scss';

const restaurants = [
    {
        id: 1,
        name: 'Абаата',
        name_link: 'https://www.instagram.com/abaata_rest?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        address: 'Проспект Владислава Ардзинба дом 115, Gagra',
        addressLink: 'https://yandex.ru/maps/-/CDW7IW8~',
        phone: '+7 (940) 737-79-79',
        workingHours: 'с 08:00 до 23:00',
        image: '/assets/RestaurantsGagra1.jpg',
    },
    {
        id: 2,
        name: 'Веранда',
        name_link: 'https://www.instagram.com/verandapark_gagra?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        address: 'Гагра, микрорайон Старая Гагра',
        addressLink: 'https://yandex.ru/maps/-/CDWKA-Oi',
        phone: '+7 (940) 991-39-99',
        workingHours: 'с 11:00 до 00:00',
        image: '/assets/RestaurantsGagra2.jpg',
    },
    {
        id: 3,
        name: 'Гагрипш',
        name_link: 'https://www.instagram.com/restoran_gagripsh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        address: 'Гагра, микрорайон Старая Гагра',
        addressLink: 'https://yandex.ru/maps/-/CDWKERN0',
        phone: '+7 (940) 720-00-01',
        workingHours: 'с 11:00 до 00:00',
        image: '/assets/RestaurantsGagra3.jpg',
    },
    {
        id: 4,
        name: 'Sunrest',
        address: 'ул. Абазгаа, 65, Гагра',
        addressLink: 'https://yandex.ru/maps/-/CDWK4T2i',
        phone: '+7 (940) 728-18-88',
        workingHours: 'с 10:00 до 23:00',
        image: '/assets/RestaurantsGagra4.jpg',
    },
    {
        id: 5,
        name: 'Пирс',
        address: 'Гагра, микрорайон Старая Гагра, проспект Ардзинба парк – отель Амра',
        addressLink: 'https://yandex.ru/maps/-/CDWx5P9O',
        workingHours: 'с 10:00 до 00:00',
        image: '/assets/RestaurantsGagra5.jpg',
    },
    {
        id: 6,
        name: 'Ресторан Амза',
        name_link: 'https://www.instagram.com/_restaurant_by_amza_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        address: 'ул. Абазгаа, 50',
        addressLink: 'https://yandex.ru/maps/-/CDcIeCK5',
        phone: '+7(940) 917-77-21',
        workingHours: 'с 10:00 до 00:00',
        image: '/assets/RestaurantsGagra6.jpg',
    },
    {
        id: 7,
        name: 'Амра Ресторан',
        name_link: 'https://www.instagram.com/amraparkh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        website: 'https://amrapark-hotel-spa.ru/restaurants/',
        address: 'просп. Ардзинба, 34, Гагра',
        addressLink: 'https://yandex.ru/maps/-/CDcImDOR',
        phone: '+7 940 999 19 08',
        workingHours: 'с 10:00 до 00:00',
        image: '/assets/RestaurantsGagra7.jpg',
    },
    {
        id: 8,
        name: 'Чегем',
        address: 'ул. Абазгаа, 54/2, Гагра',
        addressLink: 'https://yandex.ru/maps/-/CDcIy0o8',
        phone: '+7 (940) 710-24-44',
        workingHours: 'с 09:00 до 23:00',
        image: '/assets/RestaurantsGagra8.jpg',
    },
    {
        id: 9,
        name: 'Мокко',
        name_link: 'https://www.instagram.com/mokko099?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        address: 'ул. Демерджипа, 35, Гагра',
        addressLink: 'https://yandex.ru/maps/-/CDcIRWMU',
        phone: '+7 (940) 990-25-00\n+7 (940) 735-97-97',
        workingHours: 'с 09:00 до 00:00',
        image: '/assets/RestaurantsGagra9.jpg',
    },
    {
        id: 10,
        name: 'Апарпыл',
        address: 'пгт Цандрыпш, Гагрский район, Абхазия, Октябрьская улица, 239а',
        addressLink: 'https://yandex.ru/maps/105957/gagra-district/house/YEkYdgJiTkEEQFppfX92eHRiZw==/',
        phone: '+79409216060',
        workingHours: 'с 11:00 до 23:00',
        image: '/assets/RestaurantsGagra10.jpg',
    },
];

const RestaurantsGagra: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>Гагра: рестораны и кафе</h1>
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

export default RestaurantsGagra;
