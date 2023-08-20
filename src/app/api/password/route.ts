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

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: await bcrypt.hash(password, 10),
      },
    })

    return new Response("OK")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 })
    }

    return new Response("Could not update password. Please try again later.", {
      status: 500,
    })
  }
}
