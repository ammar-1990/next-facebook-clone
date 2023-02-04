
import Link from "next/link"
const LikesList = ({setOpenLikes,likes}) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center  likes z-10 ">

        <div className="p-3 w-72 rounded-lg  bg-white relative mt-48 self-start shadow-md">
            <h2 className="text-gray-500 mt-1 ml-2">Likes</h2>
          <div className="flex flex-col gap-2 mt-2"> {
                likes.map((like)=>
             <Link onClick={()=>setOpenLikes(false)} href={`/${like.userEmail}`}>  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
<img src={like.userImage} className='w-10 h-10 rounded-full ' alt="" />
<span className="capitalize text-gray-500 ">{like.username}</span>
                </div></Link> )
            }
            </div> 
            <div
          className="absolute top-3 right-3  cursor-pointer bg-gray-100 flex items-center justify-center  w-8 h-8 rounded-full"
          onClick={() => setOpenLikes(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        </div>
    </div>
  )
}

export default LikesList