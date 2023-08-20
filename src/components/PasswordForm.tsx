"use client"

import { PasswordValidator } from "@/lib/validators/password"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card"
import { useForm } from "react-hook-form"
import { Label } from "./ui/Label"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { cn } from "@/lib/utils"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "username">
}

type FormData = z.infer<typeof PasswordValidator>

export function PasswordForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PasswordValidator),
  })

  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: async ({ password }: FormData) => {
      const payload: FormData = { password }

      const { data } = await axios.patch(`/api/password/`, payload)
      return data
    },
    onError: (err) => {
      return toast({
        title: "Something went wrong.",
        description: `Your password was not updated. Please try again. ${err}`,
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        description: "Your password has been updated.",
      })
      router.refresh()
    },
  })

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit((e) => updatePassword(e))}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="pb-2">Password</CardTitle>
          <CardDescription>
            Optional. If you would like to be able to sign in via email/password
            in the future, please enter your desired password here. <br/><br/>Passwords
            must have at least 8 digits, and contain at least 1 uppercase
            letter, one lowercase letter, one number, and one special character.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              className="w-[400px] pl-6"
              size={32}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button isLoading={isLoading}>Change password</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default PasswordForm
