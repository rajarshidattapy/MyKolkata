import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  )
}

export default DarkModeToggle