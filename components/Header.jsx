import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import HeaderIcon from "./HeaderIcon";
import { FlagIcon, PlayIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import {
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  ChatIcon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT, RESETUSER } from "@/features/user/userSlice";
import Notifications from "./Notifications";
import { useEffect, useState } from "react";
import { GETNOTES } from "@/features/data/dataSlice";
import { doc, onSnapshot,collection,updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [open,setOpen]=useState(false)
  const notes =useSelector(state=>state.data.notes)

useEffect(()=>{
  const unsub = onSnapshot(collection(db, "notifications"), (snapShot) => {
      let list =[];
      snapShot.docs.forEach(doc=>{
       list.push({id:doc.id,...doc.data()})
      })
     dispatch(GETNOTES(list))
      
     },(error)=>{
       console.log(error)
     });
     return ()=> {
       unsub();
     };

},[])


 const handleClick= async ()=> {
  setOpen(prev=>!prev)
  const myList =notes.filter(el=>el.dest===userInfo.email)
  myList.forEach(el=>{
    const washingtonRef = doc(db, "notifications", el.id);

// Set the "capital" field of the city 'DC'
const doIt =async()=>{
  await updateDoc(washingtonRef, {
    seen: true
  });
} 
doIt()
  })

 }
  return (
    <header className="fixed w-screen bg-white top-0 flex items-center justify-between p-1 shadow-md z-10">
      <section className="flex items-center"><Link href={'/'}>  <Image
          src={
            "https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
          }
          width={70}
          height={45}
          alt="alt"
        /></Link>
      
        <div className="hidden sm:flex items-center p-2 bg-gray-200 rounded-full  ">
          <SearchIcon className="h-5 cursor-pointer text-gray-600" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="bg-transparent outline-none ml-2 placeholder-gray-500"
          />
        </div>
      </section>
      <section className="flex flex-grow justify-evenly  sm:justify-center space-x-0 sm:space-x-5 md:space-x-6  ">
        <HeaderIcon theActive={true} Icon={HomeIcon} />
        <HeaderIcon hide={true} Icon={FlagIcon} />
        <HeaderIcon hide={true} Icon={PlayIcon} />
        <HeaderIcon hide={true} Icon={ShoppingCartIcon} />
        <HeaderIcon Icon={UserGroupIcon} />
      </section>
      <section className="flex px-3 items-center space-x-2">
       
       <span onClick={() => {
            dispatch(LOGOUT());
            dispatch(RESETUSER());
          }}><svg xmlns="http://www.w3.org/2000/svg" className="icon flex text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg></span>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <div className="relative"><BellIcon style={{display:'block'}} className={`icon ${open? 'text-blue-500':'text-gray-600'}`} onClick={handleClick} />
    {notes.filter((el)=>el.dest===userInfo.email).filter((el)=>el.seen===false).length > 0 && <span style={{top:'-3px',right:'-3px'}} className="absolute  h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">{notes.filter((el)=>el.dest===userInfo.email).filter((el)=>el.seen===false).length}</span>}
        </div>
        <Link href={`/${userInfo.email}`}>
         <img
          className="rounded-full w-10 h-10 cursor-pointer"
          src={userInfo?.image}
        
          
          
          
        />
        </Link>
       
      </section>

    {open&&  <Notifications />}
    </header>
  );
};

export default Header;
