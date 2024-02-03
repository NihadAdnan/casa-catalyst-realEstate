import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/create-Listing' element={<CreateListing />} />
        <Route path='/update-Listing/:listingID' element={<UpdateListing />} />
        </Route>
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/listing/:listingID' element={<Listing/>} />
      </Routes>

    </BrowserRouter>
  )
}
