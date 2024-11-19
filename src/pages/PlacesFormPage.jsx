import PhotoUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState } from "react"; 
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";


export default function PlacesFormPage(){

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState("");
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState("");
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);


    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
      }
    
      function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
      }
    
      function preInput(header, description) {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        );
      }

      async function addNewPlace(e){
        e.preventDefault();
        console.log(addedPhotos);
        
        await axios.post('/places',{title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests});
        
        setRedirect(true);
      } 

      if(redirect){
        return <Navigate to={'/account/places'}/>
      }
  

    return(
        <div>
          <AccountNav/>
          <form onSubmit={addNewPlace}>
            {preInput(
              "Title",
              "title for your place, should be short and catchy"
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="eg: My Lovely Apartment"
            />

            {preInput("Address", "address to this place")}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />

            {preInput("Photos", "more=better")}
            
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

            {preInput("Description", "complete description of the place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id=""
            ></textarea>

            {preInput("Perks", "select all the perks of your place")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {preInput("Extra Info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            {preInput(
              "Check In & Out times",
              "add check in and check out times"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check In time</h3>
                <input
                  type="number" placeholder="12"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out time</h3>
                <input
                  type="number" placeholder="14"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of Guests</h3>
                <input
                  type="number" placeholder="8"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
    );
}