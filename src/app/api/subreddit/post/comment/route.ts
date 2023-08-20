import { getAuthSession } from "@/lib/auth"
import { CommentValidator } from "@/lib/validators/comment"
import { z } from "zod"
import { db } from "@/lib/db"

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { postId, text, replyToId } = CommentValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const comment = await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      },
    })

    await db.commentVote.create({
      data: {
        type: "UP",
        userId: session.user.id,
        commentId: comment.id,
      },
    })

    return new Response("OK")
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response("Could not create comment, please try again later.", {
      status: 500,
    })
  }
}
