import { useState, useEffect } from 'react';

const useScreenViewport = () => {
  const isClient = typeof window === 'object';

  // Utilisez useState pour stocker les dimensions du viewport
  const [largeurViewport, setLargeurViewport] = useState(isClient ? window.innerWidth || document.documentElement.clientWidth : 0);
  const [hauteurViewport, setHauteurViewport] = useState(isClient ? window.innerHeight || document.documentElement.clientHeight : 0);

  useEffect(() => {
    const handleResize = () => {
      setLargeurViewport(window.innerWidth || document.documentElement.clientWidth);
      setHauteurViewport(window.innerHeight || document.documentElement.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return  {largeurViewport,hauteurViewport}
};

export default useScreenViewport;
