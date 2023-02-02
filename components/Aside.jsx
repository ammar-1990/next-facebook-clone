import AsideRow from "./AsideRow"
import { useSelector } from "react-redux"
import { ChevronDownIcon,ShoppingBagIcon,UserGroupIcon } from "@heroicons/react/outline"
import { CalendarIcon,ClockIcon,DesktopComputerIcon,UserIcon } from "@heroicons/react/solid"

const Aside = () => {
  const userInfo=useSelector(state=>state.user.userInfo)
  return (
    <aside className=" px-1 sm:px-4 py-2 w-max lg:w-1/4 flex flex-col items-center sm:items-start ">
<AsideRow profile={userInfo.image} title={userInfo.name} email={userInfo.email}/>
<AsideRow Icon={UserIcon}   title='friends'/>
<AsideRow Icon={UserGroupIcon}   title='groups'/>
<AsideRow  Icon={ShoppingBagIcon}  title='market place'/>
<AsideRow  Icon={DesktopComputerIcon}  title='watch'/>
<AsideRow Icon={CalendarIcon}   title='events'/>
<AsideRow  Icon={ClockIcon}  title='memories'/>
<AsideRow  Icon={ChevronDownIcon}  title='see more'/>

    
    
    </aside>
  )
}

export default Aside