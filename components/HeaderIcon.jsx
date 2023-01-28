

const HeaderIcon = ({Icon,theActive}) => {
  return (
    <div className="w-1/4 md:w-10 lg:w-14 h-14 flex item-center rounded-lg justify-center hover:bg-gray-200 cursor-pointer group border-blue-500 active:border-b-2">
<Icon className={` w-5 group-hover:text-blue-500 ${theActive ? 'text-blue-500 ' : 'text-gray-400'} `}/>
    </div>
  )
}

export default HeaderIcon