import Image from "next/image"
import { useState ,useEffect} from "react"
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../firebase'
import { useSelector,useDispatch } from "react-redux";
import { LOGIN,SETUSER } from "@/features/user/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";



const Login = () => {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [err,setErr]=useState('')
const dispatch =useDispatch()
const route = useRouter()
const [loading,setLoading]=useState(false)
const userInfo=useSelector(state=>state.user.userInfo)
useEffect(()=>{
  return ()=>setLoading(false)
},[])

const handleLogin = (e)=>{
e.preventDefault()
if(!email || !password)
setErr('ENTER VALID E-MAIL AND PASSWORD')
else {
 setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 

    dispatch(LOGIN({
        id:userCredential.user.uid,
        email:userCredential.user.email

        
    }))

    
return userCredential.user
      // ...
    }).then(async(user)=>{
      const docRef = doc(db, "users",user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap) {
        dispatch(SETUSER({id:docSnap.id,
        name:docSnap.data().name,
        email:docSnap.data().email,
        password:docSnap.data().password,
        image:docSnap?.data()?.image || '',
        birthday:docSnap.data().birthday,
      }))
        return docSnap
      }
    }).then((docSnap)=>{
    route.push('/')
 
}
)
    .catch((error) => {
     
      setErr(error.message)
      setLoading(false)
      // ..
    });
}


}

  return (
    <div className="flex flex-col items-center h-screen p-6">

<Image src={"https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"} width={400} height={400} alt='alt' />
<form onSubmit={handleLogin} className="flex flex-col mt-10   w-full  sm:w-1/2 lg:w-1/3 gap-5">
<input type="email" required placeholder="E-MAIL" className="input" value={email} onChange={(e)=>{setEmail(e.target.value);setErr('')}}/>
<input type="password"  placeholder="PASSWORD" className="input" value={password} onChange={(e)=>{setPassword(e.target.value);setErr('')}}/>
<button  className={`border-0 outline-none ${loading ? 'bg-blue-300': 'bg-blue-600'} cursor-pointer text-white p-3`}>{loading ? 'Loading...' : 'Login'}</button>



<p className=" mt-3 text-gray-500">Dont,t have an account? <Link href='/signup'><span className="underline text-blue-500">Signup.</span> </Link></p>
{err && <p className='text-red-500 mt-2'>{err}</p>}
</form>


    </div>
  )
}

export default Login