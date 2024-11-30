
import axios from "axios";
import { differenceInCalendarDays } from "date-fns/fp";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}){
    const [checkIn,setCheckIn]=useState("");
    const [checkOut,setCheckOut]=useState("");
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [selectedGuests,setSelectedGuests]=useState(1);
    const [redirect,setRedirect]=useState("");
    const {user}=useContext(UserContext);

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])
    async function bookThePlace(){
        const response = await axios.post('/bookings',{place:place._id,checkIn,checkOut,name,phone,guests:selectedGuests,price:numberOfNights*place.price})
        const bookingId=response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    let numberOfNights=0;
    if(checkIn&&checkOut){
        numberOfNights=differenceInCalendarDays(new Date(checkIn), new Date(checkOut));
    }
    return(
            <div className="bg-white shadow p-4 rounded-2xl">
                            <div className="text-2xl text-center">
                            Price: ₹{place.price} / per night
                            </div>
                            <div className="border rounded-2xl overflow-hidden">
                                <div className="grid grid-cols-2">
                                    <div className=" px-4 py-3 ">
                                        <label>Check In: </label>
                                        <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
                                    </div>
                                    <div className=" px-4 py-3 border-l">
                                        <label>Check Out </label>
                                        <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
                                    </div>
                                </div>
                                <div className=" px-4 py-3 border-t">
                                        <label>Number of Guests: </label>
                                        <input className="mx-3" type="range" min="1" max={place.maxGuests} value={selectedGuests} onChange={(e)=>setSelectedGuests(+e.target.value)} />
                                         {selectedGuests}
                                    </div>
                                    {numberOfNights>0 &&(<>
                                    <div className=" px-4 py-2 border-t">
                                        <label>Your Full Name: </label>
                                        <input className="mx-3 -my-1" type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                                        
                                    </div>
                                    <div className=" px-4 py-2  border-t">
                                        <label>Phone Number: </label>
                                        <input className="mx-3" type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                                        
                                    </div>
                                    </>
                                    )}
                                
                            </div>
                            <button onClick={bookThePlace} className="primary mt-4">Book this place
                                { numberOfNights>0 &&(
                                    <span> ₹{numberOfNights * place.price}</span>
                                )}
                                </button>
                        </div>
    )
}