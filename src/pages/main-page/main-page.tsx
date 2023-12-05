import CitiesInfo from '../../components/layout/cities-info';
import CitiesNav from '../../components/layout/cities-nav';
import CityBoard from '../../components/layout/city-board';
import {Offer} from '../../types/types';

type MainProps = {
  offers: Offer[];
}

function MainPage({offers}: MainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <CitiesInfo/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesNav/>
        <CityBoard offers={offers}/>
      </main>
    </div>
  );
}

export default MainPage;
