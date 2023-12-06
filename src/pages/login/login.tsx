import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import {useRef, FormEvent} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { loginAction } from '../../store/api-actions';
import { AppRoute, RequestStatus } from '../../const';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { citySlice } from '../../store/slices/city';
import { CITIES } from '../../const';

export default function Login (): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordAlertRef = useRef<HTMLElement | null>(null);
  const emailAlertRef = useRef<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector((state) => state.user.isLoginLoading);
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  const emailRegex = /^\w+@[a-z]+\.[a-z]{2,}$/;
  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!passwordRegex.test(passwordRef.current.value) && passwordAlertRef.current !== null) {
        passwordAlertRef.current.textContent = 'Пароль должен состоять минимум из одной буквы и цифры';
      } else if (!emailRegex.test(loginRef.current.value) && emailAlertRef.current !== null) {
        emailAlertRef.current.textContent = 'Введите правильный e-mail';
      } else {
        dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        }));
      }
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
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
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <span className={styles.alert} ref={emailAlertRef}></span>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <span className={styles.alert} ref={passwordAlertRef}></span>
              </div>
              <button className="login__submit form__submit button" type="submit" disabled={loginStatus === RequestStatus.Pending}>
            Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={`${AppRoute.Main}${randomCity}`}
                className='locations__item-link'
                onClick={() => dispatch(citySlice.actions.changeCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

