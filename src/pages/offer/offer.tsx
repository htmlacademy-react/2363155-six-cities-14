import {Helmet} from 'react-helmet-async';
import {Navigate} from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../../components/logo/logo';
import MainNavigation from '../../components/main-navigation/main-navigation';
import {useParams} from 'react-router-dom';
import { OfferType } from '../../types/offer-type';
import OfferImage from '../../components/offer-image/offer-image';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import Card from '../../components/card/card';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { fetchCurrentOffer, fetchOfferComments } from '../../store/api-actions';
import { useEffect } from 'react';
import { CardOffer } from '../../mocks/cardOffer';
import Spinner from '../../components/spinner/spinner';


export default function Offer (): JSX.Element {
  const mock = CardOffer;
  const dispatch = useAppDispatch();
  const {id: offerId} = useParams();
  const currentOffer = useAppSelector((state) => state.offers.currentOffer);
  const currentComments = useAppSelector((state) => state.offers.currentOfferComments);
  const loadingStatus = useAppSelector((state) => state.offers.isCurrentOfferDataLoading);
  useEffect(() => {
    if (offerId) {
      dispatch(fetchCurrentOffer(offerId));
      dispatch(fetchOfferComments(offerId));
    }
    // return () => {
    //   dispatch(offerSlice.actions.dropOffer(null));
    // };

  }, [offerId, dispatch]);

  if (!currentOffer) {
    return <Navigate to={AppRoute.Error} />;
  }
  const isPremium = 'Premium';
  const getRating = (rating: number) => Math.round((rating * 100) / 5);

  return (
    <div className="page">
      {loadingStatus && <Spinner /> }
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <MainNavigation />
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image : string) => <OfferImage image={image} key={`${currentOffer.id}${image}`}/>)}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className={currentOffer.isPremium ? 'offer__mark' : ''}>
                <span>{currentOffer.isPremium && isPremium}</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${getRating(currentOffer.rating)}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{currentOffer.bedrooms} bedrooms</li>
                <li className="offer__feature offer__feature--adults"> Max {currentOffer.maxAdults} adults </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good, index : number) => <li key={`${index + 1}${good}`} className="offer__inside-item">{good}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  <span className="offer__user-status">{currentOffer.host.isPro}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.title}</p>
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <ReviewsList comments={currentComments}/>
            </div>
          </div>
          <Map location={currentOffer.city.location} offers={[currentOffer]} specialOfferId={currentOffer.id} isOfferPage/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {/*  МОКИ */}
              {mock.map((offer : OfferType) => <Card offer={offer} key={offer.id} isMainPage={false} isOfferPage />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
