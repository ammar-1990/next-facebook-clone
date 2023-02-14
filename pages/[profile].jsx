import { useRouter } from "next/router"
import { useEffect ,useState,useRef} from "react"
import Header from "@/components/Header"
import { useDispatch, useSelector } from "react-redux"
import {LOGIN,SETUSER} from '../features/user/userSlice'
import { CameraIcon } from "@heroicons/react/solid"
import { PencilIcon } from "@heroicons/react/solid"
import InputContent from "@/components/InputContent"
import { HomeIcon } from "@heroicons/react/solid"
import { HeartIcon } from "@heroicons/react/solid"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Head from 'next/head'




import { db ,storage} from "@/firebase"
import Post from "@/components/Post"
import {
  collection,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
  getDocs ,
 
} from "firebase/firestore";
import EditProfile from "@/components/EditProfile"








const profile = () => {
  const [active,setActive]=useState('posts')
  const cBar =[{name:'posts'},{name:'about'},{name:'friends'},{name:'photos',hide:'hidden md:block'},{name:'videos',hide:'hidden md:block'},{name:'check-ins',hide:'hidden md:block'},{name:'more'}]
const userInfo=useSelector(state=>state.user.userInfo)
const user =useSelector(state=>state.user.user)
    const route=useRouter()
const [ppUrl,setPpUrl]=useState()
    const [photo,setPhoto]=useState('')
    const [loading,setLoading]=useState(false)
const dispatch=useDispatch()
const [posts,setPosts]=useState([])
const [uiUser,setUiUser]=useState(null)
const [cover,setCover]=useState(null)
const coverRef=useRef()
const [coverUrl,setCoverUrl]=useState('')
const [edit,setEdit]=useState(false)
const ppref=useRef()
const [ppImage,setPpImage]=useState(null)
const [pLoading,setPLoading]=useState(false)

const getUser= ()=>{
if(route.query.profile===userInfo.email)
return userInfo
else
return(uiUser)
}

useEffect(()=> {
  const uploadImage = () => {
    const name = new Date().getTime() + cover.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, cover);

   
    uploadTask.on(
      "state_changed",
      (snapshot) => {
       setLoading(true)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
       
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
    
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCoverUrl(downloadURL);
          console.log(downloadURL)
        });
      }
    );
  };

  cover && uploadImage();
},[cover])


useEffect(()=> {
  const uploadImage = () => {
    const name = new Date().getTime() + ppImage.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, ppImage);

   
    uploadTask.on(
      "state_changed",
      (snapshot) => {
   setPLoading(true)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
       
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
    
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPpUrl(downloadURL);
          
       
        });
      }
    );
  };

  ppImage && uploadImage();
},[ppImage])

useEffect(()=>{
  setLoading(false)
  setEdit(false)
  setPLoading(false)
},[userInfo])

useEffect(()=>{
const setCimage=async()=>{
  const washingtonRef = doc(db, "users", user.id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  bg: coverUrl
});
}
if(user&&cover){
  const waiting=setTimeout(()=>{setCimage();},1500)
  // setLoading(false)

return()=> {clearTimeout(waiting);}

}
},[coverUrl])


