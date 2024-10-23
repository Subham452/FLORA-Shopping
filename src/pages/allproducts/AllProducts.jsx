import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from '../redux/cartSlice';
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const AllProducts = () => {
  const context = useContext(myContext);
  const { product, setItemsInCart, itemsInCart } = context; // Assuming product is an array of product objects

  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const addCart = (product) => {
    dispatch(addToCart(product));
    // toast.success('Added to cart');

    console.log(cartItem); // Optionally log cart items
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItem));
  }, [cartItem]);


  return (
    <div>
      <div className='flex flex-col items-center justify-center w-screen h-auto'>
        <div className='items-start justify-start w-full h-auto pl-4 mt-10 mb-10 text-2xl font-semibold text-slate-900'>
          <h1>Top Deals are on sale, <br/>Shop now</h1>
        </div>

        {/* For Laptop - Product Items */}
        <div className='hidden grid-flow-row gap-10 md:grid-cols-3 lg:grid-cols-4 lg:grid'>
          {/* {product.map(({ id, name, price, image }) => ( */}
          {product.map((i, id) => {
            const { name, date, category, price, image, desc } = i
            return (
              <div key={id} className='h-[32rem] overflow-hidden flex-col justify-between items-center flex w-[17rem] bg-slate-50 border-2 rounded-lg'>
                {/* <div className='object-cover w-full h-5/12'> */}
                <div onClick={()=>{ navigate(`/Product-Detail/${i.id}`)}}  className='bg-black w-full object-cover h-[20rem] '>
                  <img src={image} alt={name} className='w-full h-[20rem] object-cover ' />
                </div>
                <div  className='flex flex-col items-start justify-between w-full h-full'>
                  <div onClick={()=>{ navigate(`/Product-Detail/${i.id}`)}}   className='flex flex-col items-start justify-between w-full h-[6rem] pl-4 font-semibold'>
                    {/* <h1>{name}</h1> */}
                    <h1>{name.length > 51 ? name.slice(0, 51) + "...more" : name}</h1>
                    <h1>₹{price}</h1>
                  </div>
                  {/* <div onClick={() => addCart({ id, name, price, image })} className="w-[17rem] cursor-pointer flex justify-center items-center overflow-hidden rounded-full"> */}

                  {/* In this addCart(i), i is index for fething perticular product that was we clicked in product section */}
                  <div onClick={() => addCart(i)} className="w-[17rem] cursor-pointer flex justify-center items-center overflow-hidden rounded-full">
                    <div className='w-[16rem] font-semibold mb-2 rounded-full justify-between items-center px-4 flex flex-row h-[3rem] text-black bg-slate-50 border-2'>
                      <h1>Add</h1>
                      <h1 className='text-2xl'>+</h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* For Mobile - Product items */}
        <div className='grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:hidden'>
          {/* {product.map(({ id, name, price, image }) => ( */}
          {product.map((i, id) => {
            const { name, date, category, price, image, desc } = i
            return (
              <div className='h-[25rem] overflow-hidden flex-col justify-between items-center flex w-[49vw] bg-slate-50 border-2'>
                {/* <div className='object-cover w-full h-5/12'> */}
                <div onClick={()=>{ navigate(`/Product-Detail/${i.id}`)}} key={id}  className='bg-black w-full object-cover h-[15rem] '>
                  <img src={image} alt={name} className='w-full h-[15rem] object-cover ' />
                </div>
                <div className='flex flex-col items-start justify-between w-full h-full text-sm'>
                  <div onClick={()=>{ navigate(`/Product-Detail/${i.id}`)}} key={id}  className='flex flex-col items-start justify-between w-full h-[6rem] pl-4 font-semibold'>
                    {/* <h1>{name}</h1> */}
                    <h1>{name.length > 51 ? name.slice(0, 51) + "...more" : name}</h1>
                    <h1>₹{price}</h1>
                  </div>
                  {/* <div onClick={() => addCart({ id, name, price, image })} className="w-[17rem] cursor-pointer flex justify-center items-center overflow-hidden rounded-full"> */}

                  {/* In this addCart(i), i is index for fething perticular product that was we clicked in product section */}
                  <div onClick={() => addCart(i)} className="w-[12rem] cursor-pointer flex justify-center items-center overflow-hidden rounded-full">
                    <div className='w-[47vw] font-semibold mb-2 rounded-full justify-between items-center px-4 flex flex-row h-[3rem] text-black bg-slate-50 border-2'>
                      <h1>Add</h1>
                      <h1 className='text-2xl'>+</h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AllProducts;
