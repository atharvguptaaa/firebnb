import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'

function AccountPage() {
   const {user,ready}= useContext(UserContext)
    if(ready && !user ){
        return <Navigate to={'/login'}/>
    }
  return (
    <>
    <div>User is 
        {user?.name}</div>
        </>
  )
}

export default AccountPage