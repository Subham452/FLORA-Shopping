import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom'
const ProductView = () => {
    const { id } = useParams()
    const context = useContext(myContext);
    const { product, setItemsInCart, itemsInCart } = context; //Assuming product is an array of product objects

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
            ProductView {id}
            <div className='flex flex-row items-center justify-center w-screen h-auto lg:h-screen bg-slate-100'>
                {
                    product.map((i, idx) => (
                        <div key={i} className={`${i.id === id ? "flex" : "hidden"}`}>
                            <div className='flex flex-col items-center justify-between w-screen h-auto gap-10 px-20 overflow-hidden lg:h-screen lg:flex-row'>
                                {/* Product Image */}
                                <div className=' lg:h-[80vh] h-auto flex justify-center items-center bg-black w-screen lg:w-[80vh]'>
                                    <img className='w-full h-full ' src={i.image} alt="" />
                                </div>
                                {/* Product information */}
                                <div className='flex flex-col items-center h-auto justify-center lg:justify-between w-screen lg:pl-0 pl-2 lg:w-full lg:h-[80vh]'>

                                    <div className='flex flex-col gap-5 items-start justify-start w-full h-auto lg:pb-0 pb-20 lg:h-[50vh]'>
                                        <h1 className='font-semibold lg:text-3xl '>{i.name}</h1>
                                        <h1><span className='font-bold '>Price : </span>₹{i.price}</h1>
                                        <h1><span className='flex flex-col font-bold '>Description : </span> {i.desc}</h1>
                                    </div>

                                    <div className='flex flex-row items-center justify-between w-screen lg:w-full  lg:h-[40vh] '>
                                    <button onClick={() => addCart(i)}  className=' h-[3rem] w-[45vh] lg:w-[20rem] bg-sky-400 font-semibold'>Add to Cart</button>
                                    <button className=' h-[3rem] w-[45vh] lg:w-[20rem] bg-green-400 font-semibold'>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductView
