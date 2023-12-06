import {Route, Routes} from 'react-router-dom';
import HistoryRouter from './history-route/history-route';
import browserHistory from '../browser-history';
import {AppRoute} from '../const';
import PrivateRoute from './private-route/private-route';
import {HelmetProvider} from 'react-helmet-async';
import { useAppSelector } from '../hooks/redux-hooks';
import MainPage from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import NotFound from '../pages/not-found/not-found';
import { CITIES } from '../const';
import ScrollToTop from './scroll-top/scroll-top';
import Spinner from './spinner/spinner';
import { fetchOffers, checkAuthAction } from '../store/api-actions';
import { store } from '../store';
import RedirectToMain from './redirect-to-main/redirect-to-main';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffers());

export default function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.offers.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop>
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} >
              {CITIES.map((city : string) => (
                <Route
                  key={city}
                  path={city}
                  element={<MainPage />}
                >
                </Route>
              ))}
            </Route>
            <Route
              path={AppRoute.Login}
              element={
                <RedirectToMain>
                  <Login />
                </RedirectToMain>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer}>
              <Route path={':id'} element={<Offer />}/>
            </Route>
            <Route
              path={AppRoute.Error}
              element={<NotFound />}
            />
            <Route path='spinner' element={<Spinner />} />
          </Routes>
        </ScrollToTop>
      </HistoryRouter>
    </HelmetProvider>
  );
}
