import Link from "next/link"
import { buttonVariants } from "./ui/Button"
import { getAuthSession } from "@/lib/auth"
import UserAccountNav from "./UserAccountNav"
import SearchBar from "./SearchBar"
import Image from "next/image"
import navbarImage from "@/assets/TB.jpg"

const Navbar = async () => {
  const session = await getAuthSession()

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src={navbarImage}
            alt="ThreadBot logo"
            width={24}
            height={24}
          />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            ThreadBot
          </p>
        </Link>

        <SearchBar />

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <div>
            <Link href="/sign-up" className="underline text-sm pr-4">
              Sign Up
            </Link>
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
