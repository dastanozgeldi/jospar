import { router } from "../trpc";
import { planRouter } from "./plan";

export const appRouter = router({
  plan: planRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
