import { City } from './city';
import { Host } from './host';
import { Location } from './location';
import { Comment } from './comment';

export type OfferType = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: string[];
    host: Host;
    images: string[];
    maxAdults: number;
    comments: Comment[];
    previewImage: string;
}
