import { OfferType } from '../../types/offer-type';
import Card from '../card/card';
import {useState} from 'react';
import Map from '../map/map';
import { CITIES_MAP } from '../../mocks/cities';

type CardListProps = {
  offers: OfferType[];
}

export default function CityCards ({offers}: CardListProps) {
  const [hoveredOfferId, setHoveredOfferId] = useState<number | null>(null);
  function handleCardHover(offerId: number | null) {
    setHoveredOfferId(offerId);
  }
  const activeCity = CITIES_MAP[0];

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">312 places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
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
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer : OfferType) => <Card offer={offer} onCardHover={handleCardHover} key={offer.id} />)}
        </div>
      </section>
      <div className="cities__right-section">
        <Map offers={offers} location={activeCity.location} specialOfferId={hoveredOfferId} isMainPage/>
      </div>
    </div>
  );
}
