import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'

function ProfilePage() {
   const {user,setUser,ready}= useContext(UserContext)
   const navigate=useNavigate();

   let {subpage}=useParams();
   if(subpage===undefined){
     subpage="profile"
   }
  //  console.log(subpage);


    if(ready && !user ){
        return <Navigate to={'/login'}/>
    }

    if(!ready){
      return 'Loading...'
    }

  

    
    async function handleLogout(){  
     await axios.get("/logout")
     navigate("/") 
     setUser(null)
    }


  return (
    <> 
    <div>
      <AccountNav/>
      {subpage==="profile"&&(
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email}) <br/>
          <button onClick={handleLogout} className='primary text-white max-w-sm mt-2 '>Logout</button>
        </div>
      )

      }

      {subpage==='places'&&(
        <PlacesPage/>
      )}
    </div>
        </>
  )
}

export default ProfilePage