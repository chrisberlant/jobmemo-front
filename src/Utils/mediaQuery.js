import { useEffect, useMemo, useState } from 'react';

function useMediaQuery(query) {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
  const [match, setMatch] = useState(mediaQuery.matches);

  useEffect(() => {
    const change = () => setMatch(mediaQuery.matches);
    mediaQuery.addEventListener('change', change);
    return () => mediaQuery.removeEventListener('change', change);
  }, [mediaQuery]);

  return match;
}

export default useMediaQuery;
