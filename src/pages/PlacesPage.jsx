import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import { response } from "express";
export default function PlacesPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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
  
  async function addPhotoByLink(e){
    e.preventDefault();
    const {data:filename}=await axios.post("/upload-by-link",{link:photoLink});
    setAddedPhotos(prev=>{
        return [...prev,filename]
    })
    setPhotoLink('');
  }

  function uploadPhoto(e){
    e.preventDefault();
    const files =e.target.files;
    const data=new FormData();
    for(let i=0;i<files.length;i++){
        data.append('photos',files[i]);
    }
    axios.post('/upload',data,{
        headers:{'Content-type':'multipart/form-data'}
    }).then(response=>{
        const {data:filename}=response;
        setAddedPhotos(prev=>{
            return [...prev,filename]
        })
    })
  }

  const { action } = useParams();
  console.log(action);

  return (
    <div>
      {action != "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
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
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="Add using a link .....jpg"
              />
              <button className="bg-gray-200 px-4  rounded-2xl" onClick={addPhotoByLink}>
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

    {addedPhotos.length > 0 && addedPhotos.map(link => (
        <div key={link}>
            <img className="rounded-2xl" src={`http://localhost:4000/uploads/${link}`} alt="" />
        </div>
    ))}
    <label
     className="flex justify-center border items-center bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
        +
    </label>
</div>


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
      )}
    </div>
  );
}
