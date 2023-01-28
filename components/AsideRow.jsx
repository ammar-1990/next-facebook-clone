import Image from "next/image"



const AsideRow = ({title,Icon,profile}) => {
  return (
    <div className="p-3 hover:bg-gray-300 rounded-md flex gap-3 items-center justify-center sm:justify-start w-full cursor-pointer">
        {profile && <Image src={profile} width={37} height={37} unoptimized className='rounded-full' />}

        {Icon && <Icon className='w-6 text-blue-500' />}

        <p className="hidden sm:block text-md capitalize font-bold">{title}</p>
    </div>
  )
}

export default AsideRow