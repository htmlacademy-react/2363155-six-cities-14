import MainPage from '../../pages/main-page/main-page';

import {Offer} from '../../types/types';

type AppProps = {
  offers: Offer[];
}

function App({offers}: AppProps): JSX.Element {
  return (
    <MainPage offers={offers}/>
  );
}

export default App;
