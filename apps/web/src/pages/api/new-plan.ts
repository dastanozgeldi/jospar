import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, userId } = req.body;

  const plan = await prisma.plan.create({ data: { title, userId } });

  res.status(200).json({ plan });
}
