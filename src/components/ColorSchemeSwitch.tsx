'use client';

import { useEffect, useState } from 'react';
import DayIcon from './DayIcon';
import NightIcon from './NightIcon';
import { IconButton } from '@arctic-kit/snow';

export function ColorSchemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check localStorage for saved theme on initial load
  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      root.classList.remove('theme-light');
      root.classList.add('theme-dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('theme-dark');
      root.classList.add('theme-light');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('theme-light');
      root.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <IconButton onClick={toggleTheme} size="medium">
      {isDarkMode ? <DayIcon /> : <NightIcon />}
    </IconButton>
  );
}
