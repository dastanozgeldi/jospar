import { useTheme } from "next-themes";
import { IoMoon, IoSunny } from "react-icons/io5";

export const ToggleTheme = ({ mounted }: { mounted: boolean }) => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 p-0 ring-gray-300 transition-all hover:ring-2 dark:bg-gray-600"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (theme === "dark" ? <IoSunny /> : <IoMoon />)}
    </button>
  );
};
