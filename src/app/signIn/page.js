"use client";
import { Facebook } from "lucide-react";
import Link from "next/link";
import LoginImageSide from "../components/LoginImageSide";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OAuth } from "../(auth)/configs/Auth";
const page = () => {
  const router = useRouter();
  const { setUser } = OAuth();
  const [SignInData, SetSignInData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    SetSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleSignIn = async () => {
    try {
      const res = await fetch(`/api/signIn`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          email: SignInData.email,
          password: SignInData.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      setUser(data?.user);
      router.push("/instagram");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-white">
      <LoginImageSide />
      <div className="second w-[50%] flex flex-col gap-5  justify-center h-screen">
        <div className="SignIn border flex flex-col gap-2 items-center w-[50%] h-[70vh] ml-10 border-gray-300 rounded-sm">
          <img
            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
            alt=""
            className="object-cover my-10 mb-6 cursor-not-allowed"
          />
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            name="email"
            type="text"
            value={SignInData.email}
            className="border outline-none py-1.5  rounded focus:border-gray-400 placeholder:text-xs px-2 w-[75%]  text-black"
            placeholder="Phone number , username or email address"
          />
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            name="password"
            value={SignInData.password}
            type="password"
            className="border outline-none py-1.5 rounded focus:border-gray-400 placeholder:text-xs  px-2 w-[75%]  text-black"
            placeholder="Password"
          />
          <button
            onClick={HandleSignIn}
            className="bg-blue-500 w-[75%] py-1.5 rounded-md mt-2 text-white font-semibold"
          >
            Log In
          </button>
          <div className="or mt-5 flex items-center justify-center gap-5">
            <div className="w-[90px] h-[0.5px] bg-slate-300" />
            <span>OR</span>
            <div className="w-[90px] h-[0.5px] bg-slate-300" />
          </div>
          <div className="flex items-center text-blue-950 font-semibold gap-2 py-1 px-2 mt-4">
            <Facebook color="darkblue" size={18} /> Log in with Facebook
          </div>
          <Link href={"#"} className="text-xs text-blue-950">
            Forgotten your password ?
          </Link>
        </div>
        <div className="SignUp border w-[50%] h-[15vh] flex justify-center items-center  ml-10 border-gray-300 rounded-sm">
          <span className="text-sm font-medium">
            Don't have an account?{" "}
            <Link href={"#"} className="text-blue-500 font-semibold">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
