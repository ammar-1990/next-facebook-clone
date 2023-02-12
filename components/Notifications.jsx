


import { useSelector } from "react-redux";


const Notifications = () => {




const notes=useSelector(state=>state.data.notes)
const userInfo=useSelector(state=>state.user.userInfo)


  return (
    <div className="p-2 bg-white shadow-md rounded-md absolute  right-5 notes">


        <h2 className="font-bold text-2xl p-2">Notifications</h2>

        {notes.length>0 &&[...notes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((el)=><div className="flex items-center gap-3 p-1 rounded-md hover:bg-gray-200 mb-2 cursor-pointer">
<img src={el.userImage} className='h-12 w-12 rounded-full' alt="" />
<div className="flex flex-col text-sm">
    <div>
        <span className="capitalize font-bold">{el.username}</span> 
<span >  {`${el.type ==='comment'? 'commented on your comment. ': 'liked your comment.'}`}</span>

</div>
<span className="text-gray-500 text-xs">"{el.postTitle?.length <20 ?el.postTitle : el.postTitle?.slice(0,19) + '...' }"</span>

<span className="text-xs text-gray-500">{el.timestamp}</span>
</div>
</div>) }
    </div>
  )
}

export default Notifications