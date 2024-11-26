import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState("");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen overflow-y-auto">
        <div className="bg-black flex flex-col p-8 gap-4">
          <div className="mb-6">
            <h2 className="mx-37 text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className=" text-black bg-gray-50 fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl  shadow shadow-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              Close Photos
            </button>
          </div>
         
            <div className="grid grid-cols-2 gap-4">
            {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div   key={photo}
              className="overflow-hidden rounded-lg border border-gray-800">
                <img 
                  className="w-full h-full object-cover aspect-[4/3]"
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
            </div>

        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-50 -mx-8 px-12 pt-8">
      <div className="mx-20">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-1 mb-8 font-semibold underline -mx-1 my-2"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {place.address}
      </a>
      </div>

      <div className="relative mx-20">
  {/* Grid container with aspect ratio */}
  <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden aspect-[18/7]">
    {/* Left column (Photo 1) */}
    <div className="relative h-full w-full">
      {place.photos?.[0] && (
        <img
          onClick={() => setShowAllPhotos(true)}
          className="absolute  inset-0 h-full w-full object-cover bg-slate-600 cursor-pointer"
          src={"http://localhost:4000/uploads/" + place.photos[0]}
          alt=""
        />
      )}
    </div>

    {/* Right column (Photos 2 and 3) */}
    <div className="grid grid-rows-2 gap-y-2 h-full">
      {/* Top image (Photo 2) */}
      <div className="relative overflow-hidden">
        {place.photos?.[1] && (
          <img
            onClick={() => setShowAllPhotos(true)}
            className="absolute inset-0 h-full w-full object-cover bg-slate-600 cursor-pointer"
            src={"http://localhost:4000/uploads/" + place.photos[1]}
            alt=""
          />
        )}
      </div>

      {/* Bottom image (Photo 3) */}
      <div className="relative overflow-hidden">
        {place.photos?.[2] && (
          <img
            onClick={() => setShowAllPhotos(true)}
            className="absolute inset-0 h-full w-full object-cover bg-slate-600 cursor-pointer"
            src={"http://localhost:4000/uploads/" + place.photos[2]}
            alt=""
          />
        )}
      </div>
    </div>
  </div>

  {/* Show more photos button */}
  <button
    onClick={() => setShowAllPhotos(true)}
    className="flex gap-1 absolute bottom-3 right-3 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
        clipRule="evenodd"
      />
    </svg>
    Show More Photos
  </button>
</div>


      <div className=" mb-8 mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-In:{place.checkIn} <br />
          Check-Out:{place.checkOut} <br />
          Maximum Number of guests:{place.maxGuests}
        </div>

        <BookingWidget place={place} />
      </div>

      <div className="bg-white border-t -mx-8 px-8 py-8 ">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}