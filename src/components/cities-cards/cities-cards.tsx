import { OfferType } from '../../types/offer-type';
import Card from '../card/card';
import {useState} from 'react';
import Map from '../map/map';
import { CITIES_MAP } from '../../mocks/cities';
import OffersSort from '../offers-sort/offers-sort';
import { useAppSelector } from '../../hooks/redux-hooks';

type CardListProps = {
  offers: OfferType[];
}

export default function CityCards ({offers}: CardListProps) {
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);
  function handleCardHover(offerId: string | null) {
    setHoveredOfferId(offerId);
  }
  const activeCity = useAppSelector((store) => store.city.city);
  const cityLocation = CITIES_MAP.find((city) => city.name === activeCity)?.location;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {activeCity}</b>
        <OffersSort />
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer : OfferType) => <Card offer={offer} onCardHover={handleCardHover} key={offer.id} />)}
        </div>
      </section>
      <div className="cities__right-section">
        {cityLocation && <Map offers={offers} location={cityLocation} specialOfferId={hoveredOfferId} isMainPage/>}
      </div>
    </div>
  );
}
