/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';

export function find(list, searchedSlug) {
  return list.find((item) => item.slug === searchedSlug);
}

export function commentsFilter(list, searchId) {
  return list.filter((item) => item.userReceived.id === searchId);
}

export function formatDate(date) {
  const hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes}`;
  const newDate = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()} à ${strTime}`;
  return newDate;
}

// source : https://usehooks.com/useWindowSize/
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

// source https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  },
  [ref, handler]);
};
