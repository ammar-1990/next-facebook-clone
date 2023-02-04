import { useSelector } from "react-redux"
import { CameraIcon } from "@heroicons/react/solid"
import { VideoCameraIcon } from "@heroicons/react/solid"
import {EmojiHappyIcon} from "@heroicons/react/outline"
import Link from "next/link"
import Emoji from "./Emoji"
import { useState ,useRef,useEffect} from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import {db,storage} from '../firebase'

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const InputContent = ({noMargen}) => {
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
if(text.trim()===''&&!image) return
else {

  try{ 
    
    const docRef = await addDoc(collection(db, "posts"), 
  {
   
    userId:user.id,
    username:userInfo.name,
    lastname:userInfo.lastname,
    userEmail:user.email,
    userImage:userInfo.image,
    postTitle:text,
    imageURL:imageURL,
    timestamp:new Date().toLocaleString()
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
    <div style={{marginTop:noMargen? '0' :'20px',}} className={`p-4 pb-0 ${noMargen && 'mb-3'} bg-white rounded-lg self-center w-full  shadow-md`}>
        <form  onSubmit={handleSubmit} className="flex gap-1 w-full items-center">
          <Link href={`/${userInfo.email}`}> <img className="rounded-full w-10 h-10 cursor-pointer" src={userInfo.image} alt="" /></Link> 
            <input className=" rounded-full bg-gray-100 text-gray-700 py-2 px-4 flex-grow outline-none" type="text" placeholder={`What,s in your mind ${userInfo.name} ?`} value={text}  onChange={(e)=>setText(e.target.value)}/>
            <button className="hidden"></button>
            {image && <div className="   duration-300  flex flex-col items-center">
              <img  className="w-8 h-8   object-contain " src={URL.createObjectURL(image)} alt="" />
              <p className="text-red-500 text-xs cursor-pointer" onClick={()=>{setImage(null);setImageURL('')}}>Remove</p>
              </div>}
        </form>
<div className="w-full flex py-2 mt-3 theInput border-gray-300 justify-between">
   
        <Emoji Icon={VideoCameraIcon} title='Live Video' color='text-red-500' />
       
       
    <div onClick={()=>fileRef.current.click()}>
    <Emoji Icon={CameraIcon} title='Photo / Video' color='text-green-400' />
    <input type="file" hidden ref={fileRef} onChange={(e)=>setImage(e.target.files[0])}/>
    </div>
    
    
        
        
   
    
    <Emoji Icon={EmojiHappyIcon} title='Feeling / Activity' color='text-yellow-400' />
   
        

   
</div>

    </div>
  )
}

export default InputContent