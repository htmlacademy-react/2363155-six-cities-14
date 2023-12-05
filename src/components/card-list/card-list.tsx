import { OfferType } from '../../types/offer-type';
import Card from '../card/card';

type CardListProps = {
  offers: OfferType[];
}

export default function CardList ({offers}: CardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer : OfferType) => <Card {...offer} key={offer.id} />)}
    </div>
  );
}
