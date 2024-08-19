import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

function AccountPage() {
   const {user,setUser,ready}= useContext(UserContext)
   const navigate=useNavigate();

   let {subpage}=useParams();
   if(subpage===undefined){
     subpage="profile"
   }
   console.log(subpage);


    if(ready && !user ){
        return <Navigate to={'/login'}/>
    }
    if(!ready){
      return 'Loading...'
    }

  

    function LinkClasses(type=null){
      let classes="py-2 px-6";  
      if(type===subpage){
          classes+=" bg-primary text-white rounded-full";
        }
        return classes;
    }
    
    async function handleLogout(){  
     await axios.get("/logout")
     navigate("/") 
     setUser(null)
    }


  return (
    <>
    <div>
      <nav className='w-full flex justify-center gap-2 mt-8 mb-8'>
        <Link to={"/account"} className={LinkClasses("profile")}>My Profile</Link>
        <Link to={"/account/bookings"} className={LinkClasses('bookings')}>My Bookings</Link>
        <Link to={"/account/places"} className={LinkClasses('places')}>My Accomodation</Link>

      </nav>
      {subpage==="profile"&&(
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email}) <br/>
          <button onClick={handleLogout} className='primary text-white max-w-sm mt-2 '>Logout</button>
        </div>
      )

      }
    </div>
        </>
  )
}

export default AccountPage