import { useSelector } from "react-redux"
import { CameraIcon } from "@heroicons/react/solid"
import { VideoCameraIcon } from "@heroicons/react/solid"
import {EmojiHappyIcon} from "@heroicons/react/outline"
import Emoji from "./Emoji"
import { useState ,useRef,useEffect} from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import {db,storage} from '../firebase'
import { nanoid } from '@reduxjs/toolkit'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const InputContent = () => {
const userInfo=useSelector(state=>state.user.userInfo)
const user=useSelector(state=>state.user.user)
const [text,setText] =useState('')
const [image,setImage]=useState(null)
const [imageURL,setImageURL]=useState('')

useEffect(() => {
  const uploadImage = () => {
    const name = new Date().getTime() + image.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, image);

   
    uploadTask.on(
      "state_changed",
      (snapshot) => {
       
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
       
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
    
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  image && uploadImage();

}, [image]);







const handleSubmit = async(e)=> {
e.preventDefault()
if(!text&&!image) return
else {

  try{ 
    
    const docRef = await addDoc(collection(db, "posts"), 
  {
    postId:nanoid(),
    userId:user.id,
    username:userInfo.name,
    userEmail:user.email,
    userImage:userInfo.image,
    postTitle:text,
    imageURL:imageURL,
    timestamp:serverTimestamp()
   }
   );
 
  }
   catch(err) {
    console.log(err)
    
   }
 setImage(null)
 setImageURL('')
 setText('')
}

}

const fileRef=useRef()
  return (
    <div className="p-4 bg-white rounded-lg self-center w-full  shadow-md">
        <form  onSubmit={handleSubmit} className="flex gap-1 w-full items-center">
            <img className="rounded-full w-10 h-10 cursor-pointer" src={userInfo.image} alt="" />
            <input className=" rounded-full bg-gray-100 text-gray-700 py-2 px-4 flex-grow outline-none" type="text" placeholder={`What,s in your mind ${userInfo.name} ?`} value={text}  onChange={(e)=>setText(e.target.value)}/>
            <button className="hidden"></button>
            {image && <div className=" hover:scale-105 filter hover:brightness-110 duration-300 cursor-pointer flex flex-col items-center">
              <img  className="w-8 h-8   object-contain " src={URL.createObjectURL(image)} alt="" />
              <p className="text-red-500 text-xs" onClick={()=>{setImage(null);setImageURL('')}}>Remove</p>
              </div>}
        </form>
<div className="w-full flex py-2 mt-3 border-t-2 border-gray-300 justify-between">
   
        <Emoji Icon={VideoCameraIcon} title='Live Video' color='red' />
       
       
    <div onClick={()=>fileRef.current.click()}>
    <Emoji Icon={CameraIcon} title='Photo / Video' color='blue' />
    <input type="file" hidden ref={fileRef} onChange={(e)=>setImage(e.target.files[0])}/>
    </div>
    
    
        
        
   
    
    <Emoji Icon={EmojiHappyIcon} title='Feeling / Activity' color='yellow' />
   
        

   
</div>

    </div>
  )
}

export default InputContent