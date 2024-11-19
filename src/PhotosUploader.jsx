import axios from "axios";
import { useState } from "react";

export default function PhotoUploader({addedPhotos,onChange}){

  const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(e){
        e.preventDefault();
        try{
          const {data:filename}=await axios.post("/upload-by-link",{link:photoLink});
          onChange(prev=>{
              return [...prev,filename]
          })
          setPhotoLink('');
        }
        catch(error){
          console.error("Error uploading photo:", error);
          alert("Failed to upload the photo. Please try again.");
        }
        
      }
    
      function uploadPhoto(e){
        e.preventDefault();
        const files =e.target.files;
        const data=new FormData();
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i]);
        }
        // console.log("data "+data);
            axios.post('/upload',data,{
            headers:{'Content-type':'multipart/form-data'}
        }).then(response=>{
            const {data:filenames}=response;
            onChange(prev=>{
                return [...prev,...filenames];
            })
        })
      }

    return(
        <>
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
        <div className="h-36 flex w-full  " key={link}>
            <img className="rounded-2xl h-full w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt="" />
        </div>
    ))}
    <label
     className="h-36 flex justify-center border items-center bg-transparent rounded-2xl p-2 text-4xl text-gray-600 cursor-pointer">
        <input type="file" multiple className="hidden" onChange={uploadPhoto} />
        +
    </label>
</div>
        </>
    );
}