import axios from 'axios'
import { useContext, useState } from 'react'
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
function LoginPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [redirect,setRedirect]=useState(false)

  const {setUser}=useContext(UserContext)

  const handleLoginSubmit=async (e)=>{
    e.preventDefault();
    try {
      const response= await axios.post("/login",{email,password});
      alert("Login successful")
      setRedirect(true)
      setUser(response.data)
    } catch (error) {
      alert("Login failed ")
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='-mt-32'>
      <h1 className='text-4xl text-center'>Login</h1>
      <form className='max-w-md mx-auto p-4' onSubmit={handleLoginSubmit}>
        <input type="email" placeholder='your@email.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className='primary'>Login</button>
        <div className='text-center py-2'>
          Don&apost have an account yet? <Link to="/register"><span className='text-primary'>Register</span></Link>
        </div>
      </form>
      </div>
     
    </div>
  )
}

export default LoginPage