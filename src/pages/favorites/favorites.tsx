import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import MainNavigation from '../../components/main-navigation/main-navigation';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useAppSelector } from '../../hooks/redux-hooks';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import cn from 'classnames';
export default function Favorites (): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.offers.favoriteOffers);

  const pageClass = cn('page', {
    'page--favorites-empty': favoriteOffers.length <= 0
  });

  return (
    <div className={pageClass}>
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
      {favoriteOffers.length > 0 ? <FavoritesList favoriteOffers={favoriteOffers} /> : <FavoritesEmpty />}
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
