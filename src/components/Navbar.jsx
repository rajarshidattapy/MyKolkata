import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaUtensils, FaHeart, FaPrayingHands, FaTrain, FaUsers } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  if (router.pathname === '/' || !isAuthenticated) return null

  const linkClass = (href) =>
    `flex flex-col items-center w-full py-1 ${router.pathname === href ? 'text-orange-600' : 'text-gray-600 dark:text-gray-400'}`

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center h-16">
        <Link href="/home" className={linkClass('/home')}>
          <FaHome size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link href="/places" className={linkClass('/places')}>
          <FaUtensils size={20} />
          <span className="text-xs mt-1">Explore</span>
        </Link>

        <Link href="/tinder" className={linkClass('/tinder')}>
          <FaHeart size={20} />
          <span className="text-xs mt-1">Experiences</span>
        </Link>

        <Link href="/pujo" className={linkClass('/pujo')}>
          <FaPrayingHands size={20} />
          <span className="text-xs mt-1">Pujo</span>
        </Link>

        <Link href="/transport" className={linkClass('/transport')}>
          <FaTrain size={20} />
          <span className="text-xs mt-1">Transport</span>
        </Link>

        <Link href="/contribute" className={linkClass('/contribute')}>
          <FaUsers size={20} />
          <span className="text-xs mt-1">Contribute</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
