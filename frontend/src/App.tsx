import { useEffect, useState } from 'react'
import './App.css'
import { NavBar } from './components/NavBar'
import { MainPage } from './pages/MainPage'
import AppContext from './context/AppContext'
import axios from 'axios'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const attemptLogin = async () => {
      const response = await axios.get("http://localhost:3000/auth/me", {
        withCredentials: true,
      });

      setLoggedInUser(response.data);
    }

    attemptLogin();
  }, [])

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
