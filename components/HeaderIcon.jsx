

const HeaderIcon = ({Icon,active}) => {
  return (
    <div className="w-1/4 md:w-10 lg:w-14 h-14 flex item-center justify-center hover:bg-gray-200 cursor-pointer group">
<Icon className={`text-gray-400 w-5 group-hover:text-blue-500 ${active && 'text-blue-500'}`}/>
    </div>
  )
}

export default HeaderIcon