import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function AccountPage() {
   const {user,ready}= useContext(UserContext)
    if(ready && !user ){
        return <Navigate to={'/login'}/>
    }
    if(!ready){
      return 'Loading...'
    }
  return (
    <>
    <div>
      <nav className='w-full flex justify-center gap-2 mt-8'>
        <Link to={"/account"} className="py-2 px-6 bg-primary text-white rounded-full">My Profile</Link>
        <Link to={"/account/bookings"} className="py-2 px-6">My Bookings</Link>
        <Link to={"/account/places"} className="py-2 px-6">My Accomodation</Link>

      </nav>
    </div>
        </>
  )
}

export default AccountPage