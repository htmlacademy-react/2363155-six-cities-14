import PlaceCard from '../ui/place-card';
import {Offer} from '../../types/types';

type PlacesProps = {
  offers: Offer[];
}

function PlacesList({offers}: PlacesProps): JSX.Element|null {
  return offers?.length ? (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item: Offer) => (
        <article key={item.id} className="cities__card place-card">
          <PlaceCard offer={item}/>
        </article>
      ))}
    </div>
  ) : null;
}

export default PlacesList;
