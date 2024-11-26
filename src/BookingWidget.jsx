import { useState } from "react";

export default function BookingWidget({place}){
    const [selectedGuests,setSelectedGuests]=useState(1);
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
                            <div className="text-2xl text-center">
                            Price: ₹{place.price} / per night
                            </div>
                            <div className="border rounded-2xl overflow-hidden">
                                <div className="grid grid-cols-2">
                                    <div className=" px-4 py-3 ">
                                        <label>Check In: </label>
                                        <input type="date" />
                                    </div>
                                    <div className=" px-4 py-3 border-l">
                                        <label>Check In: </label>
                                        <input type="date" />
                                    </div>
                                </div>
                                <div className=" px-4 py-3 border-t">
                                        <label>Max Guests: </label>
                                        <input className="mx-3" type="range" min="1" max={place.maxGuests} value={selectedGuests} onChange={(e)=>setSelectedGuests(e.target.value)} />
                                         {selectedGuests}
                                    </div>
                                
                            </div>
                            <button className="primary mt-4">Book this place</button>
                        </div>
    )
}