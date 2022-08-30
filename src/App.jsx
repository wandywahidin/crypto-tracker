import React from "react"
import {Route, Routes, Link} from 'react-router-dom'
import './app.css'

import { Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News, Footer  } from "./components"

function App() {

  return (
    <div className="App">
       <div className='navbar'>
        <Navbar/>
       </div>
       <div className='main'>
          <div className="rouutes">
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/exchanges" element={<Exchanges/>}/>
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />}/>
              <Route path="/crypto/:coinId" element={<CryptoDetails/>}/>
              <Route path="/news" element={<News/>}/>
            </Routes>
          </div>
       </div>
       <div className='footer'>
        <Footer/>
       </div>
    </div>
  )
}

export default App
