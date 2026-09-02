import React from 'react'

function AboutCreator() {
  return (
    <div className="min-h-screen p-4 pt-20 pb-24 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">About the Creator</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        This project was built as a community-driven platform for exploring Kolkata. It showcases
        places, transport, news, local marketplaces, and more — all in a modern, responsive UI.
      </p>
      <div className="grid gap-4">
        <div className="card">
          <h2 className="font-bold mb-1">Purpose</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            To make Kolkata more accessible and fun to discover, and to bring together useful city
            resources in one place.
          </p>
        </div>
        <div className="card">
          <h2 className="font-bold mb-1">Tech Stack</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            React, Next.js, and Tailwind CSS on the frontend.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutCreator

