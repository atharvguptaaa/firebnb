import axios from 'axios'
import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
function LoginPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const handleLoginSubmit=async (e)=>{
    e.preventDefault();
    try {
      await axios.post("/login",{email,password});
      alert("Login successful")
    } catch (error) {
      alert("Login failed")
    }
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
          Don't have an account yet? <Link to="/register"><span className='text-primary'>Register</span></Link>
        </div>
      </form>
      </div>
     
    </div>
  )
}

export default LoginPage