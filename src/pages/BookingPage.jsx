import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PhotosGallery from "../PhotosGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
    const [booking, setBooking] = useState(null); // Set initial state to null
    const { id } = useParams();

    useEffect(() => {
        axios.get('/bookings')
            .then((response) => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                } else {
                    console.log("Booking not found");
                }
            })
            .catch((error) => {
                console.error("Error fetching bookings:", error);
            });
    }, [id]);

    // Handle undefined or missing data gracefully
    if (!booking) {
        return <p>Loading...</p>;
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place?.title || 'Title not available'}</h1>
            <AddressLink place={booking.place} className="my-2 block"/>
            <div className="flex bg-gray-200 p-6 mb-4 my-6 rounded-2xl items-center justify-between">
              <div>
              <h2 className="text-2xl text-black mb-2">Your booking information: </h2>
              <BookingDates booking={booking}/>
              </div>
              <div className="bg-primary p-6 text-white rounded-2xl">
                <div>Total price:</div>
                <div className="text-3xl">₹{booking.price}</div> 
              </div>
              
            </div>
            <PhotosGallery place={booking.place}/>
        </div>
    );
}
