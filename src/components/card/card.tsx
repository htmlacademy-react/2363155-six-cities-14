import { OfferType } from '../../types/offer-type';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import cn from 'classnames';

type CardProps = {
  offer: OfferType;
  onCardHover?: (offerId: string | null) => void;
  isMainPage?: boolean;
  isFavoritesPage?: boolean;
  isOfferPage?: boolean;
}

export default function Card ({offer, onCardHover, isMainPage = true, isFavoritesPage, isOfferPage}: CardProps): JSX.Element {
  const isPremium = 'Premium';
  const ratingPrecentage = Math.round((offer.rating * 100) / 5);
  const offerId: string = `/offer/${offer.id}`;

  function handleMouseEnter() {
    onCardHover?.(offer.id);
  }

  function handleMouseLeave() {
    onCardHover?.(null);
  }

  const cardClass = cn('place-card', {
    'cities__card': isMainPage,
    'favorites__card': isFavoritesPage,
    'near-places__card': isOfferPage,
  });

  const imageWrapperClass = cn('place-card__image-wrapper', {
    'cities__image-wrapper': isMainPage,
    'favorites__image-wrapper': isFavoritesPage,
  });

  const favBtnClass = cn('place-card__bookmark-button', 'button', {
    'place-card__bookmark-button--active': offer.isFavorite,
  });

  return (
    <article
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={offer.isPremium ? 'place-card__mark' : ''}>
        <span>{offer.isPremium && isPremium}</span>
      </div>
      <div className={imageWrapperClass}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavoritesPage ? 150 : 260}
            height={isFavoritesPage ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€${offer.price}`}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={favBtnClass}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingPrecentage}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerId}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{`${offer.type[0].toUpperCase()}${offer.type.slice(1)}`}</p>
      </div>
    </article>
  );
}
