import { useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/login'
import './App.css'
import Signup from './pages/signup'
import Navbar from './components/Navsydbar'
import Home from './pages/home'
import Account from './pages/Account'
import Posts from './pages/posts'
import History from './pages/history'

function App() {
  return(
  <BrowserRouter>
       <Routes>
        <Route path="/">
        <Route index element={<Login/>} />
        </Route>
        <Route path="/signup">
        <Route index element={<Signup/>} />
        </Route>
        <Route path="/home">
        <Route index element={<Home/>} />
        </Route>
        <Route path="/account">
        <Route index element={<Account/>} />
        </Route>
        <Route path="/posts">
        <Route index element={<Posts/>} />
        </Route>
        <Route path="/history">
        <Route index element={<History/>} />
        </Route>
        </Routes>
  </BrowserRouter>
  )
}

export default App
