import { AppRoute } from '../../const';
import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { DEFAULT_CITY } from '../../const';
import { citySlice } from '../../store/slices/city';

export default function Logo() {
  const dispatch = useAppDispatch();
  return (
    <Link className="header__logo-link" to={AppRoute.Main} onClick={() => dispatch(citySlice.actions.changeCity(DEFAULT_CITY))}>
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </Link>
  );
}
