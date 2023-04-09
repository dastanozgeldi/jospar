import { ToggleTheme } from "src/components/common/ToggleTheme";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import clsx from "clsx";
import { IoChatbox } from "react-icons/io5";
import { trpc } from "src/utils/trpc";
import { type Plan } from "@prisma/client";

type SidebarProps = {
  mounted: boolean;
};

export const Sidebar = ({ mounted }: SidebarProps) => {
  const [isBigScreen, setIsBigScreen] = useState(false);

  const { data: plans } = trpc.plan.all.useQuery();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    setIsBigScreen(mediaQuery.matches);

    const handleChange = (event: any) => {
      setIsBigScreen(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <aside className="relative h-screen p-4">
      <Logo withText={isBigScreen} />
      {/* TODO: MAP PLANS(CONVERSATIONS) */}
      <div className="my-8 flex flex-col">
        {plans &&
          plans.map((plan: Plan) => (
            <Link
              key={plan.id}
              href={`/${plan.id}`}
              className={clsx(
                "rounded-xl px-4 py-2 text-lg hover:bg-gray-200 hover:duration-500 dark:hover:bg-gray-700",
                "sm:flex sm:items-center sm:gap-3"
              )}
            >
              <IoChatbox /> {plan.title}
            </Link>
          ))}
      </div>
      <div className="absolute bottom-0 my-4 flex flex-col items-center justify-center gap-2 p-4 text-xl sm:flex-row">
        <ToggleTheme mounted={mounted} />
      </div>
    </aside>
  );
};
