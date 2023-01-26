import Image from "next/image"
import { useState } from "react"
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import { useSelector,useDispatch } from "react-redux";
import { LOGIN } from "@/features/user/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";


const Login = () => {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [err,setErr]=useState('')
const dispatch =useDispatch()
const route = useRouter()
const [loading,setLoading]=useState(false)


const handleLogin = (e)=>{
e.preventDefault()
if(!email || !password)
setErr('ENTER VALID E-MAIL AND PASSWORD')
else {
 setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
    console.log(userCredential.user);
    dispatch(LOGIN({
        id:userCredential.user.uid,
        email:userCredential.user.email
    }))
   
    route.push('/')
    setLoading(false)

      // ...
    })
    .catch((error) => {
     
      setErr(error.message)
      setLoading(false)
      // ..
    });
}


}

  return (
    <div className="flex flex-col items-center h-screen p-6">

<Image src={"https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"} width={400} height={400}  />
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