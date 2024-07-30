import Header from "./components/Header"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import { ThemeProvider } from "./contexts/ThemeContext"
import { useEffect, useState } from "react"
import Wallpaper from "./pages/Wallpaper"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

function App() {

  const [themeMode, setThemeMode] = useState('dark');

  const darkTheme = ()=>{
    setThemeMode('dark')
  }

  const lightTheme = ()=>{
    setThemeMode('light')
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove('dark','light')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white box-border">
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='/wallpaper/:id' element={<Wallpaper/>}/>
            <Route path="/profile/:email" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
