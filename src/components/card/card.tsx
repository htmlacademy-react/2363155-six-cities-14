import { OfferType } from '../../types/offer-type';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import cn from 'classnames';
import FavoriteButton from '../favorite-button/favorite-button';
import { getRating } from '../../util';

type CardProps = {
  offer: OfferType;
  onCardHover?: (offerId: string | null) => void;
  isMainPage?: boolean;
  isFavoritesPage?: boolean;
  isOfferPage?: boolean;
}

export default function Card ({offer, onCardHover, isMainPage = true, isFavoritesPage, isOfferPage}: CardProps): JSX.Element {
  const isPremium = 'Premium';
  const ratingPrecentage = getRating(offer.rating);
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
          <FavoriteButton offerId={offer.id} isFavorite={offer.isFavorite}/>
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
