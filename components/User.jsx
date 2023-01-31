

const User = ({user}) => {
  return (
    <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-300 rounded-lg group">
        <div className="relative h-8 w-8 rounded-full  ">
        <img className="w-full h-full rounded-full object-cover" src={user.src} alt="" />
        <div className="light absolute w-2 h-2 rounded-full bg-green-500 bottom-0 left-6 border-gray-100 group-hover:border-gray-300"></div>
        </div>

<p className="text-gray-600 capitalize">{user.name}</p>

    </div>
  )
}

export default User