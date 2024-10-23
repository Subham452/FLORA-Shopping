import React,  { useEffect, useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../assets/kashmir-banner-home.webp"
import logo1 from "../assets/europe-banner-home.webp"
import logo2 from "../assets/azerbaijan-banner-home.webp"
import logo3 from "../assets/kerla-banner-home.webp"
import logo4 from "../assets/rajasthan-banner-home.png"

// VIDEO
import video from '../assets/fashion.mp4'
const Heropage = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    control:false,
  };

  
const videoEl = useRef(null);

const attemptPlay = () => {
  videoEl &&
    videoEl.current &&
    videoEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
};

useEffect(() => {
  attemptPlay();
}, []);



  const navigate = useNavigate()
  return (
    <div>
      {/* For Mobile */}
      <div className=' h-[35rem] lg:hidden md:hidden w-screen bg-slate-000 flex flex-col justify-between items-center'>
        {/* Slider */}
        <div className='w-screen h-auto bg-slate-200'>
          {/* Carousile */}
          <div className="cursor-pointer slider-container">
            <Slider {...settings}>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-[35rem] h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Top Quality Products' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Top Quality Products</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20'>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Best Collection' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://plus.unsplash.com/premium_photo-1683121263622-664434494177?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfDF8MHx8fDA%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Best Collection</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20' onClick={()=>{ navigate('/Product/:women')}}>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Perfect Pair' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Perfect Pair</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20' onClick={()=>{ navigate('/Product/:trend')}}>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Top Quality Beauty Products' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://images.unsplash.com/photo-1620674283252-46a662260a04?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Top Quality Beauty Products</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20' onClick={()=>{ navigate('/Product/:beauty%20product')}}>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Best Bridal Collection' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://images.unsplash.com/photo-1710090411838-5f846e289b2e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1" onClick={()=>{ navigate('/Product/:wedding')}}>Best Bridal Collection</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20'>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Earings Collection' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://plus.unsplash.com/premium_photo-1675107359685-f268487a3a46?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Earings Collection</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20' onClick={()=>{ navigate('/Product/:earing')}}>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Women Collection' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://plus.unsplash.com/premium_photo-1675186049563-000f7ac02c44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Women Collection</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20' onClick={()=>{ navigate('/Product/:women')}}>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Winter Collection' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://plus.unsplash.com/premium_photo-1708275303014-c9d5f5d572e1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Winter Collection</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20' onClick={()=>{ navigate('/Product/:winter')}}>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Party Collection' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://images.unsplash.com/photo-1694316904445-58d04c3815c1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Party Collection</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20' onClick={()=>{ navigate('/Product/:party')}}>Browse Now</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center ">
                <div className=" h-auto lg:h-20 w-screen absolute bg-black/0 justify-center items-center text-white flex mt-20 z-[100]">
                </div>
                <div className=' lg:h-auto h-[33rem] w-full object-cover flex flex-col justify-between items-center' >
                  <img alt='Simple Design Cloths' className='h-[33rem] w-screen flex justify-center items-center object-cover' src={"https://images.unsplash.com/photo-1571513721963-d855fd8df4c2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                  <div className=' flex flex-col justify-end pb-[0.5rem] items-center absolute h-[33rem] w-screen bg-gradient-to-t from-black/80 to-transparent via-transparent'>
                    <h1 className="text-xl font-thin text-white font-customFont1">Simple Design Cloths</h1>
                    <button className='w-auto h-auto px-3 py-3 font-semibold text-white shadow-md bg-white/20' onClick={()=>{ navigate('/Product/:simple')}}>Browse Now</button>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* For Laptop */}
      <div className='flex-col items-center justify-center hidden w-screen h-auto lg:flex'>
        <div>
          
        <video
          style={{ maxWidth: "100%", width: "100vw", margin: "0 auto" }}
          playsInline
          loop
          muted
          // controls
          alt="All the devices"
          src={video}
          ref={videoEl}
        />
      </div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default Heropage



