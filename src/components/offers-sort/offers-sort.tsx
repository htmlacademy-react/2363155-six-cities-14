import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import cn from 'classnames';
import { useState } from 'react';
import { offerSlice } from '../../store/slices/offers';

export default function OffersSort() {
  const sortingOptions = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const optionsClassName = cn('places__options', 'places__options--custom', {
    'places__options--opened': isOptionsOpened,
  });
  const activeOption = useAppSelector((store) => store.offers.sortingOption);
  const dispatch = useAppDispatch();
  const handleOptionClick = (state: string) => {
    dispatch(offerSlice.actions.changeSortOption(state));
    setIsOptionsOpened(!isOptionsOpened);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOptionsOpened(!isOptionsOpened)}
        style={{fontSize: '13px', paddingLeft: '10px'}}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={optionsClassName}>
        {sortingOptions.map((option) =>(
          <li
            key={option}
            className={option === activeOption ? 'places__option places__option--active' : 'places__option'}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        )
        )}
      </ul>
    </form>
  );
}
