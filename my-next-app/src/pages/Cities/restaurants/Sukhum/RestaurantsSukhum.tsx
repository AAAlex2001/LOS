'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsSukhum.module.scss';

const restaurants = [
    {
        id: 1,
        name: 'Анасып',
        address: 'Сухум, ул. Акиртава, 6',
        addressLink: 'https://yandex.com/maps/-/CDtHfC8h',
        phone: '+7 (940) 969-75-69',
        workingHours: 'с 09:00 до 23:00',
        image: '/assets/RestaurantsSukhum1.jpg',
    },
    {
        id: 2,
        name: 'Дольче Вита',
        name_link: 'https://www.instagram.com/_dolce_vita_restaurant_/?igshid=MXdrdWd3NXl3NWNtMw%3D%3D',
        address: 'Сухум, Красноармейский тупик, 3',
        addressLink: 'https://yandex.com/maps/-/CDtHjB5I',
        phone: '+7 (940) 733-35-33',
        workingHours: 'с 12:00 до 01:00',
        image: '/assets/RestaurantsSukhum2.jpg',
    },
    {
        id: 3,
        name: 'Ерцаху',
        name_link: 'https://www.instagram.com/restaurant_ertsahu',
        address: 'Сухум, наб. Махаджиров, 1',
        addressLink: 'https://yandex.com/maps/-/CDtHnEnQ',
        phone: '+7 (940) 740-18-18',
        workingHours: 'с 12:00 до 00:00',
        image: '/assets/RestaurantsSukhum3.jpg',
    },
    {
        id: 4,
        name: 'Леон',
        name_link: 'http://instagram.com/hotel_restaurant_leon',
        website: 'https://leonhotel.net/',
        address: 'Сухум, наб. Махаджиров, 6',
        addressLink: 'https://yandex.com/maps/-/CDtHzL-k',
        phone: '+7 (940) 707-11-00',
        workingHours: 'с 08:30 до 23:00',
        image: '/assets/RestaurantsSukhum4.jpg',
    },
    {
        id: 5,
        name: 'Амгьал',
        name_link: 'https://www.instagram.com/amgyal?igsh=cmZkd252djVudTdn',
        address: 'Сухум, просп. Аиааира, 46',
        addressLink: 'https://yandex.com/maps/-/CDtLAK5l',
        phone: '+7 (940) 750-07-50, +7 (940) 950-09-50',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsSukhum5.jpg',
    },
    {
        id: 6,
        name: 'Вершина',
        name_link: 'http://restoran.vershina.tilda.ws/',
        address: 'Сухум, просп. Леона, 2',
        addressLink: 'https://yandex.com/maps/-/CDtLMOnJ',
        phone: '+7 (940) 788-80-80',
        workingHours: 'с 08:00 до 23:00',
        image: '/assets/RestaurantsSukhum6.jpg',
    },
    {
        id: 7,
        name: 'Ресторан Абхазия',
        name_link: 'https://www.instagram.com/cafe.restaurant.abkhazia',
        address: 'Сухум, просп. Леона, 1',
        addressLink: 'https://yandex.com/maps/-/CDtLQH8h',
        phone: '+7 (940) 711-47-20, +7 (940) 943-55-55',
        workingHours: 'с 10:00 до 01:00',
        image: '/assets/RestaurantsSukhum7.jpg',
    },
    {
        id: 8,
        name: 'Нартаа',
        address: 'Сухум, наб. Махаджиров, 52',
        addressLink: 'https://yandex.com/maps/-/CDtLaZ1J',
        workingHours: 'с 10:00 до 23:00',
        image: '/assets/RestaurantsSukhum8.jpg',
    },
    {
        id: 9,
        name: 'Бургерпорт',
        address: 'Сухум, наб. Махаджиров, 66',
        addressLink: 'https://yandex.com/maps/-/CDtLeTnc',
        phone: '+7 (940) 737-00-88',
        workingHours: 'с 09:00 до 22:00',
        image: '/assets/RestaurantsSukhum9.jpg',
    },
    {
        id: 10,
        name: 'SMOG',
        name_link: 'https://www.instagram.com/smog_hookah_bar',
        address: 'Сухум, ул. Генерала В.Г. Аршба, 1',
        addressLink: 'https://yandex.com/maps/-/CDtLqMMF',
        phone: '+7 (940) 799-09-09',
        workingHours: 'с 12:00 до 01:00',
        image: '/assets/RestaurantsSukhum10.jpg',
    },
    {
        id: 11,
        name: 'Abi',
        name_link: 'https://instagram.com/abi_sukhum?igshid=MzRlODBiNWFlZA==',
        address: 'Сухум, наб. Махаджиров, 70',
        addressLink: 'https://yandex.com/maps/-/CDtLqSm2',
        phone: '+7 (940) 938-08-00',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsSukhum25.jpg',
    },
    {
        id: 12,
        name: 'Vinograd',
        name_link: 'https://www.instagram.com/cafe__vinograd?igsh=eXE5ZG4yMnR0cXE5',
        address: 'Сухум, наб. Махаджиров, 1А',
        addressLink: 'https://yandex.com/maps/-/CDxeYXzZ',
        phone: '+7 (940) 998-10-08',
        workingHours: 'с 10:00 до 20:00',
        image: '/assets/RestaurantsSukhum11.jpg',
    },
    {
        id: 13,
        name: 'Soho',
        name_link: 'https://instagram.com/sohosukhum?igshid=8dqp2yf603wc',
        address: 'Сухум, наб. Махаджиров, 3',
        addressLink: 'https://yandex.com/maps/-/CDxe4Pyz',
        phone: '+7 (940) 921-77-71',
        workingHours: 'с 09:00 до 00:00',
        image: '/assets/RestaurantsSukhum12.jpg',
    },
    {
        id: 14,
        name: 'Дэм',
        name_link: 'https://www.instagram.com/sukhumdem?igsh=bzdyb3BudXRzM2Q4',
        address: 'Сухум, наб. Диоскуров, 4',
        addressLink: 'https://yandex.com/maps/-/CDxe502T',
        phone: '+7 (940) 999-39-59',
        workingHours: 'с 08:30 до 23:00',
        image: '/assets/RestaurantsSukhum13.jpg',
    },
    {
        id: 15,
        name: 'Big Buffet',
        name_link: 'https://instagram.com/big_buffet_/',
        address: 'Сухум, ул. Конфедератов, 3',
        addressLink: 'https://yandex.com/maps/-/CDxeN6Ju',
        phone: '+7 (940) 956-20-90',
        workingHours: 'с 09:00 до 23:00',
        image: '/assets/RestaurantsSukhum14.jpg',
    },
    {
        id: 16,
        name: 'Bristol Café',
        name_link: 'https://www.instagram.com/bristol.cafe.sukhum',
        address: 'Сухум, ул. Конфедератов, 5',
        addressLink: 'https://yandex.com/maps/-/CDxeVLj7',
        phone: '+7 (940) 912-12-12',
        workingHours: 'с 09:00 до 22:00',
        image: '/assets/RestaurantsSukhum15.jpg',
    },
    {
        id: 17,
        name: 'Appetit',
        name_link: 'https://www.instagram.com/cafe_appetit/',
        address: 'Сухум, ул. Конфедератов, 29',
        addressLink: 'https://yandex.com/maps/-/CDxeZKME',
        phone: '+7 (940) 777-42-42',
        workingHours: 'с 09:00 до 23:00',
        image: '/assets/RestaurantsSukhum16.jpg',
    },
    {
        id: 18,
        name: 'Rossini Pizza&Pasta',
        name_link: 'https://www.instagram.com/rossini_trattoria?igsh=MWFrNmdpYXhkbWw4dw==',
        address: 'Сухум, ул. Пушкина, 16',
        addressLink: 'https://yandex.com/maps/-/CDxebVOG',
        phone: '+7 (940) 737-78-78',
        workingHours: 'с 11:00 до 22:00',
        image: '/assets/RestaurantsSukhum26.jpg',
    },
    {
        id: 19,
        name: 'Мухус',
        name_link: 'https://www.instagram.com/hinkalnaya_muhus/',
        address: 'Сухум, ул. Фазиля Искандера, 1',
        addressLink: 'https://yandex.com/maps/-/CDxen43F',
        phone: '+7 (940) 725-35-90',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsSukhum17.jpg',
    },
    {
        id: 20,
        name: 'Ковчег',
        name_link: 'https://www.instagram.com/kovcheg__restaurant/',
        address: 'Сухум, ул. Эшба, 166',
        addressLink: 'https://yandex.com/maps/-/CDxen2JE',
        phone: '+7 (940) 747-37-37, +7 (940) 748-37-37',
        workingHours: 'с 11:00 до 23:00',
        image: '/assets/RestaurantsSukhum18.jpg',
    },
    {
        id: 21,
        name: 'Royal Xinkal',
        name_link: 'https://instagram.com/royal_hinkal',
        address: 'Сухум, ул. Героев-Пограничников, 22',
        addressLink: 'https://yandex.com/maps/-/CDxerCns',
        phone: '+7 (940) 700-20-00',
        workingHours: 'с 10:00 до 22:00',
        image: '/assets/RestaurantsSukhum19.jpg',
    },
    {
        id: 22,
        name: 'Гастробар Маяк',
        name_link: 'https://www.instagram.com/mayak_gastrobar/',
        address: 'г.Сухум ул. Адлейба Б. 88',
        phone: '+79407270555',
        workingHours: 'с 12:00 до 23:00',
        image: '/assets/RestaurantsSukhum20.jpg',
    },
    {
        id: 23,
        name: 'Хорошее место',
        name_link: 'https://www.instagram.com/good_place_sukhum/',
        address: 'г. Сухум ул.Адлейба 1А ( Маякский поворот)',
        phone: '+79409790707',
        workingHours: 'с 10:00 до 23:00',
        image: '/assets/RestaurantsSukhum21.jpg',
    },
    {
        id: 24,
        name: 'Ресторан Chaika',
        address: 'г.Сухум, Кодорское шоссе',
        phone: '+794098181',
        workingHours: 'с 10:00 до 23:00',
        image: '/assets/RestaurantsSukhum22.jpg',
    },
    {
        id: 25,
        name: 'Ресторан Loona',
        address: 'г. Сухум, сквер И. Когония',
        addressLink: 'https://2gis.ru/abkhazia/firm/70000001079577128',
        phone: '+79409529907',
        workingHours: 'с 09:00 до 23:00',
        image: '/assets/RestaurantsSukhum23.jpg',
    },
    {
        id: 26,
        name: 'Чегем порт Сухум',
        address: 'г.Сухум Набережная Махаджиров 66',
        phone: '+79409600080',
        workingHours: 'с 10:00 до 23:00',
        image: '/assets/RestaurantsSukhum24.jpg',
    },
];

const RestaurantsSukhum: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.titleSection}>
                    <h1 className={styles.mainTitle}>Сухум: рестораны и кафе</h1>
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

export default RestaurantsSukhum;
