import { Router, type IRouter } from "express";
import { z } from "zod";
import { db, contactMessagesTable } from "@workspace/db";

const router: IRouter = Router();

const contactMessageSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

function serializeMessage(message: Record<string, unknown>) {
  return {
    ...message,
    createdAt: message.createdAt instanceof Date ? message.createdAt.toISOString() : message.createdAt,
    updatedAt: message.updatedAt instanceof Date ? message.updatedAt.toISOString() : message.updatedAt,
  };
}

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = contactMessageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [message] = await db
    .insert(contactMessagesTable)
    .values({
      ...parsed.data,
      status: "new",
    })
    .returning();

  res.status(201).json(serializeMessage(message as unknown as Record<string, unknown>));
});

export default router;
