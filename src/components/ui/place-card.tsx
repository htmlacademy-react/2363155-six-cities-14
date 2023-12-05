import {Offer} from '../../types/types';

type PlaceProps = {
  offer: Offer;
}

function Premium(): JSX.Element {
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
}

function PlaceCard({offer}: PlaceProps): JSX.Element {
  const {
    images,
    isFavorite,
    isPremium,
    price,
    title,
    type } = offer;
  return (
    <>
      {isPremium && <Premium/>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          {images && <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place image"/>}
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={ `${'place-card__bookmark-button button'} ${isFavorite && 'place-card__bookmark-button--active'}` } type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: '80%'
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </>
  );
}

export default PlaceCard;
