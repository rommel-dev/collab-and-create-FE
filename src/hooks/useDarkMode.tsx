import React, { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState<any>(localStorage.getItem('theme'));

  useEffect(() => {
    const root = window.document.documentElement;
    if (!theme) {
      localStorage.setItem('theme', 'dark');
      root.classList.add('dark');
      setTheme('dark');
    } else {
      root.classList.add(theme);
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      root.classList.remove(theme);
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      root.classList.remove(theme);
      root.classList.add('dark');
      setTheme('dark');
    }
  };

  return [theme, toggleTheme];
};

export default useDarkMode;
