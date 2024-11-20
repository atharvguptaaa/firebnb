import axios from 'axios'
import React, { useEffect, useState } from 'react'

function IndexPage() {
  const [places,setPlaces]=useState([]);
  useEffect(()=>{
    axios.get('/places').then(response=>{
      
      setPlaces(response.data);
    })
  },[])
  return (
    <div>
      {places.length>0 && places.map(place=>(
         <div>
            <div className='bg-gray-500'>
            {place.photos?.[0] &&(<img src={'http://localhost:4000/uploads/'+place.photos} alt="" />)}
            </div>
         {place.title}
       </div>
      )
      )
      }
      </div>
  )
}

export default IndexPage