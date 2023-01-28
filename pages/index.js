

import Head from 'next/head'
import Header from '@/components/Header'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import {useEffect} from 'react'
import Aside from '@/components/Aside';










export default function Home() {
  const user =useSelector(state=>state.user.user)
  const userInfo =useSelector(state=>state.user.userInfo)
  
  const route=useRouter()

 
 
 useEffect(()=>{
  !user && route.push('/login')
 },[user])


 if (!user) 
 return <p>unauthenticated</p>
 else
  return (
    <>
    
      <Head>
        <title>Facebook</title>
      </Head>
   <Header />

   <main className='h-screen bg-gray-100 pt-16 '>
<Aside />

   </main>
    </>
  )
}
