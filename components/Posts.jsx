import {  onSnapshot,collection } from "firebase/firestore";
import {useState,useEffect} from 'react'
import { db } from "@/firebase";
import Post from "./Post";

const Posts = () => {



    const [posts,setPosts]=useState([])

  useEffect(()=>{
    const unsub = onSnapshot(collection(db, "posts"), (snapShot) => {
   let list =[];
   snapShot.docs.forEach(doc=>{
    list.push({id:doc.id,...doc.data()})
   })
   setPosts(list)
   
  },(error)=>{
    console.log(error)
  });
  return ()=> {
    unsub();
  };
  },[])
  return (
    <div>
   {[...posts]?.sort((a,b)=>(new Date(b.timestamp)- new Date(a.timestamp))).map((el)=><Post key={el.id} el={el}/>)}

    </div>
  )
}

export default Posts