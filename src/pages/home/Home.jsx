import React, { useContext } from 'react'
import Heropage from '../../components/Heropage'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../redux_/cartSlice'
import AllProducts from '../allproducts/AllProducts'
const HomePage = () => {
  const context = useContext(myContext);
  const {name} = context
  const dispatch  = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  // console.log(cartItem)
  
  const addCart = () => {
    dispatch(addToCart('Shirt'))
  }

  const deleteCart = () => {
    dispatch(deleteFromCart('Shirt'))
  }
  return (
    <div>
      <h1>{name}</h1>
      <div className='flex-row items-center justify-between hidden gap-5'>
        <button onClick={()=>{addCart()}}>add</button>
        <button onClick={()=>{deleteCart()}}>delete</button>
      </div>
      <Heropage />
      <AllProducts />
    </div>
  )
}

export default HomePage
