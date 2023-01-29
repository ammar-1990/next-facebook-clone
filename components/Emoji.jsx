

const Emoji = ({Icon,title,color}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-1 p-1 sm:p-2 hover:bg-gray-200 items-center rounded-lg cursor-pointer ">
        <Icon className={`w-7 text-${color}-500`}/>
        <p className="text-xs text-center text-gray-600">{title}</p>
    </div>
  )
}

export default Emoji