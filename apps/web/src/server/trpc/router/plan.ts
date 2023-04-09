import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { Prisma } from "@prisma/client";

const defaultPlanSelect = Prisma.validator<Prisma.PlanSelect>()({
  id: true,
  title: true,
  messages: true,
  createdAt: true,
  updatedAt: true,
  user: true,
  userId: true,
});

export const planRouter = router({
  all: publicProcedure.query(({ ctx }) =>
    ctx.prisma.plan.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })
  ),
  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string(),
        userId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const plan = await ctx.prisma.plan.create({
        data: input,
        select: defaultPlanSelect,
      });
      return plan;
    }),
  byId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const plan = await ctx.prisma.plan.findUnique({
        where: { id },
        include: { messages: true },
      });
      return plan;
    }),
});
