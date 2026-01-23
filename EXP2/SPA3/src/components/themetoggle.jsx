import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 z-50 rounded-full p-3 
                 bg-white text-black shadow-lg"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
