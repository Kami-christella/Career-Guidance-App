import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Importing necessary routing components
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'  // Proper import
import Home from './components/Home'  // Proper import
import Layout from './components/Layout'  //  Proper import
import Contact  from './components/Contact'
import Services  from './components/Services'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/Services' element={<Services/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