useEffect(()=>{
const setCimage=async()=>{
  const washingtonRef = doc(db, "users", user.id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  image: ppUrl
});
}
if(user&&ppImage){
  const waiting=setTimeout(()=>{setCimage();},1500)
  // setLoading(false)

return()=> {clearTimeout(waiting);}

}
},[ppUrl])




    
useEffect(()=>{
   dispatch(LOGIN(JSON.parse(localStorage.getItem('user'))))
   dispatch(SETUSER(JSON.parse(localStorage.getItem('userInfo'))))

    },[])




    useEffect(()=>{
     
      setUiUser(null)
      const waiting=setTimeout(()=>{!user&& route.push('/login')},6000)
      if(user){
        const waiting = setTimeout(()=>{
       const userE =window.location.pathname.slice(1,window.location.pathname.length)
       const q = query(collection(db, "users"), where("email", "==", userE));
const getData=async()=>{
  const querySnapshot = await getDocs(q);
 querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
 
  setUiUser({id:doc.id,...doc.data()})

  



});


}

getData()


        
         },1000)


         const wait=  setTimeout(()=>{
    

          const unsub = onSnapshot(doc(db, "users", user.id), (doc) => {
        
          dispatch(SETUSER(doc.data()))
         
        });
        
        
        
        return ()=> unsub() 
        
        },8000)
   
         return ()=>{clearTimeout(waiting);
          clearTimeout(wait)}

       
      }



      return ()=>clearTimeout(waiting)
    },[user,route.query.profile])






    useEffect(()=>{
      
      setPosts([])
   const waiting=   setTimeout(()=>{  if(uiUser)
        {
                    const q = query(
              collection(db, "posts"),
              where("userEmail", "==",uiUser.email)
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
        else {
          route.push('/')
        }},6000)


        

       
      
     return ()=>clearTimeout(waiting)
     
     





    
     },[uiUser])

  









if(!uiUser || !user )
return <p>Loading...</p>
else
  return (
      
    <div >
   <Head>
        <title>{userInfo.name}</title>
      </Head>
        <Header />
        {edit&&<EditProfile setEdit={setEdit} />}
     <div className="pt-14 flex justify-center shadow-md  ">
       <div className="w-full lg:w-8/12">
        <div className="w-full h-96 relative "><img className={`w-full h-full cursor-pointer ${loading && 'opacity-60 cursor-not-allowed'}  object-cover rounded-b-2xl`} src={getUser()?.bg || 'data:image/jpeg;base64,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'} alt="" onClick={()=>setPhoto(getUser()?.bg || 'data:image/jpeg;base64,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')}/>
        
       { userInfo.email===getUser().email &&<button onClick={()=>coverRef.current.click()} className="absolute right-5 bottom-4 outline-none px-5 py-2 bg-white rounded-md text-md flex items-center gap-1 "><CameraIcon className="text-black w-6 h-6" />{userInfo.email===getUser().email &&<span className="hidden sm:block" >Edit cover photo</span>} </button>}
       <input hidden onChange={(e)=>setCover(e.target.files[0])} type="file" ref={coverRef} />
        </div>
        <div className="flex gap-3 h-40 p-6 relative w-full mt-20 md:mt-0 md:justify-between flex-col items-center md:items-baseline md:flex-row">
           <img  className={`absolute theImage w-44 h-44 ${pLoading && 'cursor-wait'} rounded-full border-4 cursor-pointer border-white`} src={getUser()?.image} alt="" onClick={()=>{setPhoto(getUser()?.image); console.log(photo)}}/>
         <span onClick={()=>ppref.current.click()} className="absolute top-3 left-3 rounded-full bg-gray-300 w-7 h-7 flex items-center justify-center cursor-pointer"><CameraIcon className="h-5 w-5 " /></span>
         <input type="file" hidden ref={ppref} onChange={(e)=>setPpImage(e.target.files[0])} />
          <p className="md:ml-56 capitalize font-bold text-3xl">
            {getUser().name} {getUser().lastname}
            </p>

            {userInfo.email===getUser().email &&<div className="flex gap-3 md:self-end">
              <button className="outline-none  flex items-center self-end bg-blue-600 gap-2 text-md text-white px-5 py-2 rounded-md"><span className="bg-white w-5 h-5 pb-1 rounded-full flex justify-center items-center text-2xl text-blue-600 ">+</span> Add to story</button>
              <button onClick={()=>setEdit(true)} className="outline-none px-5 py-2 self-end bg-gray-100 rounded-md text-md flex items-center gap-1 "><PencilIcon className="text-black w-6 h-6" /> Edit profile</button>
            </div>}
            </div>
        <div style={{width:'95%'}} className="py-1 m-auto flex theInput border-gray-300 items-center justify-between"> 
        <div className="flex">
          {cBar.map((el)=><div key={el.name} onClick={()=>setActive(el.name)} className={`p-4 ${active===el.name && 'bActive'} ${el?.hide} font-bold  relative capitalize cursor-pointer ${active===el.name?'text-blue-500' :'text-gray-500'}  ${active!==el.name && 'hover:bg-gray-200'}  rounded-xl `}>
            {el.name}
          </div>)}
        </div>
<div className=" rounded-xl text-2xl hover:bg-gray-200  flex items-center justify-center  w-10 h-10">
<span className="text-gray-500 pb-4 font-bold flex items-center justify-centerself-center cursor-pointer">...</span>
</div>
        
        </div>
        
         </div>



        </div>
        <div className="bg-gray-100 mt-1  px-2 pb-2">
         
          <div className="w-full lg:w-8/12 pt-3  m-auto flex gap-3 flex-col md:flex-row">
<div  className=" rounded-lg theLeft  self-start ">
  <div className="bg-white shadow-md   rounded-lg p-3 ">
    <h2 className="font-bold text-xl"> Intro</h2>
    <div className="pt-3 flex flex-col gap-5">
      <div className="flex gap-2 items-center ">
        <span><HomeIcon className="w-6 text-gray-500" /></span>
        <p className="text-gray-500">Lives in <span className="text-black capitalize font-bold">{getUser().country || '.....'}</span>  </p>
      </div>
      <div className="flex gap-2 items-center ">
        <span><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
</svg></span>
        <p className="text-gray-500">Studied in <span className="text-black capitalize font-bold">{getUser().university|| '.....'}</span> Universty  </p>
      </div>
      <div className="flex gap-2 items-center ">
      <span><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
</svg></span>
        <p className="text-gray-500">Went to <span className="text-black capitalize font-bold">{getUser().school|| '.....'} </span>school  </p>
      </div>
      <div className="flex gap-2 items-center ">
        <span><svg xmlns="http://www.w3.org/2000/svg"  className="h-5 w-5 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
</svg></span>
    <p className="text-gray-500"> Birthday</p>    <span className="text-black capitalize font-bold">{getUser().birthday|| '.....'}</span>  
      </div>
      <div className="flex gap-2 items-center ">
        <span><HeartIcon className="w-6 text-gray-500" /></span>
        <span className="text-black capitalize font-bold">{getUser().status|| '.....'}</span>  
      </div>

     


      </div> 
      
      </div>
</div>
<div className=" flex-grow theRight ">
  {userInfo.email===getUser().email &&<InputContent noMargen={true} />}
  {[...posts]?.sort((a,b)=>(new Date(b.timestamp)- new Date(a.timestamp))).map((el)=><Post  profile={true} key={el.id} el={el}/>)}

</div>

          </div>
        </div>

        {photo&& <div
        className={`fixed top-0 left-0 w-full h-full layout flex justify-center items-center`}
      >
        <img src={photo} alt="" />
        <div
          className="absolute top-3 right-3  cursor-pointer "
          onClick={() => setPhoto('')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
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
      </div>}
        </div>
        
  )
}

export default profile