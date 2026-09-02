import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'

function Explore() {
  const router = useRouter()
  const route = router.query.route
  const [searchTerm, setSearchTerm] = useState('')
  const [pandals, setPandals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPandals() {
      try {
        setLoading(true)
        const res = await fetch('/api/pandals')
        if (!res.ok) throw new Error('Failed to fetch pandals')
        const data = await res.json()
        setPandals(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPandals()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>

  const filteredPandals = pandals.filter(pandal => 
    pandal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pandal.location && pandal.location.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen pt-16 pb-6">
      <div className="sticky top-16 bg-gray-100 dark:bg-gray-800 p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search pandals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border text-base dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="p-4 space-y-4">
        {filteredPandals.map(pandal => (
          <div key={pandal._id} className="card overflow-hidden active:scale-[0.99] transition-transform">
            <img
              src={pandal.image}
              alt={pandal.name}
              className="w-full h-48 object-cover -mx-4 -mt-4 mb-4"
            />
            <h2 className="text-lg font-bold mb-2 dark:text-white">{pandal.name}</h2>
            <div className="flex items-center gap-1 mb-2">
              <FaMapMarkerAlt className="text-gray-600 dark:text-gray-300" size={14} />
              <span className="text-gray-600 dark:text-gray-300 text-sm">{pandal.location}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm line-clamp-2">{pandal.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-orange-600 font-bold">{pandal.rating}</span>
                <FaStar className="text-orange-600" size={14} />
              </div>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{pandal.distance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore