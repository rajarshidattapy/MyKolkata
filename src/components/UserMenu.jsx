import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaUserCircle, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const menuRef = useRef();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfile = () => {
    router.push('/profile');
    setIsOpen(false);
  };

  const handleAboutCreator = () => {
    router.push('/about-creator');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-100/70 dark:bg-gray-700/70 backdrop-blur-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <FaUser size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1">
          <button
            onClick={handleProfile}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaUserCircle className="text-gray-600 dark:text-gray-400" />
            <span>Profile</span>
          </button>
          <button
            onClick={handleAboutCreator}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaInfoCircle className="text-gray-600 dark:text-gray-400" />
            <span>About Creator</span>
          </button>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
          >
            <FaSignOutAlt />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu