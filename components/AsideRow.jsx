import Image from "next/image"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"



const AsideRow = ({title,Icon,profile,email}) => {
  const route=useRouter()
  return (
    <div onClick={()=>{profile? route.push(`/${email}`) : null}} className="p-3 hover:bg-gray-300 rounded-md flex gap-3 items-center justify-center md:justify-start w-full cursor-pointer">
        {profile && <img src={profile} className='w-10 h-10 rounded-full object-cover'/>}

        {Icon && <Icon className='w-6 text-blue-500' />}

        <p className="sm:hidden md:block text-md capitalize font-bold">{title.name || title }  {title.last}</p>
    </div>
  )
}

export default AsideRow