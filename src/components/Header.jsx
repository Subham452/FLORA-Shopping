import React, { useEffect, useState, Fragment } from 'react'
import useSound from "use-sound";
import qala from "../assets/gala.mp3";
import qalaJukebox from "../assets/Qala_Jukebox.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Link, useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { MdOutlineFlightTakeoff } from "react-icons/md";
//Hotel
import { FaHotel } from "react-icons/fa6";
//Stay + Flight
import { MdOutlineMapsHomeWork } from "react-icons/md";
//Train
import { FaTrain } from "react-icons/fa6";
//Transport
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
//Castle
import { GiCastle } from "react-icons/gi";
//Women
import { GiLipstick } from "react-icons/gi";
//Men
import { FaTshirt } from "react-icons/fa";
//Cart
import { CiShoppingCart } from "react-icons/ci";
// import { addToCart } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux'


const Hedaer = () => {

  const navigate = useNavigate();


  const cartItem = useSelector((state) => state.cart)

  // useEffect(() => {
  //   return () => {
  //     localStorage.setItem('cart', JSON.stringify(cartItem))
  //   };
  // }, [cartItem]);


  const headerMenu = [

    {
      name: 'All Products',
      icon: '📦',
      port: '/AllProducts'
      // icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
    },
    {
      name: 'Tending',
      icon: '🔥',
      port: '/AllProducts'
      // icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
    },
    {
      name: 'Women',
      // icon: <GiLipstick />,
      icon: '💄',
      port: '/Product/kid'

    },
    {
      name: 'Kid',
      icon: '👨',
      port: '/Product/kid'
      // icon: <FaTshirt />
    },
    // {
    //   name: 'Admin',
    //   port:'/AllProducts',
    //   icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-alert"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
    // },
  ]

  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }


  const user = JSON?.parse(localStorage?.getItem('user'))
  const cart = JSON?.parse(localStorage?.getItem('cart'))
  // const cart = JSON?.parse(localStorage?.getItem('cart'))
  // alert(user?.user?.email)

  const logout = () => {
    // alert('logout')
    localStorage?.clear('user');
    // window.localStorage.href = '/Login'
    navigate('/Login')
  }



  // Music Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [whichSoundIsPlaying, setWhichSoundIsPlaying] = useState(qala)
  const [time, setTime] = useState({
    min: "",
    sec: ""
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: ""
  });

  const [seconds, setSeconds] = useState();

  // const [play, { pause, duration, sound }] = useSound(qala);
  const [play, { pause, duration, sound }] = useSound(qalaJukebox);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };
  return (
    <div className='sticky top-0 z-[100] '>
      {/* For Laptop */}
      <div className='lg:flex hidden lg:h-[6rem] h-[5rem] overflow-hidden w-screen justify-center items-center bg-white/55 border-b-2 border-black/20 text-black'>
        <div className='flex items-center justify-between w-full lg:mx-20 '>
          <h1 onClick={() => { navigate("/") }} className='text-2xl font-semibold font-customFont2'>FLORA</h1>
          <div className='flex flex-row items-center justify-between gap-10 '>
            <div className='h-[3.4rem] lg:flex hidden bg-black/0 rounded-full text-white w-[58rem] justify-center items-center flex-row gap-9'>
              {
                headerMenu.map((i, idx) => (
                  <div key={i} className='flex flex-col items-center justify-center gap-1 transition-all duration-300 border-b-2 border-transparent hover:border-white'>
                    <div className='flex flex-row items-center justify-between w-auto h-auto gap-4 text-black cursor-pointer hover:border-b-2'>
                      {
                        <h1 onClick={() => { navigate(i.port) }}>{i.name}</h1>
                      }
                    </div>
                  </div>
                ))
              }

              <div onClick={() => { navigate('/All-Notes') }} className='hidden w-auto h-auto px-3 py-2 text-black cursor-pointer bg-blue-50 lg:flex '>
                Take Some Notes
                <span className='absolute bg-white-0 ml-[6.5rem] font-semibold text-sky-900 -mt-[1.2rem]'>New</span>
              </div>

              <div className='flex-row hidden w-auto h-auto text-black cursor-pointer bg-blue-0 lg:flex '>
                <div>
                  <div className='flex-row items-center justify-between hidden w-auto h-auto gap-3 px-3 text-black cursor-pointer lg:flex '>
                    <div className='px-3 py-2 bg-blue-50 '>
                      <span>Shop with Song</span>
                      <span className='absolute bg-white-0 -ml-[2rem] font-semibold text-sky-900 -mt-[1.2rem]'>New</span>
                    </div>
                    <div className='flex flex-row w-[5rem] items-center justify-between '>
                      <div className=' h-[3rem] w-[3rem] justify-center items-center flex from-slate-800/20 to-sky-500/20 shadow-md bg-gradient-to-r rounded-full'>
                        
                {!isPlaying ? (
                          <button className="playButton" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "3em", color: "black" }}>
                              <AiFillPlayCircle />
                            </IconContext.Provider>
                          </button>
                        ) : (
                          <button className="playButton" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "3em", color: "black" }}>
                              <AiFillPauseCircle />
                            </IconContext.Provider>
                          </button>
                        )}
                      </div>
                      <div className="flex flex-row items-center justify-between gap-10 mx-auto time">
                        <p>
                          {currTime.min}:{currTime.sec}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <span className='text-black '>
                {
                  user?.user?.email === 'monika@gmail.com' ? <h1 onClick={() => { navigate('/admin') }}>Admin</h1> : "User"
                }
              </span>
            </div>
            <button >{!user?.user?.email ? <Link to='/Signup'>Please Signup/Login</Link> : <h1 onClick={logout} >Logout</h1>}</button>
            <div>
              <div onClick={() => { navigate('/Cart') }} className='w-auto h-auto p-1 rounded-full bg-slate-000'>
                <CiShoppingCart size='40' color='black' />
                <div className='absolute ml-[2.5rem] h-[1.7rem] w-auto px-2 flex justify-center items-center rounded-full bg-green-500 p-1 text-white shadow-md -mt-10'>
                  {/* {cartItem.length} */}
                  {cart?.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* For Mobile */}
      <div className='sticky top-0 '>

        <div className='flex lg:hidden bg-slate-50 h-[5rem] w-screen justify-between items-center'>
          <div className='flex flex-row gap-[1rem] items-center justify-between pl-5 text-lg font-semibold text-slate-500'>
            {/* Menubar */}
            <div onClick={() => { setIsOpen(true) }} className='flex items-center justify-center w-auto h-auto p-4 rounded-full hover:bg-sky-100'>
              <svg className='' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
            {/* App Name */}
            <h1 className='text-lg font-semibold text-slate-900' onClick={() => { navigate('/') }} >FLORA</h1>

          </div>
          <div className='flex pr-10 flex-row items-center justify-between gap-[1rem]'>
            {/* <h1>{user === "monika@gmail.com" ? "Admin" : "User"}</h1> */}
            <div onClick={() => { navigate('/Cart') }} className='w-auto h-auto p-1 rounded-full bg-slate-000'>
              <CiShoppingCart size='40' color='black' />
              <div className='absolute ml-[2.5rem] h-[1.7rem] w-auto px-2 flex justify-center items-center rounded-full bg-green-500 p-1 text-white shadow-md -mt-10'>
                {cart?.length}
              </div>
            </div>
          </div>
        </div>
      </div>


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
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-auto max-w-md py-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="mt-2 ml-6">
                    <h1 className='transition-all duration-150 hover:text-xl text-slate-900' onClick={() => { navigate('/Product/women') }}>Women Fashion collection</h1>
                  </div>
                  <div className="mt-2 ml-6">
                    <h1 className='transition-all duration-150 hover:text-xl text-slate-900' onClick={() => { navigate('/Product/beauty%20product') }}>Beauty Products</h1>
                  </div>
                  <div className="mt-2 ml-6">
                    <h1 className='transition-all duration-150 hover:text-xl text-slate-900' onClick={() => { navigate('/Product/kid') }}>Kid Collection</h1>
                  </div>
                  <div className="mt-2 ml-6">
                    <h1 className='transition-all duration-150 hover:text-xl text-slate-900' onClick={() => { navigate('/Product/electronics') }}>Electronics Collection</h1>
                  </div>
                  <div className="mt-2 ml-6">
                    <h1 className='transition-all duration-150 hover:text-xl text-slate-900' onClick={() => { navigate('/Product/women') }}>Bridal Collection</h1>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-2 mt-2 ml-6">
                    <h1 className='font-semibold transition-all duration-150 hover:text-xl text-sky-900' onClick={() => { navigate('/All-Notes') }}>Take Some Notes</h1>
                    <span className='px-2 py-1 bg-sky-100 text-slate-700'>New</span>
                  </div>

                  <div className="mt-4 ml-6">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                  <div className='flex flex-col items-end justify-end w-screen h-auto mt-10 bg-slate-000'>
                    <div className='flex flex-col items-center justify-center w-auto h-auto px-4 py-3 bg-slate-100'>
                      {/* <h1 className=' text-sky-800'>Account : {user?.user?.email}</h1> */}
                      <h1 className=' text-sky-800'>Account : {user ? user?.user?.email : "Not login yet"}</h1>
                    </div>
                    <button className='px-4 py-3 font-semibold text-red-500 hover:text-black'>{!user?.user?.email ? <span onClick={() => { navigate('/Login') }}>Login</span> : <span onClick={logout}>Logout</span>}</button>
                  </div>

                  {/* <h1 className=' text-sky-800'>Admin Account :<br /> {user?.user?.email === "monika@gmail.com" ? "Thank you creator for creating me, Master!" : "Thank you creator for creating me, Master!"}</h1> */}


                  <div className="mx-6 mt-4 bg-blue-100">
                    {
                      // if user present show this
                      user?.user?.email === "monika@gmail.com" ?
                        <h1 className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-sky-800'>Admin Account :<br /> "Thank you creator for creating me, Master!"</h1>
                        :
                      // other wise show this
                        <h1 className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-sky-800'>Users Account :<br /> "Thank you for using our application, dear customer !"</h1>
                    }
                  </div>
                  <div className="mx-6 mt-4 bg-blue-100">

                    <h1 className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-sky-800'>Date of Creation - / Oct / 2024 </h1>
                  </div>
                  <div className="mx-6 mt-4 bg-blue-0">
                    {
                      user?.user?.email === "monika@gmail.com" ?
                        ""
                        :
                        <h1 className='inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-sky-800' onClick={() => { navigate('/Developer-Thinking') }}>"Developer Thinking"</h1>
                    }
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Hedaer