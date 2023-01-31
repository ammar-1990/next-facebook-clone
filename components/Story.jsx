import { useState } from "react"

const Story = ({el}) => {


    const [story,setStory]=useState(false)
  return (
    <div className="w-14 h-14 md:w-28 md:h-40  ">
    <div  className=' relative overflow-hidden hover:scale-105 hover:animate-pulse duration-300 rounded-full md:rounded-lg'>
            <div className="outlay cursor-pointer" onClick={()=>setStory(true)}></div>
           <img  src={el.image} className=' w-14 h-14 md:w-28 md:h-40  object-cover    ' alt="" />
           <img className="hidden absolute top-2 left-2 md:block w-9 h-9 rounded-full object-cover border-2  border-white cursor-pointer" src={el.profile} alt="" />
           <p className="absolute hidden md:block text-white bottom-2 left-2 capitalize cursor-pointer ">{el.name}</p>
       
        </div>

<div className={`fixed  ${story ? 'flex' : 'hidden'} top-0 left-0 w-full h-full  layout  justify-center items-center `}> <div className="relative"><img src={el.image} alt="" />
<div className="absolute top-0 right-0  bg-white text-red-600 cursor-pointer w-4 h-4 flex items-center justify-center" onClick={()=>setStory(false)}>X</div>
</div>
</div>
</ div>
  )
}

export default Story