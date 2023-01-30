import Image from "next/image"
import { ChatAltIcon,ThumbUpIcon,ShareIcon } from "@heroicons/react/outline"

const Post = ({el}) => {
  return (
    <div className="w-full bg-white  rounded-lg rounded-b-2xl shadow-md">
<div className="flex items-center p-3 gap-2">
    <img className="w-10 h-10 rounded-full object-cover cursor-pointer" src={el.userImage} alt="" />

    <div >
        <p className="font-bold capitalize cursor-pointer">{el.username}</p>
        <p className="date text-gray-500">{el.timestamp}</p>
    </div>
   
</div>
<p className=" p-3">{el.postTitle}</p>

{el.imageURL && 
<div className="relative h-96 cursor-pointer"> <Image src={el.imageURL} layout='fill' objectFit="cover" unoptimized alt="wrong" /></div>
 }

<div className="flex justify-center father border-gray-300">
    <div className="tools rounded-bl-2xl hover:bg-gray-200"><ThumbUpIcon className="w-6"/> Like</div>
    <div className="tools  hover:bg-gray-200"><ChatAltIcon  className="w-6"/> Comment</div>
    <div className="tools rounded-br-2xl hover:bg-gray-200"> <ShareIcon className="w-6" />Share</div>
</div>

    </div>
    
  )
}

export default Post