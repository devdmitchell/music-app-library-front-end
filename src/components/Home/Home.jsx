import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Your Music Library</h1>
      </header>
      <main className="home-main">
        <p>
          Explore your collection, search for new albums, and enjoy your favorite tunes.
        </p>
      </main>
    </div>
  )
}

export default Home