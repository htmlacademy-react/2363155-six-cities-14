import Card from '../card/card';
import { OfferType } from '../../types/offer-type';
import { useAppSelector } from '../../hooks/redux-hooks';
import Spinner from '../spinner/spinner';
import { RequestStatus } from '../../const';

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
  const loadingStatus = useAppSelector((state) => state.offers.isFavoriteDataLoading);

  if (loadingStatus === RequestStatus.Idle || loadingStatus === RequestStatus.Pending) {
    return (
      <Spinner />
    );
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
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
                  {cityOffers.map((offer: OfferType) =>
                    <Card offer={offer} key={offer.id} isMainPage={false} isFavoritesPage />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
