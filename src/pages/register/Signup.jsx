import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, fireDB } from '../../components/firebase/FireabseConfig';
import { Timestamp, collection, addDoc } from 'firebase/firestore'
import logo from "../../assets/Loading.svg"
const Signup = () => {
  // const []
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeLoading, setActiveLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async () => {
    if (name === '' && email === '' && password === '') {
      toast.error('Please fill all the field')
    }
    else if (!name) {
      toast.error('Please fill the name field')
    }
    else if (!email) {
      toast.error('Please fill the email field')
    }
    else {
      toast.error('Please fill the password field')
    }
    // else{
    //   toast.success('Now, we are creating your account!')
    // }
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password)
      // alert(users)
      setActiveLoading(true)
      console.log(users)
      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now()
      }

      // Store email in local storage
      localStorage.setItem('user', JSON.stringify(users))

      const userRef = collection(fireDB, "users")
      await addDoc(userRef, user)
      toast.success('Now, we are creating your account!')
      setName("")
      setEmail("")
      setPassword("")
      setTimeout(() => {
        navigate("/")
        setActiveLoading(false)
      }, [1500])
    }
    catch (err) {
      // alert(err.code)
      toast.error(err.code)
      setActiveLoading(false)
      if (err.code === 'auth/email-already-in-use') {
        navigate('/Login')
      }
      if (err === "auth/email-already-exists") {
        alert('account already exit')
        toast.error(err.code)
      }
    }
  }
  return (
    <div>
      {/* For laptop */}
      <div className='items-center justify-center hidden w-screen h-screen lg:flex '>
        <div className='absolute flex items-center w-screen h-screen bg-white justify-evenly'>
          <div className=' -mb-[16rem] rounded-full h-60 w-60 bg-sky-300'></div>
          <div className='-mt-[10rem] -ml-[10rem] bg-green-500 rounded-full h-60 w-60'></div>
          <div className='absolute flex items-center w-screen h-screen -mr-20 bg-white/20 backdrop-blur-3xl justify-evenly'></div>
          <div className='absolute flex items-center w-screen h-screen ml-[20rem] bg-white/0 backdrop-blur-3xl justify-evenly'></div>
        </div>
        <div className=' h-[32rem] flex flex-col gap-10 justify-center items-center mx-auto w-[36rem] bg-slate-400/20 border-black/30 border-2 rounded-lg  z-20'>
          <h1 className='text-2xl font-customFont'>Cteate Account</h1>
          <div className='flex flex-col items-center justify-center w-auto h-auto gap-5'>

            <div className='flex flex-col items-start justify-between'>
              <h1>Name</h1>
              <input
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                className=' h-[3rem] w-[25rem] bg-slate-50 rounded-[0.3rem] ' type="text" />
            </div>
            <div className='flex flex-col items-start justify-between'>
              <h1>Email</h1>
              <input
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} className=' h-[3rem] w-[25rem] bg-slate-50 rounded-[0.3rem] ' type="email" />
            </div>
            <div className='flex flex-col items-start justify-between'>
              <h1>Password</h1>
              <input
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className=' h-[3rem] w-[25rem] bg-slate-50 rounded-[0.3rem] ' type="password" />
              <div className=' h-auto flex pt-3 w-[25rem] justify-end items-end'>
                <h1>have an account?<u><Link to='/Login'>Login</Link></u></h1>
              </div>
            </div>
            <div className='flex flex-col items-start justify-between'>
              <button onClick={signup} className=' h-[3rem] w-[25rem] flex justify-center items-center bg-gradient-to-r from-sky-400 to-green-500 text-white rounded-md'>{activeLoading ? <img className=' h-[3rem] mx-auto' src={logo} /> : "Create account"}</button>
              {/* <button onClick={signup} className=' h-[3rem] w-[25rem] bg-gradient-to-r from-sky-400 to-green-500 text-white rounded-md'>Create account</button> */}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      {/* For Mobile */}
      <div className='flex flex-col items-center justify-center w-screen h-[85vh] gap-2 text-white bg-slate-800 lg:hidden'>
        <h1 className='text-lg font-semibold'>Creaing Account</h1>
        <div className='flex flex-col '>
          <input
            value={name}
            onChange={(e) => { setName(e.target.value) }} placeholder='Full Name' className=' placeholder:font-semibold placeholder:pl-2 pl-2 outline-none h-[3rem] w-[80vw] bg-slate-600 rounded-md' type="text" name="" id="" />
        </div>
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
        <button onClick={signup} className={` ${activeLoading?"bg-white-0": "bg-white"} h-[3rem] w-[80vw]  text-slate-900 `}>
          {
            activeLoading ?
              <div className=' h-[3rem] mx-auto w-[4rem] justify-center items-center flex'>
                <img className='' src={logo} alt="" />
              </div> :
              
              "Create account " 
          }
        </button>
        <div className=' h-auto w-[80vw] bg-white-0 textwhite flex justify-end items-end'>
          <Link to={'/Login'}>alredy have an account?<span className='text-blue-300'><u>login</u></span></Link>
        </div>
      </div>
    </div>
  )
}

export default Signup


