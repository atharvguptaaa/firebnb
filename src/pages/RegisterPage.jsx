import axios from 'axios'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
function RegisterPage() {
  
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
         await axios.post("/register",
            { name,
              email,
              password});
          alert("Registration successful")
        } catch (error) {
          alert("Registration failed")
        }
       
    
    }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='-mt-32'>
      <h1 className='text-4xl text-center'>Register</h1>
      <form className='max-w-md mx-auto p-4 'onSubmit={handleSubmit}>
        <input type="text" placeholder='John Doe'
        value={name}
        onChange={(e)=>{setName(e.target.value)}} />
        <input type="email" placeholder='your@email.com'
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        />
        <input type="password" placeholder='password'
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        />
        <button className='primary' >Register</button>
        <div className='text-center py-2'>
          Already have an account? <Link to="/login"><span className='text-primary'>Login</span></Link>
        </div>
      </form>
      </div>
     
    </div>
  )
}

export default RegisterPage