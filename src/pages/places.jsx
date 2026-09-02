import React, { useEffect, useState } from 'react'
import { FaStar, FaMapMarkerAlt, FaCompass, FaCoffee, FaLandmark, FaMountain } from 'react-icons/fa'

function Places() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('nearby')

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setLoading(true)
        const res = await fetch('/api/places')
        if (!res.ok) throw new Error('Failed to fetch places')
        const data = await res.json()
        setPlaces(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPlaces()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>

  // Categorize places
  const cafes = places.filter(p => p.type === 'Cafe')
  const kolkataAttractions = places.filter(p => ['Monument', 'Museum', 'Bridge'].includes(p.type))
  const westBengalDestinations = places.filter(p => ['Hill Station', 'Forest', 'Beach'].includes(p.type))
  // For demo, "nearby" is all places with a status
  const nearbyPlaces = places.filter(p => p.status)

  return (
    <div className="min-h-screen pb-20">
      {/* Places Near Me */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-100 p-3 rounded-lg">
            <FaCompass className="text-orange-600" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-xl">Near Me</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Discover places around you</p>
          </div>
        </div>
        <div className="space-y-3">
          {nearbyPlaces.map(place => (
            <div key={place._id} className="card flex justify-between items-center">
              <div>
                <h3 className="font-bold">{place.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{place.type}</p>
                <span className="text-xs text-green-600">{place.status}</span>
              </div>
              <div className="text-right">
                {/* Optionally show location or distance if available */}
                <span className="text-orange-600 font-bold">{place.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 p-4 shadow-sm z-10">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('cafes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === 'cafes'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <FaCoffee size={16} />
            Cafes & Places
          </button>
          <button
            onClick={() => setActiveTab('kolkata')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === 'kolkata'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <FaLandmark size={16} />
            In Kolkata
          </button>
          <button
            onClick={() => setActiveTab('bengal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === 'bengal'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <FaMountain size={16} />
            West Bengal
          </button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-4">
        {activeTab === 'cafes' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Popular Cafes</h2>
            {cafes.map(cafe => (
              <div key={cafe._id} className="card overflow-hidden">
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="w-full h-48 object-cover -mx-4 -mt-4 mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{cafe.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <FaMapMarkerAlt className="text-gray-600 dark:text-gray-300" size={14} />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{cafe.location}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{cafe.description}</p>
                <div className="flex items-center gap-1">
                  <FaStar className="text-orange-600" size={14} />
                  <span className="text-orange-600 font-bold">{cafe.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'kolkata' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Places to Visit in Kolkata</h2>
            {kolkataAttractions.map(place => (
              <div key={place._id} className="card overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-48 object-cover -mx-4 -mt-4 mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{place.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <FaMapMarkerAlt className="text-gray-600 dark:text-gray-300" size={14} />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{place.location}</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{place.description}</p>
                <div className="flex items-center gap-1">
                  <FaStar className="text-orange-600" size={14} />
                  <span className="text-orange-600 font-bold">{place.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bengal' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Explore West Bengal</h2>
            {westBengalDestinations.map(destination => (
              <div key={destination._id} className="card overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover -mx-4 -mt-4 mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{destination.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{destination.description}</p>
                <div className="flex items-center gap-1">
                  <FaStar className="text-orange-600" size={14} />
                  <span className="text-orange-600 font-bold">{destination.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Places