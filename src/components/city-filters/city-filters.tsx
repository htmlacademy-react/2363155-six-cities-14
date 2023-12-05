import {NavLink} from 'react-router-dom';
import { AppRoute } from '../../const';

export default function CityFilters () {
  const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
  const LINK_CLASS = 'locations__item-link tabs__item';
  const ACTIVE_CLASS = `${LINK_CLASS} tabs__item--active`;
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <NavLink to={`${AppRoute.Main}${city}`}
            className={({ isActive }) =>(isActive ? ACTIVE_CLASS : LINK_CLASS)}
          >
            <span>{city}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
