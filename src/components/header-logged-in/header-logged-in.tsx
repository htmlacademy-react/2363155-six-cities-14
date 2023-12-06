import { Link, useLocation, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { logoutAction, getCurrentUserData, fetchFavorites, fetchOffers, fetchCurrentOffer} from '../../store/api-actions';
import { useEffect } from 'react';
import { clearFavorites } from '../../store/slices/offers';

export default function HeaderLoggedIn () {
  const location = useLocation();
  const userData = useAppSelector((state) => state.user.userData);
  const favorites = useAppSelector((state) => state.offers.favoriteOffers);
  const dispatch = useAppDispatch();
  const {id: offerId} = useParams();

  useEffect(() => {
    dispatch(getCurrentUserData());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logoutAction()).then(() => {
      dispatch(clearFavorites());
      dispatch(fetchOffers());
      if (offerId) {
        dispatch(fetchCurrentOffer(offerId));
      }
    });
  };

  return (
    <>
      <li className="header__nav-item user">
        <Link
          to={AppRoute.Favorites}
          className="header__nav-link header__nav-link--profile"
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
            {userData.avatarUrl &&
            <img src={userData.avatarUrl}></img>}
          </div>
          <span className="header__user-name user__name">{userData.email}</span>
          <span className="header__favorite-count">{favorites.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          onClick={handleLogOut}
          to={location.pathname}
          className="header__nav-link header__nav-link--profile"
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}
