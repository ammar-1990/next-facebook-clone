import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import HeaderIcon from "./HeaderIcon";
import { FlagIcon, PlayIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import {
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  ChatIcon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT, RESETUSER } from "@/features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
 
  return (
    <header className="fixed w-screen bg-white top-0 flex items-center justify-between p-1 shadow-md z-10">
      <section className="flex items-center"><Link href={'/'}>  <Image
          src={
            "https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
          }
          width={70}
          height={45}
          alt="alt"
        /></Link>
      
        <div className="hidden sm:flex items-center p-2 bg-gray-200 rounded-full  ">
          <SearchIcon className="h-5 cursor-pointer text-gray-600" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="bg-transparent outline-none ml-2 placeholder-gray-500"
          />
        </div>
      </section>
      <section className="flex flex-grow justify-evenly  sm:justify-center space-x-0 sm:space-x-5 md:space-x-6  ">
        <HeaderIcon theActive={true} Icon={HomeIcon} />
        <HeaderIcon Icon={FlagIcon} />
        <HeaderIcon Icon={PlayIcon} />
        <HeaderIcon Icon={ShoppingCartIcon} />
        <HeaderIcon Icon={UserGroupIcon} />
      </section>
      <section className="flex px-3 items-center space-x-2">
       
       
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
         <Image
          className="rounded-full cursor-pointer"
          src={userInfo?.image}
          width={37}
          height={37}
          onClick={() => {
            dispatch(LOGOUT());
            dispatch(RESETUSER());
          }}

          unoptimized
        />
       
      </section>
    </header>
  );
};

export default Header;
