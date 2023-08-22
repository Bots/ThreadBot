"use client"

import { FC, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/Button"
import { signIn } from "next-auth/react"
import { Icons } from "./Icons"
import { useToast } from "@/hooks/use-toast"
import React from "react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>("")

  const [buttonStatus, setButtonStatus] = useState(true)

  useEffect(() => {
    (email && password) ? setButtonStatus(true) : setButtonStatus(false)
  }, [email, password]);

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithCredentials = async () => {
    setIsLoading(true)

    try {
      await signIn("credentials")
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("justify-center", className)} {...props}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-md font-bold leading-6 text-gray-900"
            >
              Email address:
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                required
                className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center">
              <label
                htmlFor="password"
                className="block text-md font-bold leading-6 text-gray-900"
              >
                Password:
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)} 
                id="password"
                name="password"
                type="password"
                value={password}
                autoComplete="current-password"
                required
                className="block text-center w-full rounded-md border-0 mb-6 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <Button
              disabled={!buttonStatus}
              type="submit"
              className="flex w-full my-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>

      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
