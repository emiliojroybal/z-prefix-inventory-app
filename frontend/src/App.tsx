import { useEffect, useState } from 'react'
import './App.css'
import { NavBar } from './components/NavBar'
import { MainPage } from './pages/MainPage'
import AppContext from './context/AppContext'
import axios from 'axios'
import useAuth from './hooks/useAuth'

function App() {
  const [loggedInUser, setLoggedInUser] = useAuth();

  return (
    <AppContext.Provider value={loggedInUser}>
      <NavBar setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>
      <div className="main">
        <MainPage />
      </div>
    </AppContext.Provider>
  )
}

export default App
