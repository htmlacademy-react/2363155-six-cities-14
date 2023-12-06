import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/redux-hooks';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { logoutAction, getCurrentUserData, fetchFavorites } from '../../store/api-actions';
import { useEffect } from 'react';

export default function HeaderLoggedIn () {
  const userData = useAppSelector((state) => state.user.userData);
  const favorites = useAppSelector((state) => state.offers.favoriteOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUserData());
    dispatch(fetchFavorites());
  }, [dispatch]);

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
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to={'/'}
          className="header__nav-link header__nav-link--profile"
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}
