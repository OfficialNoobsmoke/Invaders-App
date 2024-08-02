import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const useResetScrollOnNavigation = () => {
  const location = useLocation();
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  return scrollableRef;
};
