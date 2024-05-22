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
import PostComponent from './pages/posttester'
import AuthProvided from './lib/auth'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SentimentAnalyzer from './pages/sentimenttest'
const queryClient = new QueryClient();


function App() {
  return(
<div>

    
   
    <BrowserRouter>
       <Routes>
        <Route path="/">
        <Route index element={<Login/>} />
        </Route>
        <Route path="/posttester">
        <Route index element={<PostComponent/>} />
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
        <Route path="/sentmod">
        <Route index element={<SentimentAnalyzer/>} />
        </Route>
        </Routes>
  </BrowserRouter>

</div>
  )
}

export default App
/*react-dom.development.js:14887 
 Uncaught Error: Objects are not valid as a React child (found: object with keys {userId, signIn, signUp, signOutF}). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (react-dom.development.js:14887:9)
    at reconcileChildFibers2 (react-dom.development.js:15828:7)
    at reconcileChildren (react-dom.development.js:19167:28)
    at mountIndeterminateComponent (react-dom.development.js:20157:5)
    at beginWork (react-dom.development.js:21587:16)
    at HTMLUnknownElement.callCallback2 (react-dom.development.js:4164:14)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:4213:16)
    at invokeGuardedCallback (react-dom.development.js:4277:31)
    at beginWork$1 (react-dom.development.js:27451:7)
    at performUnitOfWork (react-dom.development.js:26557:12)
    at workLoopSync (react-dom.development.js:26466:5)
    at renderRootSync (react-dom.development.js:26434:7)
    at recoverFromConcurrentError (react-dom.development.js:25850:20)
    at performConcurrentWorkOnRoot (react-dom.development.js:25750:22)
    at workLoop (scheduler.development.js:266:34)
    at flushWork (scheduler.development.js:239:14)
    at MessagePort.performWorkUntilDeadline (scheduler.development.js:533:21)
VM128:1 
 The above error occurred in the <AuthProvided> component:

    at AuthProvided (http://localhost:5173/src/lib/auth.jsx:28:27)
    at div
    at App

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
react-dom.development.js:14887 
 Uncaught Error: Objects are not valid as a React child (found: object with keys {userId, signIn, signUp, signOutF}). If you meant to render a collection of children, use an array instead.
    at throwOnInvalidObjectType (react-dom.development.js:14887:9)
    at reconcileChildFibers2 (react-dom.development.js:15828:7)
    at reconcileChildren (react-dom.development.js:19167:28)
    at mountIndeterminateComponent (react-dom.development.js:20157:5)
    at beginWork (react-dom.development.js:21587:16)
    at beginWork$1 (react-dom.development.js:27426:14)
    at performUnitOfWork (react-dom.development.js:26557:12)
    at workLoopSync (react-dom.development.js:26466:5)
    at renderRootSync (react-dom.development.js:26434:7)
    at recoverFromConcurrentError (react-dom.development.js:25850:20)
    at performConcurrentWorkOnRoot (react-dom.development.js:25750:22)
    at workLoop (scheduler.development.js:266:34)
    at flushWork (scheduler.development.js:239:14)
    at MessagePort.performWorkUntilDeadline (scheduler.development.js:533:21) */