import PhotoUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react"; 
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";


export default function PlacesFormPage(){
    const {id}=useParams();

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
    const [price, setPrice] = useState(0);

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data}=response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
            
        })
    },[id])


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

      async function savePlace(e){
        e.preventDefault();
        const placeData={title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price}
        if(id){
            await axios.put('/places',{id,...placeData});
        
            setRedirect(true);
        }
        else{
            await axios.post('/places',placeData);
        
            setRedirect(true);
        }
        
      
      } 

      if(redirect){
        return <Navigate to={'/account/places'}/>
      }
  

    return(
        <div>
          <AccountNav/>
          <form onSubmit={savePlace}>
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

            {preInput(
              "Price Per Night",
              "In Indian Rupees(INR)"
            )}
            <div className="gap-2 ">
              <div>
                <input
                  type="number" placeholder="5000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            
            </div>

            <button className="primary my-4">Save</button>
          </form>
        </div>
    );
}