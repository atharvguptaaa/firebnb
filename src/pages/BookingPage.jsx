import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingPage(){
    const[booking,setBooking]=useState([]);
    const { id } = useParams();

    useEffect(()=>{
        axios.get('/bookings').then(response=>{
         const foundBooking=response.data.find(({_id}) => _id===id);
         if(foundBooking){
          setBooking(foundBooking);
         }         
        })
    },[id])

    if(!booking){
      return '';
    }
    return(
        <>
   
        <div>
            
        </div>
        </>
    )
}