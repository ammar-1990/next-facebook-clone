import Image from "next/image"
import { useState ,useEffect} from "react"
import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../firebase'
import { useSelector,useDispatch } from "react-redux";
import { LOGIN,SETUSER } from "@/features/user/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import Head from 'next/head'



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
<Head>
  <title>Login</title>
  <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEU6VZ////82Up4zUJ1UbKx4ibswTpyMmsQ5V6EtTJupss8nSJnN0+WVosgqSpo4U56eqcyDksDj5vBwgbb3+PxFXqNabqt9jb3S2OhidbC9xdy3v9l0hLjZ3etLY6bq7fTEyt4dQpdJYqekrs2uttK97JEgAAADFUlEQVR4nO3c2XLiMBBAUUZmM3IsFsNgSIAk/P83TsLzjCNbI3c3de9rqlw+BV7VZDIhIiIiIiIiIiIiIiIiIlJeCM4VxbzsrJDey8G50s/3h91ss3jp7LdJYii8262rbfPr545eem/753y9qWJwjypzwqJuT7E6i0JX7459fOaEvn3r5zMmLPy5r8+W0L9Gn15MCkO9GuAzJHSh9xFoS1hcrsOAVoTzdsghaEhYTAcDbQjdfjjQhDAshx6DRoShrhKAFoR+nQI0ICzaJKABYZlyEFoQ1p9pQPVCd0m4UJgQ+lsiULvQXVKB2oW+1ysZg8KwTAYqF5ZpF3sDQr99cqFLvJ3RL0y+2usXDnw1Y0YYUh58TQiL3X8Aql57Kvschs3xdF/9pftC8fphj3vSalZ6X5tbA/axJ5rtzhdBem+HVEeeaKq55s+po1DHAW/vJj+/yfdifdxX1OYX9LuwjxIejH5Fv3LTGOBJ8eXup+KEH056P4cXJby+S+9mQlHCUy29mwlFCddz6d1MKEq4sXsmjRTOEGoOIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQR27+78qYucRX37GFR7Jrb65ddBQz1Hbv2sCjpSixvEcgEitlhcN+cNenRnZxagThm+wK6ghC4TXiEYSr8tmFwstvIwhb2XX+EYR72St+fmEj6htDuBW+a8svPArPauQXnp9e+CI8jZJfKP38mF8ofDnML2wuwsOn2YVX6ena7MKt9PRpduHt6YUr6eHM7MKF9HBmduGr9OvU7MKp9BR4bmEjDcwulJ9zzy2U/+1hbqH0s1N+4afsq8QRhPKT/LmFB+kb7+xC6Tua7ELhdacRhOLPTtmFCv7ZQOY14LP4xWISlh2FqFkM17UF8VPpF7Hjb3HTJl2nSwXAzp5jnqYrhAj1hxCh/hAi1B9ChPpDiFB/CBHqDyFC/SFEqD+ECPWHEKH+ECLUH0KE+kOIUH8IEeoPIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQfwgR6g8hQv0hRKg/hAj1hxCh/hAi1B9ChD36A+1ASVvVoq0WAAAAAElFTkSuQmCC" />
</Head>
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