import React, { useState, useEffect, Fragment, useContext } from 'react'
import MyModal from '../../components/modal/Modal'
import { Dialog, Transition } from '@headlessui/react'
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../redux/cartSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { addDoc, updateDoc, query, orderBy, deleteDoc, collection, onSnapshot, doc, setDoc } from 'firebase/firestore';

import { fireDB } from '../../components/firebase/FireabseConfig';

const Cart = () => {


  const [isOpen, setIsOpen] = useState(false)

  const [totalAmount, setTotalAmount] = useState(0);
  const Shipping = parseInt(100)
  const grandTotal = Shipping + totalAmount

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pincode, setPincode] = useState();
  const [address, setAddress] = useState();
  const [mobileNumber, setMobileNumber] = useState();



  
const context = useContext(myContext);
const { } = context;
const cartItem = useSelector((state) => state.cart)
// console.log('hshhs')
// console.log("hh", cartItem)
const arr = [1, 2, 3, 4]


const dispatch = useDispatch();
const deleteCart = (product) => {
  dispatch(deleteFromCart(product));
  toast.success('Delete to cart');

  // console.log(cartItem); // Optionally log cart items
};

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartItem));
  let temp = 0;
  cartItem.forEach((cartItem) => {
    temp = temp + parseInt(cartItem.price)
  })
  setTotalAmount(temp)
}, [cartItem]);


  // But now
  const closeModal = () => {
    setIsOpen(false)
  }
  const buyNow = () => {
    if (!name || !address || !pincode || !mobileNumber) {
      toast.error("Please fill all the field!")
    }
    else {
      // setIsOpen(false)

      const addressInfo = {
        name,
        email,
        pincode,
        address,
        mobileNumber, date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      }



      var options = {
        key: "",
        key_secret: "",
        amount: parseInt(grandTotal * 100),
        currency: "INR",
        order_receipt: 'order_rcptid_' + name,
        name: "E-Bharat",
        description: "for testing purpose",
        handler: function (response) {

          // console.log(response)
          toast.success('Payment Successful')

          const paymentId = response.razorpay_payment_id
          // store in firebase 
          const orderInfo = {
            cartItem,
            addressInfo,
            date: new Date().toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            ),
            email: JSON.parse(localStorage.getItem("user")).user.email,
            userid: JSON.parse(localStorage.getItem("user")).user.uid,
            paymentId
          }

          try {
            const orderRef = addDoc(collection(fireDB, "orders"), orderInfo)
          } catch (error) {
            console.log(error)
            toast.error(error)
          }
        },

        theme: {
          color: "#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
      console.log(pay)
    }
  }
// }



function openModal() {
  setIsOpen(true)
}


const [userData, setUserData] = useState();


return (
  <div>
    <div className='flex flex-col items-start justify-start w-screen h-auto mx-auto'>
      {/* Cart for laptop */}
      <div className='flex-col items-center justify-center hidden w-screen h-auto gap-10 mt-0 lg:pb-20 lg:mt-20 from-red-000 bg-gradient-to-t to-red-300 lg:flex'>
        {
          cartItem.map((i, idx) => (
            <div key={i} className=' h-[22rem] flex flex-row justify-start gap-10 items-center p-6  text-white w-[90vw] bg-slate-100'>
              <div className='h-full  w-[14rem] justify-center items-center flex '>
                <img className='object-cover w-full h-full ' src={i.image} alt="" />
              </div>
              {/* Cancel or discart */}
              <div onClick={() => { deleteCart(i) }} className='absolute ml-[90vw] flex justify-center items-center bg-red-500/55 hover:bg-red-500 h-[4rem] overflow-hidden w-[4rem] rounded-full'>
                <button>
                  <svg className='' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

                </button>
              </div>
              <div>

              </div>
              <div className='flex flex-col items-start justify-start w-9/12 h-full gap-5 text-black'>
                <span className='text-2xl font-semibold border-b-2 text-slate-500'>Product Detail</span>
                <div className='flex flex-col items-start justify-start w-full h-auto gap-2'>
                  <span className='font-semibold text-slate-500'>Product Title</span>
                  <h1>{i.name}</h1>
                </div>
                <div className='flex flex-col items-start justify-start w-full h-auto gap-2'>
                  <h1>MRP: ₹{i.price}</h1>
                </div>
                <div className='flex flex-col items-start justify-start w-full h-auto gap-2'>
                  <span className='font-semibold text-slate-500'>Description</span>
                  {/* <p>{i.desc}</p> */}
                  <p>{i.desc.length > 300 ? i.desc.slice(0, 300) + "...more" : i.desc}</p>

                </div>
              </div>
            </div>
          ))
        }
        <div className={` ${cartItem.length === 0 ? "hidden" : "flex"} h-auto min-h-[10rem] lg:min-h-[17rem] justify-between lg:justify-center mx-auto items-center flex-col text-white lg:rounded-xl w-screen lg:w-[30rem] bg-black`}>
          <div className='flex flex-col items-center justify-center w-full h-[6rem] '>
            <div className='flex flex-row items-center w-full px-10 justify-between lg:w-[28rem] h-auto'>
              <h1>Subtotal</h1>
              <h1>₹{totalAmount}</h1>

            </div>
            <div className='flex flex-row items-center w-full px-10 justify-between lg:w-[28rem] h-auto'>
              <h1>Shipping Charge</h1>
              <h1>₹{Shipping}</h1>

            </div>
            <div className='flex flex-row items-center w-full px-10 justify-between lg:w-[28rem] h-auto'>
              <h1>Total</h1>
              <h1>₹{grandTotal}</h1>

            </div>
          </div>
          <button
            type="button"
            onClick={openModal}
            className=' h-[3rem] mt-10 rounded-[0.2rem] w-[28rem] justify-center items-center flex text-black bg-violet-300'>
            {/* Got it, thanks! */}
            Buy Now
          </button>
          {/* <MyModal /> */}

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <div className="mt-2">
                        <h1>Enter your full name</h1>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} className='h-[3rem] w-full border-2 border-slate-200 rounded-lg' type="text" />
                      </div>
                      <div className="mt-2">
                        <h1>Enter Your Full Address</h1>
                        <input value={address} onChange={(e) => { setAddress(e.target.value) }} className='h-[3rem] w-full border-2 border-slate-200 rounded-lg' type="text" />
                      </div>
                      <div className="mt-2">
                        <h1>Enter Pincode</h1>
                        <input value={pincode} onChange={(e) => { setPincode(e?.target?.value) }} className='h-[3rem] w-full border-2 border-slate-200 rounded-lg' type="number" />
                      </div>
                      <div className="mt-2">
                        <h1>Enter Your Mobile Number</h1>
                        <input value={mobileNumber} onChange={(e) => { setMobileNumber(e?.target?.value) }} className='h-[3rem] w-full border-2 border-slate-200 rounded-lg' type="Number" />
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Order now
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>

      <div className='flex flex-col items-start justify-center w-screen h-auto gap-20 py-2 lg:flex-row bg-slate-100 lg:flow-row'>
        {/* <div className='flex flex-col items-start justify-center w-screen h-auto gap-20 lg:flex-row bg-slate-100 mx lg:flow-row'> */}
        <div>
          <div className={` ${cartItem.length === 0 ? "flex" : "hidden"} flex-row items-center justify-center w-screen h-[70vh] font-customFont1`}>
            <h1 className='mx-auto text-2xl font-semibold text-sky-700 '>Oops? No items in cart</h1>
          </div>
        </div>

        {/* For Items in cart for mobile */}
        <div className='flex flex-col items-center justify-between w-auto h-auto gap-10 lg:hidden '>
          {
            cartItem.map((i, idx) => {
              const { name, price, category, image, desc } = i
              return (
                // <div key={idx} className=' h-[14rem] w-[99vw] flex justify-between flex-row items-center bg-white border-2 border-black/20'>
                <div key={idx} className=' h-[14rem] w-[99vw] flex justify-between flex-row items-center bg-white border-2 border-black/20'>
                  <div className='w-5/12 h-[12rem] overflow-hidden bg-black/0 '>
                    <img className='object-cover w-full h-full ' src={image} alt="" />
                  </div>
                  <div className='flex flex-col items-start justify-between w-7/12 h-full py-5 pl-2'>
                    <div className='flex flex-col items-start justify-start w-auto h-auto gap-4 text-sm text-slate-700 '>
                      <span className='font-semibold border border-b-2 text-slate-600 border-slate-200'>Product Detail</span>
                      <h1 className='font-semibold '>{name}</h1>
                      {/* <p className='font-semibold text-slate-300'>{desc}</p> */}
                      <h1 className='font-semibold '>₹{price}</h1>
                    </div>
                    <div onClick={() => { deleteCart(i) }} className='absolute -mt-[2rem] ml-[50vw] flex justify-center items-center bg-red-500 h-[2rem] overflow-hidden w-[2rem] rounded-full'>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {/* For Price to pay */}
        <div className={` ${cartItem.length === 0 ? "hidden" : "flex"} lg:hidden h-auto min-h-[10rem] lg:min-h-[17rem] justify-between lg:justify-center mx-auto items-center flex-col text-white lg:rounded-xl w-screen lg:w-[30rem] bg-black`}>
          <div className='flex flex-col items-center justify-center w-full h-[6rem] '>
            <div className='flex flex-row items-center w-full px-10 justify-between lg:w-[28rem] h-auto'>
              <h1>Subtotal</h1>
              <h1>₹{totalAmount}</h1>

            </div>
            <div className='flex flex-row items-center w-full px-10 justify-between lg:w-[28rem] h-auto'>
              <h1>Shipping Charge</h1>
              <h1>₹{Shipping}</h1>

            </div>
            <div className='flex flex-row items-center w-full px-10 justify-between lg:w-[28rem] h-auto'>
              <h1>Total</h1>
              <h1>₹{grandTotal}</h1>

            </div>
          </div>
          <button
            type="button"
            onClick={openModal}
            className=' h-[3rem] mt-10 rounded-[0.2rem] w-[28rem] justify-center items-center flex text-black bg-violet-300'>
            Buy Now
          </button>
          {/* <MyModal /> */}


          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <div className="mt-2">
                        <h1>Enter your full name</h1>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} className='h-[3rem] w-full border-2 border-slate-200 rounded-lg' type="text" />
                      </div>
                      <div className="mt-2">
                        <h1>Enter Your Full Address</h1>
                        <input value={address} onChange={(e) => { setAddress(e.target.value) }} className='h-[3rem] w-full border-2 border-slate-200 rounded-lg' type="text" />
                      </div>
                      <div className="mt-2">
                        <h1>Enter Pincode</h1>
                        <input value={pincode} onChange={(e) => { setPincode(e?.target?.value) }} className='h-[3rem] w-full border-2 border-slate-200 rounded-lg' type="number" />
                      </div>
                      <div className="mt-2">
                        <h1>Enter Your Mobile Number</h1>
                        <input value={mobileNumber} onChange={(e) => { setMobileNumber(e?.target?.value) }} className='h-[3rem] w-full border-2 border-slate-200 rounded-lg' type="Number" />
                      </div>

                      {/* Modal For purchasing */}
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={()=>{closeModal()}}
                        >
                          Buy now
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  </div>
)
}

export default Cart
