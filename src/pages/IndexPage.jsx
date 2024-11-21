import axios from 'axios'
import React, { useEffect, useState } from 'react'

function IndexPage() {
  const [places,setPlaces]=useState([]);
  useEffect(()=>{
    axios.get('/places').then(response=>{
      console.log(response.data);
      
      setPlaces(response.data);
    })
  },[])
  return (
    <div className='p-6 mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length>0 && places.map(place=>(
         <div>
            <div className='bg-gray-500 rounded-2xl'>
            {place.photos?.[0] &&(<img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />)}
            </div>
            <h2 className='font-bold mt-2'>{place.address}</h2>
         <h3 className='text-sm truncate leading-3 text-gray-500'>{place.title}</h3>
         <div className='mt-1'>
         <span className='font-bold'>₹{place.price.toLocaleString('en-IN')}</span> per night

         </div>
       </div>
      )
      )
      }
      </div>
  )
}

export default IndexPage