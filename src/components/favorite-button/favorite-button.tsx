import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { getAuthStatus } from '../../store/slices/selectors';
import { AuthorizationStatus } from '../../const';
import { setIsFavorite} from '../../store/api-actions';
import { FavoriteServerStatus } from '../../const';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  isPlaceCard?: boolean;
  isOfferCard?: boolean;
};

enum IconSize {
  PlaceCardWidth = 18,
  PlaceCardHeight = 19,
  OfferCardWidth = 31,
  OfferCardHeight = 33,
}

export default function FavoriteButton({offerId, isFavorite, isPlaceCard = true, isOfferCard}: FavoriteButtonProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const iconWidth = isPlaceCard ? IconSize.PlaceCardWidth : IconSize.OfferCardWidth;
  const iconHeight = isPlaceCard ? IconSize.PlaceCardHeight : IconSize.OfferCardHeight;

  const favBtnClass = cn('button', {
    'place-card__bookmark-button--active': isFavorite && isPlaceCard,
    'place-card__bookmark-button': isPlaceCard,
    'offer__bookmark-button--active': isFavorite && isOfferCard,
    'offer__bookmark-button': isOfferCard,
  });

  const favIconClass = cn({
    'place-card__bookmark-icon': isPlaceCard,
    'offer__bookmark-icon': isOfferCard,
  });

  const handleFavoriteButtonClick = () => {
    if (authStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }
    if (isFavorite) {
      dispatch(setIsFavorite({offerId, status: FavoriteServerStatus.Delete}));
    } else {
      dispatch(setIsFavorite({offerId, status: FavoriteServerStatus.Add}));
    }
  };

  return (
    <button
      className={favBtnClass}
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg
        className={favIconClass}
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}
