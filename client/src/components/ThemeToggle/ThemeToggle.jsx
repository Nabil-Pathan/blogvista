// ThemeToggle.js
import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <label className={`switch ${theme}`}>
      <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeToggle;
