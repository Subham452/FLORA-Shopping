import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../components/firebase/FireabseConfig'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../assets/Loading.svg"
const Login = () => {
  // const []
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeLoading, setActiveLoading] = useState(false);

  const singnin = async () => {
    if (!email && !password) {
      toast.error("Please fill all the field");
    }
    else if (!email) {
      toast.error("Please fill the email field");
    }
    else {
      toast.error("Please fill the password field");
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      // await signInWithEmailAndPassword(auth,email,password)
      toast.success("Login Successfully")
      setActiveLoading(true)
      localStorage.setItem('user', JSON.stringify(result))


      // Store email in local storage
      // localStorage.setItem('userEmail', users.user.email);
      setTimeout(() => {
        setActiveLoading(false)
        navigate('/')
      }, [1500])
    }
    catch (err) {
      toast.error(err.code)
    }
  }
  return (
    <div>
      <div className='items-center justify-center hidden w-screen h-screen lg:flex '>
        <div className='absolute flex items-center w-screen h-screen bg-white justify-evenly'>
          <div className=' -mb-[16rem] rounded-full h-60 w-60 bg-sky-300'></div>
          <div className='-mt-[10rem] -ml-[10rem] bg-green-500 rounded-full h-60 w-60'></div>
          <div className='absolute flex items-center w-screen h-screen -mr-20 bg-white/20 backdrop-blur-3xl justify-evenly'></div>
          <div className='absolute flex items-center w-screen h-screen ml-[20rem] bg-white/0 backdrop-blur-3xl justify-evenly'></div>
        </div>
        <div className=' h-[27rem] flex flex-col gap-10 justify-center items-center mx-auto w-[36rem] bg-slate-400/20 border-black/30 border-2 rounded-lg  z-20'>
          <h1 className='text-2xl font-customFont'>Login</h1>
          <div className='flex flex-col items-center justify-center w-auto h-auto gap-5'>
            <div className='flex flex-col items-start justify-between'>
              <h1>Email</h1>
              <input value={email} onChange={(e) => { setEmail(e.target.value) }} className=' h-[3rem] w-[25rem] bg-slate-50 rounded-[0.3rem] ' type="email" />
            </div>

            <div className='flex flex-col items-start justify-between'>
              <h1>Password</h1>
              <input value={password} onChange={(e) => { setPassword(e.target.value) }} className=' h-[3rem] w-[25rem] bg-slate-50 rounded-[0.3rem] ' type="password" />
              <div className=' h-auto flex pt-3 w-[25rem] justify-end items-end'>
                <h1>not have an account?<u><Link to='/Signup'>Create-Account</Link></u></h1>
              </div>
            </div>
            <div className='flex flex-col items-start justify-between'>
              <button onClick={singnin} className=' h-[3rem] w-[25rem] bg-gradient-to-r from-sky-400 to-green-500 text-white rounded-md'>{activeLoading ? <img className=' h-[3rem] mx-auto' src={logo} /> : "Login"}</button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      {/* For Mobile */}
      <div className='flex flex-col items-center justify-center w-screen h-[85vh] gap-2 text-white bg-slate-800 lg:hidden'>
        <h1 className='text-lg font-semibold'>Login Account</h1>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col '>
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' className=' placeholder:font-semibold placeholder:pl-2 pl-2 outline-none h-[3rem] w-[80vw] bg-slate-600 rounded-md' type="email" name="" id="" />
          </div>
          <div className='flex flex-col '>
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' className=' placeholder:font-semibold placeholder:pl-2 pl-2 outline-none h-[3rem] w-[80vw] bg-slate-600 rounded-md' type="password" name="" id="" />
          </div>
          {/* <button onClick={singnin} className=' h-[3rem] w-[80vw] bg-white text-slate-900'>
            Signin account
          </button> */}
          
        <button onClick={singnin} className={` ${activeLoading?"bg-white-0": "bg-white"} h-[3rem] w-[80vw]  text-slate-900 `}>
          {
            activeLoading ?
              <div className=' h-[3rem] mx-auto w-[4rem] justify-center items-center flex'>
                <img className='' src={logo} alt="" />
              </div> :
              
              "Login account " 
          }
          </button>
          <div className=' h-auto w-[80vw] bg-white-0 textwhite flex justify-end items-end'>
            <Link to={'/Signup'}>don't have an account?<span className='text-blue-300'><u>signup</u></span></Link>
          </div>
        </div>
      </div>
      </div>
      )
}

      export default Login
