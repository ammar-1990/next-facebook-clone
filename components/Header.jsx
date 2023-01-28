import Image from "next/image";
import { SearchIcon } from "@heroicons/react/outline";
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
  console.log(userInfo.image);
  return (
    <header className="flex items-center justify-between p-1 shadow-md">
      <section className="flex items-center">
        <Image
          src={
            "https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
          }
          width={70}
          height={45}
          alt="alt"
        />
        <div className="hidden sm:flex items-center p-2 bg-gray-200 rounded-full  ">
          <SearchIcon className="h-5 cursor-pointer text-gray-600" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="bg-transparent outline-none ml-2 placeholder-gray-500"
          />
        </div>
      </section>
      <section className="flex flex-grow justify-evenly  sm:justify-center space-x-0 sm:space-x-5 md:space-x-8  ">
        <HeaderIcon active Icon={HomeIcon} />
        <HeaderIcon Icon={FlagIcon} />
        <HeaderIcon Icon={PlayIcon} />
        <HeaderIcon Icon={ShoppingCartIcon} />
        <HeaderIcon Icon={UserGroupIcon} />
      </section>
      <section className="flex px-3 items-center space-x-2">
        <Image
          className="rounded-full cursor-pointer"
          src={userInfo?.image}
          width={45}
          height={45}
          onClick={() => {
            dispatch(LOGOUT());
            dispatch(RESETUSER());
          }}

          unoptimized
        />
        <p className="text-gray-400 font-medium  whitespace-nowrap text-xs sm:text-sm md:text-base">
          {userInfo?.name}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </section>
    </header>
  );
};

export default Header;
