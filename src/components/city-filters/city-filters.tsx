import {NavLink} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { changeCity } from '../../store/action';
import { CITIES } from '../../const';

export default function CityFilters () {
  const LINK_CLASS = 'locations__item-link tabs__item';
  const ACTIVE_CLASS = `${LINK_CLASS} tabs__item--active`;
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <NavLink
            to={`${AppRoute.Main}${city}`}
            className={({ isActive }) =>(isActive ? ACTIVE_CLASS : LINK_CLASS)}
            onClick={() => dispatch(changeCity(city))}
          >
            <span>{city}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
