

import Head from 'next/head'
import Header from '@/components/Header'
import { useSelector,useDispatch } from 'react-redux'
import { LOGIN,SETUSER } from '@/features/user/userSlice';
import { useRouter } from 'next/router';
import {useEffect} from 'react'
import Aside from '@/components/Aside';
import Content from '@/components/Content';
import RightBar from '@/components/RightBar';










export default function Home() {
  const user =useSelector(state=>state.user.user)
  const userInfo =useSelector(state=>state.user.userInfo)
  const dispatch=useDispatch()
  const route=useRouter()

 useEffect(()=>{
  dispatch(LOGIN(JSON.parse(localStorage.getItem('user'))))
   dispatch(SETUSER(JSON.parse(localStorage.getItem('userInfo'))))
 },[])
 
 useEffect(()=>{ 
        
  const waiting=setTimeout(()=>{!user&& route.push('/login')},500)

return ()=>clearInterval(waiting)
},[user])


 if (!user) 
 return <p>Loading...</p>
 else
  return (
    <>
    
      <Head>
        <title>Facebook</title>
      </Head>
   <Header />

   <main className='h-screen bg-gray-100 pt-16 flex '>
<Aside />
<Content />
<RightBar />

   </main>
    </>
  )
}
