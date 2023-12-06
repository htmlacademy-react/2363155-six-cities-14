import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import MainNavigation from '../../components/main-navigation/main-navigation';
import { OfferType } from '../../types/offer-type';
import FavoritesList from '../../components/favorites-list/favorites-list';

type FavoritesProps = {
  offers: OfferType[];
}
export default function Favorites ({offers} : FavoritesProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <MainNavigation />
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList favoriteOffers={favoriteOffers} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}
