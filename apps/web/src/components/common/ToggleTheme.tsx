import clsx from "clsx";
import { useTheme } from "next-themes";
import { IoMoon, IoSunny } from "react-icons/io5";

export const ToggleTheme = ({ mounted }: { mounted: boolean }) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="dark:bg-[#323232] bg-gray-100 flex rounded-lg p-2">
      <button
        className={clsx(
          theme === "light" ? "bg-gray-300" : "opacity-60",
          "rounded-lg py-2 px-4 text-sm"
        )}
        onClick={() => setTheme("light")}
      >
        <div className="flex items-center gap-2">
          <IoSunny /> Light
        </div>
      </button>
      <button
        aria-label="Toggle Dark Mode"
        className={clsx(
          theme === "dark" ? "bg-gray-700" : "opacity-60",
          "rounded-lg py-2 px-4 text-sm"
        )}
        onClick={() => setTheme("dark")}
      >
        {mounted && (
          <div>
            <div className="flex items-center gap-2">
              <IoMoon /> Dark
            </div>
          </div>
        )}
      </button>
    </div>
  );
};
