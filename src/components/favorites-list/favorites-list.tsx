import Card from '../card/card';
import { OfferType } from '../../types/offer-type';

type FavoritesListProps = {
  favoriteOffers: OfferType[];
}

export default function FavoritesList({favoriteOffers} : FavoritesListProps) {
  const sortedFavorites = favoriteOffers.reduce<{[key:string] : OfferType[]}>((acc, offer) => {
    if (!Object.hasOwn(acc, offer.city.name)) {
      acc[offer.city.name] = [];
    }
    acc[offer.city.name].push(offer);
    return acc;
  }, {});

  return (
    <ul className="favorites__list">
      {Object.entries(sortedFavorites).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer: OfferType) => <Card offer={offer} key={offer.id} isMainPage={false} isFavoritesPage />)}
          </div>
        </li>
      ))}
    </ul>
  );
}
