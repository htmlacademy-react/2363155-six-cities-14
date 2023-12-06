import { useAppSelector } from '../../hooks/redux-hooks';
import { AuthorizationStatus } from '../../const';
import HeaderLoggedIn from '../header-logged-in/header-logged-in';
import HeaderNoAuth from '../header-no-auth/header-no-auth';

export default function MainNavigation () {
  const authStatus = useAppSelector((store) => store.user.authorizationStatus);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authStatus === AuthorizationStatus.Auth ? <HeaderLoggedIn /> : <HeaderNoAuth />}
      </ul>
    </nav>
  );
}
