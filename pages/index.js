

import Head from 'next/head'
import Header from '@/components/Header'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import {useEffect} from 'react'









export default function Home() {
  const user =useSelector(state=>state.user.user)
  const route=useRouter()
 useEffect(()=>{
  !user && route.push('/login')
 },[])

 if (!user) 
 return <p>unauthenticated</p>
 else
  return (
    <>
    
      <Head>
        <title>Facebook</title>
      </Head>
   <Header />
    </>
  )
}
