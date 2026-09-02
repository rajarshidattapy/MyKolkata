import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaUtensils, FaHeart, FaPrayingHands, FaNewspaper, FaStore } from 'react-icons/fa'

function Home() {
  const [news, setNews] = useState([])
  const [marketplace, setMarketplace] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [newsRes, marketRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/marketplace')
        ])
        if (!newsRes.ok || !marketRes.ok) throw new Error('Failed to fetch data')
        const newsData = await newsRes.json()
        const marketData = await marketRes.json()
        setNews(newsData)
        setMarketplace(marketData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 flex items-center justify-center mb-10">
        {/* Replace '/hero-bg.jpg' with your desired hero image in /public */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-3">Welcome to Kolkata!</h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-6">The City of Joy awaits you</p>
          <Link
            href="/places"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Recent News Section */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaNewspaper className="text-orange-500" /> Recent News
        </h2>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
          {news.map(item => (
            <a
              key={item._id || item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex-shrink-0 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
              style={{ width: '300px' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <hr className="border-t border-gray-300 dark:border-gray-700" />
      </div>

      {/* Marketplace Section */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaStore className="text-orange-500" /> Marketplace
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {marketplace.map(item => (
            <div
              key={item._id || item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex flex-col transform hover:scale-105 focus-within:ring-2 focus-within:ring-orange-400"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-36 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.location}</p>
                <p className="text-orange-600 font-bold mb-3">{item.price}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full font-semibold text-sm hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
