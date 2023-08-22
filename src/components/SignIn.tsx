import Link from "next/link"
import UserAuthForm from "./UserAuthForm"
import Image from "next/image"
import logo from "@/assets/TB.jpg"

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center space-y-2 sm:w-[400px]">
      <Image src={logo} alt="ThreadBot logo" height={48} width={48} />
      <div className="flex flex-col space-y-2 justify-between text-center">
        
        <p className="hidden text-zinc-700 text-lg pb-6 font-medium md:block">
            ThreadBot
          </p>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back!</h1>
        <p className="text-sm max-w-xs mx-auto">
          Sign in using your email/password or click the Google button to sign
          in that way.
        </p>

        <UserAuthForm />

        <p className="px-8 pt-4 text-center text-sm text-zinc-700">
          New to ThreadBot?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
