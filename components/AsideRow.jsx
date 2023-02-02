import Image from "next/image"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"



const AsideRow = ({title,Icon,profile,email}) => {
  const route=useRouter()
  return (
    <div onClick={()=>{profile? route.push(`/${email}`) : null}} className="p-3 hover:bg-gray-300 rounded-md flex gap-3 items-center justify-center sm:justify-start w-full cursor-pointer">
        {profile && <Image src={profile} width={37} height={37} unoptimized className='rounded-full' alt=""/>}

        {Icon && <Icon className='w-6 text-blue-500' />}

        <p className="hidden sm:block text-md capitalize font-bold">{title}</p>
    </div>
  )
}

export default AsideRow