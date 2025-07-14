import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { MenuIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function Header() {
  const {auth, setAuth } = useContext(AuthContext)!;
  const navigate = useNavigate();
  function handleLogout() {
    setAuth({
      authenticated: false,
      user: {
        userId: "",
        token: "",
      },
    });

    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    navigate("/auth");
  }

  console.log(auth)
  return (
    <div className="sticky top-0  backdrop-blur-sm w-full h-20 p-5 flex flex-row justify-between  bg-transparent z-30">
      <div className="pl-10 flex flex-row gap-2">
        <img className="w-9 h-9 " src="/black_brain.svg" alt="" />
        <Link to={"/home"} className="mt-1">
          <span className="text-black text-[18px] font-bold mt-1">
            SecondBrain
          </span>
        </Link>
      </div>

      <div className="flex ">
      <Popover>
        <PopoverTrigger className="hover:cursor-pointer">
          <MenuIcon className="w-5 h-5 bg-white md:hidden mt-[5px] " />
        </PopoverTrigger>
        <PopoverContent className="w-35 h-35 mr-5">
          <nav className="flex flex-col gap-3 ">
            <Link to={"/chats"} className="font-bold">SuperBrain</Link>

            <Link to={"/dashboard"} className="font-bold">Dashboard</Link>
            {auth.authenticated ? <Button
            className="bg-[#222222] pl-[0.2px] pr-[1.3px] hover:cursor-pointer w-20 text-white/78 hover:bg-amber-50 hover:text-black font-bold text-[17px]"
            onClick={() => handleLogout()}
          >
            log out
          </Button> : <Button
            className="bg-[#222222] pl-[0.2px] pr-[1.3px] hover:cursor-pointer w-25 text-white/78 hover:bg-amber-50 hover:text-black font-bold text-[17px]"
            onClick={() => navigate("/auth")}
          >
            Sign In/Up
          </Button> }
          </nav>
        </PopoverContent>
      </Popover>

        <div className="hidden md:flex flex-row gap-7 pr-10 h-10">
          <Link to={"/chats"} className="mt-[5.3px]">
            <span className="text-black  text-[18px] font-bold mt-2">
              SuperBrain
            </span>
          </Link>
          <Link to={"/dashboard"} className="mt-[5.3px]">
            <span className="text-black text-[18px] font-bold mt-2">
              Dashboard
            </span>
          </Link>
           {auth.authenticated ? <Button
            className="bg-[#222222] pl-[0.2px] pr-[1.3px] hover:cursor-pointer w-20 text-white/78 hover:bg-amber-50 hover:text-black font-bold text-[17px]"
            onClick={() => handleLogout()}
          >
            log out
          </Button> : <Button
            className="bg-[#222222] pl-[0.2px] pr-[1.3px] hover:cursor-pointer w-35 text-white/78 hover:bg-amber-50 hover:text-black font-bold text-[17px]"
            onClick={() => navigate("/auth")}
          >
            Sign In/Sign up
          </Button> }
        </div>
      </div>
    </div>
  );
}

