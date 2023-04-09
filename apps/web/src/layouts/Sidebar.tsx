import clsx from "clsx";
import { Avatar } from "src/components/common/Avatar";
import { ToggleTheme } from "src/components/common/ToggleTheme";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaRobot } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { Logo } from "./Logo";

type SidebarProps = {
  mounted: boolean;
  links: {
    label: string;
    href: string;
  }[];
};

export const Sidebar = ({ mounted, links }: SidebarProps) => {
  const { data: session } = useSession();
  const icons = {
    Home: <FaHome className="text-primary" size={24} />,
    Chat: <FaRobot className="text-primary" size={24} />,
  };

  const [isBigScreen, setIsBigScreen] = useState(false);

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
      <div className="my-8 flex flex-col">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className={clsx(
              "rounded-xl px-4 py-2 text-lg hover:bg-gray-200 hover:duration-500 dark:hover:bg-gray-700",
              "sm:flex sm:items-center sm:gap-3"
            )}
          >
            {/* @ts-ignore */}
            {icons[l.label]} {isBigScreen && l.label}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-0 my-4 flex flex-col items-center justify-center gap-2 p-4 text-xl sm:flex-row">
        <ToggleTheme mounted={mounted} />

        <div className="flex items-center justify-around gap-2 text-3xl md:text-4xl">
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-full ring-gray-300 hover:ring-2"
            >
              <Avatar src={session.user?.image} size={32} />
            </Link>
          ) : (
            <button className="text-xl" onClick={() => signIn()}>
              <BiLogInCircle size={32} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
