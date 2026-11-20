import { useState } from 'react'
import './App.css'
import { NavBar } from './components/NavBar'
import { MainPage } from './pages/MainPage'

function App() {

  return (
    <>
      <NavBar />
      <div className="main">
        <MainPage />
      </div>
    </>
  )
}

export default App
