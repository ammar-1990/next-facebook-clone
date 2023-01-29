import { useSelector } from "react-redux"
import { CameraIcon } from "@heroicons/react/solid"
import { VideoCameraIcon } from "@heroicons/react/solid"
import {EmojiHappyIcon} from "@heroicons/react/outline"
import Emoji from "./Emoji"
import { useState } from "react"

const InputContent = () => {
const userInfo=useSelector(state=>state.user.userInfo)
const [text,setText] =useState('')


const handleSubmit =(e)=> {
e.preventDefault()
setText('')
}


  return (
    <div className="p-4 bg-white rounded-lg self-center w-full lg:w-11/12 shadow-md">
        <form  onSubmit={handleSubmit} className="flex gap-1">
            <img className="rounded-full w-10 h-10 cursor-pointer" src={userInfo.image} alt="" />
            <input className="rounded-full bg-gray-100 text-gray-700 p-2 flex-grow outline-none" type="text" placeholder={`What,s in yor mind ${userInfo.name}`} value={text}  onChange={(e)=>setText(e.target.value)}/>
            <button className="hidden"></button>
        </form>
<div className="w-full flex py-2 mt-3 border-t-2 border-gray-300 justify-between">
   
        <Emoji Icon={VideoCameraIcon} title='Live Video' color='red' />
       
       
    
    
    <Emoji Icon={CameraIcon} title='Photo / Video' color='blue' />
        
        
   
    
    <Emoji Icon={EmojiHappyIcon} title='Feeling / Activity' color='yellow' />
   
        

   
</div>

    </div>
  )
}

export default InputContent