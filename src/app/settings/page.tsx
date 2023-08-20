import PasswordForm from "@/components/PasswordForm"
import UserNameForm from "@/components/UserNameForm"
import { authOptions, getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"

const page = async ({ searchParams }) => {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  const user = {
    id: session.user.id,
    username: session.user.username || "",
  }

  const finishSignup = searchParams?.finish || false

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="grid items-start gap-8">
        {finishSignup ? (
          <h1 className="font-bold text-red-500 text-3xl md:text-4xl pb-12 text-center">
            If you'd like to change your username, now's a good time to do it.
          </h1>
        ) : (
          <h1 className="font-bold text-3xl md:text-4xl pb-12 text-center">Settings</h1>
        )}
      </div>

      <div className="grid gap-10">
        <UserNameForm
          user={user}
        />
        <PasswordForm
          user={user}
        />
      </div>
    </div>
  )
}

export default page
