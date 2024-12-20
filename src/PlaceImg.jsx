import React from 'react'

function PlaceImg({place,index=0,className=null}) {

    if(!place.photos?.length){
        return '';
    }
    if(className==null){
        className='object-cover h-full w-full grow shrink-0';
    }
  return (
 
                  <img className={className} src={"http://localhost:4000/uploads/"+place.photos[index]} alt="" />


  )
}

export default PlaceImg