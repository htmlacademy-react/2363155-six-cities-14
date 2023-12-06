import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import styles from './not-found.module.css';
import CityFilters from '../../components/city-filters/city-filters';

export default function NotFound () : JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities: 404</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <div className="tabs">
          <section className="locations container">
            <CityFilters />
          </section>
        </div>
        <div className={styles.notFound}>
          <h1 className={styles.notFound__title}>
            <span className={styles.notFound__accent}>	&#128373;</span>
            <span className={styles.notFound__text}>It seems that the page you are looking for doesn&apos;t exist</span>
          </h1>
          <Link to='/' className={styles.notFound__link}>Back to main page</Link>
        </div>
      </main>
    </div>
  );
}
