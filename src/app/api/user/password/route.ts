import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { PasswordValidator } from "@/lib/validators/password"
import { z } from "zod"
const bcrypt = require("bcrypt")

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { password } = PasswordValidator.parse(body)
  
    const newPassword: string = await bcrypt.hash(password, 10)

    await db.user.update({
      where: { id: session.user.id },
      data: {
        password: newPassword
      },
    })

    return new Response("OK")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 })
    }

    return new Response(`There was an error updating your password: ${error}`, {
      status: 500,
    })
  }
}
