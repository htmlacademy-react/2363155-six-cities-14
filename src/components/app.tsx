import MainPage from '../pages/main/main';

type AppScreenProps = {
  placesCount: number;
  cardsCount: number;
}

export default function App({placesCount, cardsCount} : AppScreenProps): JSX.Element {
  return (
    <MainPage placesCount={placesCount} cardsCount={cardsCount} />
  );
}
