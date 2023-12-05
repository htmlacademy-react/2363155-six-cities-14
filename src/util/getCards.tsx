import { Offer } from '../types/offer';
import Card from '../components/card/card';

export const getCards = (offers: Offer[]) => offers.map((offer) => <Card {...offer} key={offer.id} />);
