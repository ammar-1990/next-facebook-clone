import Image from "next/image"
import { ChatAltIcon,ThumbUpIcon,ShareIcon } from "@heroicons/react/outline"
import {ThumbUpIcon as Two} from "@heroicons/react/solid"
import { useState ,useRef ,useEffect} from "react"
import { useSelector } from "react-redux"
import { collection, addDoc,query, where, onSnapshot  } from "firebase/firestore"; 
import { db } from "@/firebase"

const Post = ({el}) => {
  const [open , setOpen]=useState(false)
  const userInfo=useSelector(state=>state.user.userInfo)
  const titleRef=useRef()
  const [comments,setComments]=useState([])
 
const handleSubmit = async(e)=> {
  e.preventDefault()
 console.log(el.id)
  if(titleRef.current.value)
  {
    try{  const docRef = await addDoc(collection(db, "comments"), {
      postId:el.id,
      userId:el.userId,
      userImage:el.userImage,
      username:el.username,
      userEmail:el.userEmail,
      commentTitle:titleRef.current.value,
      timestamp:new Date().toLocaleString()
      });
    
    }
      catch(err){
        console.log(err)
      }
  
  }
  titleRef.current.value=''
}


useEffect(()=>{
  const q = query(collection(db, "comments"), where("postId", "==", el.id));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const list = [];
    querySnapshot.forEach((doc) => {
        list.push({commentId:doc.id,...doc.data()});
        
    });
  setComments(list)

  });
return ()=>unsubscribe()
},[])

  return (
    <div className="my-5 w-full bg-white  rounded-lg rounded-b-2xl shadow-md">
<div className="flex items-center p-3 gap-2">
    <img className="w-10 h-10 rounded-full object-cover cursor-pointer" src={el.userImage} alt="" />

    <div >
        <p className="font-bold capitalize cursor-pointer">{el.username}</p>
        <p className="date text-gray-500">{el.timestamp}</p>
    </div>
   
</div>
<p className=" p-3">{el.postTitle}</p>

{el.imageURL && 
<div className="relative h-96 cursor-pointer" onClick={()=>setOpen(true)}> <Image src={el.imageURL} layout='fill' objectFit="cover" unoptimized alt="wrong" /></div>
 }
<div className="pt-2 px-4 pb-0">

  <div className="flex items-center justify-between py-1">
    <div className="flex gap-2 items-center ">
      <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer"><Two className="text-white w-3 "/>
       </div>
       <span className="text-gray-500 cursor-pointer">likes</span>

    </div>
    <div className="flex items-center gap-2">

<span className="text-gray-500 cursor-pointer">comments</span>
      <div> <ChatAltIcon className="w-5 text-gray-500 cursor-pointer" /></div>


    </div>
  </div>
  <div className="flex justify-center father border-gray-300  p-1">
    <div className="tools text-xs lg:text-md hover:bg-gray-200"><ThumbUpIcon className="w-4 md:w-6"/> Like</div>
    <div className="tools text-xs lg:text-md hover:bg-gray-200"><ChatAltIcon  className="w-4 md:w-6"/> Comment</div>
    <div className="tools text-xs lg:text-md hover:bg-gray-200"> <ShareIcon className="w-4 md:w-6" />Share</div>
</div>

<div>

  <form onSubmit={handleSubmit} className="w-full flex gap-2 items-center py-3 theInput border-gray-300">
    <img className="w-10 h-10 rounded-full" src={userInfo?.image} alt="" />
    <input ref={titleRef}  placeholder="Write a comment..."  type="text" className="flex-grow rounded-full px-4 py-2 outline-none bg-gray-200" />
  </form>
  {comments?.map((comment)=><div>{comment.commentTitle}</div>)}
</div>

</div>

<div className={`fixed ${open ? 'block' : 'hidden'} top-0 left-0 w-full h-full layout flex justify-center items-center`}>
  <div className="relative"><img src={el.imageURL}  alt="" />
  <div onClick={()=>setOpen(false)} className="absolute top-0 right-0  bg-white text-red-600 cursor-pointer w-4 h-4 flex items-center justify-center">X</div>
  </div>


</div>
    </div>
    
  )
}

export default Post