import Link from "next/link"
import UserAuthForm from "./UserAuthForm"
import Image from "next/image"
import logo from "@/assets/TB.jpg"

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center items-center">
        <Image src={logo} alt="ThreadBot logo" height={48} width={48} />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm max-w-xs mx-auto">
          Sign in using your email/password or click the Google button to sign
          in that way.
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
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
