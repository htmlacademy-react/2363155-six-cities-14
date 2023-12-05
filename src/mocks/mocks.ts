import {Offer} from '../types/types';
import {CITIES, TYPES, DESCRIPTIONS, TITLES} from '../const';
import {getRandomInt, getRandomArrayElement, getRandomFloat} from '../utils/common';

function getCityOffer(index: number): Offer {
  return {
    bedrooms: getRandomInt(0, 20),
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: getRandomInt(0, 20)
      },
      name: getRandomArrayElement(CITIES),
    },
    description: getRandomArrayElement(DESCRIPTIONS),
    goods: [
      'Heating'
    ],
    host: {
      avatarUrl: `https://loremflickr.com/248/152?${getRandomInt(1, 400)}`,
      id: index,
      isPro: !!getRandomInt(0, 1),
      name: 'Angelina',
    },
    id: index,
    images: [
      `https://loremflickr.com/248/152?${getRandomInt(1, 400)}`
    ],
    isFavorite: !!getRandomInt(0, 1),
    isPremium: !!getRandomInt(0, 1),
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: getRandomInt(0, 20)
    },
    maxAdults: getRandomInt(0, 10),
    previewImage: `https://loremflickr.com/248/152?${getRandomInt(1, 400)}`,
    price: getRandomInt(100, 2000),
    rating: getRandomFloat(1, 5, 1),
    title: getRandomArrayElement(TITLES),
    type: getRandomArrayElement(TYPES)
  };
}

const offers: Offer[] = Array.from({length: 5}, (_, index: number): Offer => getCityOffer(index + 1));

export default offers;

