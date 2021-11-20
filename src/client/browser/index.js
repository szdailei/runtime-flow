import { useState, useEffect, useCallback } from 'react';

function getWindowPixels() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowPixels() {
  const [windowPixels, setWindowPixels] = useState(undefined);

  const handleResize = useCallback(() => {
    setWindowPixels(getWindowPixels());
  }, []);

  useEffect(() => {
    if (!windowPixels) {
      setWindowPixels(getWindowPixels());
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize, windowPixels]);

  return windowPixels;
}

export default useWindowPixels
