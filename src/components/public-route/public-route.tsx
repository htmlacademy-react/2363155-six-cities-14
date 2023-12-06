import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks/redux-hooks';

type RedirectProps = {
  children: JSX.Element;
}

export default function PublicRoute ({children} : RedirectProps) {
  const authStatus = useAppSelector((store) => store.user.authorizationStatus);
  return (
    authStatus !== AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Main} />
  );
}
