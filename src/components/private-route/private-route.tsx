import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks/redux-hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({children} : PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector((store) => store.user.authorizationStatus);
  return (
    authStatus === AuthorizationStatus.NoAuth
      ? <Navigate to={AppRoute.Login} />
      : children
  );
}
