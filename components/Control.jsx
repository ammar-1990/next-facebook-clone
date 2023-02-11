import { useState } from "react"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

const Control = ({editRef,setEdit,el,setEditI,type}) => {

    const [open ,setOpen]=useState(false)


    const handleEdit =()=> {
setOpen(false)
setEdit(true)
setTimeout(()=>{editRef.current.focus();

    type==='posts' ?setEditI(el.postTitle) : setEditI(el.commentTitle)
},150)


    }


    const handleDelete=async()=> {
        setOpen(false)
        await deleteDoc(doc(db, type,type==='posts'? el.id : el.commentId));
    }
  return (
    <div className="relative cursor-pointer ml-auto z-10">
<div className="text-2xl text-gray-500 font-bold flex self-start  p-1 rounded-full hover:bg-gray-200" onClick={()=>setOpen(prev=>!prev)}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
</svg></div>
<div  className={`${open ? 'flex' : 'hidden'} absolute  right-0  flex-col  p-1 rounded-md shadow-md bg-white`}>
<span onClick={handleEdit} className="px-3 py-1 hover:bg-gray-200 rounded-md  text-gray-500 cursor-pointer flex gap-1 items-center"><span><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg></span> Edit</span>
<span onClick={handleDelete} className="px-3 py-1 hover:bg-gray-200 rounded-md  text-gray-500 cursor-pointer flex gap-1 items-center"><span><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg></span> Delete</span>
</div>

    </div>
  )
}

export default Control