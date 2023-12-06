import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type {PropsWithChildren} from 'react';

export default function ScrollToTop({children} : PropsWithChildren) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main>
      {children}
    </main>
  );
}
