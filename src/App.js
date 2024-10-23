import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from "./components/Header.jsx"
import Order from "../src/pages/order/Order.jsx"
import Dashboard from "../src/pages/admin/Dashboard.jsx"
import AllProducts from "../src/pages/allproducts/AllProducts"
import Home from "../src/pages/home/Home.jsx"
import Login from "../src/pages/register/Login"
import Signup from "../src/pages/register/Signup"
import NotFound from "../src/pages/nopage"
import MyState from './context/data/myState'
import ProductInfo from './pages/productinfo/ProductInfo'
import Cart from './pages/cart/Cart'
import AddProduct from './pages/admin/pages/AddProduct'
import UpdataeProduct from './pages/admin/pages/UpdataeProduct'
import Player from './pages/admin/pages/audioPlayer/Player.jsx'
import Footer from './components/Footer'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductView from './pages/allproducts/ProductView'
import ProductByCategory from './pages/allproducts/ProductByCategory'
import Note from './pages/notes/Note.jsx'
import AllNotes from './pages/notes/AllNotes.jsx'
import Developer_Thinking from './pages/developetThinking/Developer_Thinking.jsx'

const App = () => {
  const [app, setApp] = useState(false);
  return (
    <div className='w-screen h-auto overflow-hidden font-customFont2'>
      <MyState>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Orders' element={
              <protectedRouteForadmin>
                <Order />
              </protectedRouteForadmin>
            } />
            <Route path='/Admin' element={<Dashboard />} />
            <Route path='/AllProducts' element={<AllProducts />} />
            <Route path='/Product-Detail/:id' element={<ProductView />} />
            <Route path='/Product/:category' element={<ProductByCategory />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Audio-Player' element={<Player />} />
            <Route path='/Productinfo/:id' element={<ProductInfo />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Developer-Thinking' element={<Developer_Thinking />} />
            {/* <Route path='/Note' element={<Note />} /> */}
            <Route path='/All-Notes' element={<AllNotes />} />
            <Route path='/AddProduct' element={
              <protectedRouteForadmin>
                <AddProduct />
              </protectedRouteForadmin>
            } />
            <Route path='/UpdateProduct' element={
              <protectedRouteForadmin>
                <UpdataeProduct />
              </protectedRouteForadmin>
            } />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <ToastContainer />
          <Footer />
        </Router>
      </MyState>
    </div>
  )
}

export default App


//user
export const protectedRoute=({children})=>{
  const user = localStorage.getItem('user')
  if(user){
    return children
  }
  else{
    <Navigate to='/Login' />
  }
}


//admin

export const protectedRouteForadmin=({children})=>{
  const admin = JSON.parse(localStorage.getItem('user'))
  if(admin.user.email==='monika@gmail.com'){
    return children
  }
  else{
    <Navigate to='/Login' />
  }
}


// NOTE
//monika@gmail.com --------> ADMIN Account