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
   console.log(list)
  },(error)=>{
    console.log(error)
  });
  return ()=> {
    unsub();
  };
  },[])

  return (
    <div className="theContent py-2 px-2 mx-auto  w-full   md:w-7/12 lg:w-6/12 flex flex-col gap-5 h-full overflow-y-scroll ">
        <Stories />
        <InputContent />
        {posts?.map((el,)=><Post key={el.id} el={el}/>)}
    </div>
  )
}

export default Content