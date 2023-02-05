import { useState } from "react"
import { useSelector } from "react-redux"
import FormInput from "./FormInput"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const EditProfile = ({setEdit}) => {
  const userInfo=useSelector(state=>state.user.userInfo)
const [input,setInput]=useState({
name:userInfo.name,
lastname:userInfo.lastname,
country:userInfo.country,
birthday:userInfo.birthday,
status:userInfo.status,
school:userInfo.school,
university:userInfo.university,



})


const inputs =[
  {
    id:1,
    name:'name',
    type:'text',
    placeholder:'Enter your first name',
    className:"input",
    required: true,
    pattern: "^[a-zA-Z]{2,15}$",
    false: "Enter a valid name between 2-20 letters with no special characters",
    value:input.name
  },
  {
    id:2,
    name:'lastname',
    type:'text',
    placeholder:'Enter your last name',
    className:"input",
    value:input.lastname
    
  
  },
  {
    id:3,
    name:'country',
    type:'text',
    placeholder:'Enter your country',
    className:"input",
    value:input.country
    
  
  },
  {
    id:4,
    name:'school',
    type:'text',
placeholder:'Enter your school name',
    className:"input",
    value:input.school,
    
  
  },
  {
    id:5,
    name:'university',
    type:'text',
placeholder:'Enter your university name',
    className:"input",
    value:input.university,
    
  
  },
]
const user=useSelector(state=>state.user.user)
const handleSubmit =async (e)=> {
  e.preventDefault()
  
  const washingtonRef = doc(db, "users", user.id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  ...input
});

}


const onChange=(e,el)=>{
  setInput(input=>({...input,[el.name]:e.target.value}))
}
  return (
    <div className='fixed w-full h-full top-0 left-0 flex items-center likes z-10 justify-center
    '>

        <form onSubmit={handleSubmit} className='p-10 flex flex-col gap-3 relative bg-white rounded-md shadow-md w-80'>
        {inputs.map((el)=><FormInput onChange={onChange} key={el.id} el={el} />)}

        <input type="date" className="outline-none p-2 cursor-pointer"value={input.birthday}  onChange={(e)=>setInput(input=>({...input,birthday:e.target.value}))}/>
        <select className="p-2 outline-none rounded-md" value={input.status} onChange={(e)=>setInput(input=>({...input,status:e.target.value}))}>
          <option></option>
          <option value="single">single</option>
          <option value="married">married</option>
        </select>

<div
          className="absolute top-2 right-2 cursor-pointer bg-gray-100 flex items-center justify-center  w-8 h-8 rounded-full"
          onClick={() => setEdit(false)}
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
<button className='bg-blue-500 text-white p-3 outline-none cursor-pointer'>Edit</button>
        </form>


    </div>
  )
}

export default EditProfile