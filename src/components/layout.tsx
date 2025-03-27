import { useTheme } from "@/context/theme-context";

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const btnClass =
    theme === "dark" ? "bg-white text-gray-900" : "bg-gray-900 text-white";
  return (
    <div
      className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <button
        className={btnClass + " absolute top-0 right-0 p-2"}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Change Theme
      </button>
      <div className="container p-4 mx-auto">{children}</div>
    </div>
  );
}
