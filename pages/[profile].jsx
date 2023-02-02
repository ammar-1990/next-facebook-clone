import { useRouter } from "next/router"
import { useEffect ,useState} from "react"
import Header from "@/components/Header"
import { useDispatch, useSelector } from "react-redux"
import {LOGIN,SETUSER} from '../features/user/userSlice'
import { CameraIcon } from "@heroicons/react/solid"
import { PencilIcon } from "@heroicons/react/solid"
import InputContent from "@/components/InputContent"


import { db } from "@/firebase"
import Post from "@/components/Post"
import {
  collection,
 
  query,
  where,
  onSnapshot,
  getDocs 
 
} from "firebase/firestore";







const profile = () => {
  const [active,setActive]=useState('posts')
  const cBar =['posts','about','friends','photos','videos','check-ins','more']
const userInfo=useSelector(state=>state.user.userInfo)
const user =useSelector(state=>state.user.user)
    const route=useRouter()
   
const dispatch=useDispatch()
const [posts,setPosts]=useState([])




    
useEffect(()=>{
   dispatch(LOGIN(JSON.parse(localStorage.getItem('user'))))
   dispatch(SETUSER(JSON.parse(localStorage.getItem('userInfo'))))
  
 
    
    },[])


    useEffect(()=>{
      const waiting=setTimeout(()=>{!user&& route.push('/login')},100)
      if(user){
        const waiting = setTimeout(()=>{
       
          {  const q = query(
            collection(db, "posts"),
            where("userId", "==",user.id)
          );
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setPosts(list);
          });
          return () => unsubscribe();
        }
        
         },200)
        
         return ()=>clearInterval(waiting)
      }

      return ()=>clearInterval(waiting)
    },[user])

 









if(!user )
return <p>Loading...</p>
else
  return (
        
    <div>
    
        <Header />
     <div className="pt-14 flex justify-center shadow-md  ">
       <div className="w-full lg:w-8/12">
        <div className="w-full h-96 relative "><img className=" w-full h-full object-cover rounded-b-2xl" src={userInfo?.bg || 'data:image/jpeg;base64,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'} alt="" />
        
        <button className="absolute right-5 bottom-4 outline-none px-5 py-2 bg-white rounded-md text-md flex items-center gap-1 "><CameraIcon className="text-black w-6 h-6" /> Edit cover photo</button>
        </div>
        <div className="flex gap-3 h-40 p-6 relative w-full justify-between">
          <img style={{top:'-30px' ,left:'50px'}} className="absolute w-44 h-44 rounded-full border-4 border-white" src={userInfo.image} alt="" /> 
          <p className="ml-56 capitalize font-bold text-3xl">
            {userInfo.name}
            </p>

            <div className="flex gap-3">
              <button className="outline-none  flex items-center self-end bg-blue-600 gap-2 text-md text-white px-5 py-2 rounded-md"><span className="bg-white w-5 h-5 pb-1 rounded-full flex justify-center items-center text-2xl text-blue-600 ">+</span> Add to story</button>
              <button className="outline-none px-5 py-2 self-end bg-gray-100 rounded-md text-md flex items-center gap-1 "><PencilIcon className="text-black w-6 h-6" /> Edit profile</button>
            </div>
            </div>
        <div style={{width:'95%'}} className="py-1 m-auto flex theInput border-gray-300 items-center justify-between"> 
        <div className="flex">
          {cBar.map((el)=><div key={el} onClick={()=>setActive(el)} className={`p-4 ${active===el && 'bActive'} font-bold  relative capitalize cursor-pointer ${active===el?'text-blue-500' :'text-gray-500'}  ${active!==el && 'hover:bg-gray-200'}  rounded-xl `}>
            {el}
          </div>)}
        </div>
<div className=" rounded-xl text-2xl hover:bg-gray-200  flex items-center justify-center  w-10 h-10">
<span className="text-gray-500 pb-4 font-bold flex items-center justify-centerself-center cursor-pointer">...</span>
</div>
        
        </div>
        
         </div>



        </div>
        <div className="bg-gray-100 mt-1  px-2 pb-2">
          <div className="w-full lg:w-8/12 pt-3  m-auto flex gap-3">
<div style={{width:'42%'}} className="bg-white rounded-lg shadow-md"></div>
<div className=" flex-grow ">
  <InputContent noMargen={true} />
  {[...posts]?.sort((a,b)=>(new Date(b.timestamp)- new Date(a.timestamp))).map((el)=><Post key={el.id} el={el}/>)}

</div>

          </div>
        </div>
        </div>
        
  )
}

export default profile