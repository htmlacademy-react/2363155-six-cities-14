import { OfferType } from '../../types/offer-type';
import Card from '../card/card';
import {useState} from 'react';
import Map from '../map/map';
import { CITIES_MAP } from '../../mocks/cities';
import OffersSort from '../offers-sort/offers-sort';

type CardListProps = {
  offers: OfferType[];
  activeCity: string;
}

export default function CityCards ({offers, activeCity}: CardListProps) {
  const [hoveredOfferId, setHoveredOfferId] = useState<number | null>(null);
  function handleCardHover(offerId: number | null) {
    setHoveredOfferId(offerId);
  }
  const cityLocation = CITIES_MAP.find((city) => city.name === activeCity)?.location;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} {offers.length === 1 ? 'place' : 'places'} to stay in {activeCity}</b>
        {/* <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
      Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li
              className="places__option places__option--active"
              tabIndex={0}
            >
        Popular
            </li>
            <li className="places__option" tabIndex={0}>
        Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
        Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
        Top rated first
            </li>
          </ul>
        </form> */}
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
