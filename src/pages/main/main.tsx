import CityCards from '../../components/cities-cards/cities-cards';
import { OfferType } from '../../types/offer-type';
import Logo from '../../components/logo/logo';
import CityFilters from '../../components/city-filters/city-filters';
import MainNavigation from '../../components/main-navigation/main-navigation';

type MainPageProps = {
  data: OfferType[];
}
export default function MainPage ({data} : MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
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
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityFilters />
          </section>
        </div>
        <div className="cities">
          <CityCards offers={data} />
        </div>
      </main>
    </div>
  );
}
