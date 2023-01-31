import InputContent from "./InputContent"
import Stories from "./Stories"
import { collection, getDocs } from "firebase/firestore";
import { useEffect,} from "react";
import {db} from '../firebase'
import Post from "./Post";
import { useDispatch ,useSelector} from "react-redux";
import { GETPOSTS } from "@/features/data/dataSlice";
import { doc, onSnapshot } from "firebase/firestore";





const Content = () => {


const dispatch=useDispatch()
const posts = useSelector(state=>state.data.posts)
  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "posts"), (snapShot) => {
   let list =[];
   snapShot.docs.forEach(doc=>{
    list.push({id:doc.id,...doc.data()})
   })
   dispatch(GETPOSTS(list))
   
  },(error)=>{
    console.log(error)
  });
  return ()=> {
    unsub();
  };
  },[])

  return (
    <div className="theContent py-2 px-2 mx-auto  w-full sm:w-8/12  md:w-7/12 lg:w-5/12   h-full overflow-y-scroll ">
        <Stories />
        <InputContent />
        {[...posts]?.sort((a,b)=>(new Date(b.timestamp)- new Date(a.timestamp))).map((el)=><Post key={el.id} el={el}/>)}
    </div>
  )
}

export default Content