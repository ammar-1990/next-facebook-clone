import { ThumbUpIcon } from "@heroicons/react/solid"
import { useSelector } from "react-redux"

const Comments = ({comment}) => {

    const userInfo=useSelector(state=>state.user.userInfo)
  return (
    <div className="flex gap-2 w-full">
<img className="w-9 h-9 rounded-full cursor-pointer" src={comment.userImage} alt="" />
<div className="flex flex-col ">
    <div className="p-2 rounded-2xl flex flex-col self-start bg-gray-200 relative ">
        <span className="font-bold capitalize ">{comment.username}</span>
        <span className="">{comment.commentTitle}</span>
        <div style={{top:'-10px',right:'-22px'}} className="absolute  cursor-pointer p-1 rounded-full flex  items-center shadow-md bg-white"><div className="w-4 bg-blue-700 h-4 rounded-full flex items-center justify-center"><ThumbUpIcon className="w-3 text-white" /></div> <span className="text-gray-500 text-xs">120</span></div>
        
        </div>
<div className="flex gap-4 items-center px-1">
<span className="text-gray-500 font-bold text-sm cursor-pointer">Like</span>
<span className="text-gray-500 text-xs"> {new Date(comment.timestamp).toDateString()}</span>

</div>


</div>


    </div>
  )
}

export default Comments