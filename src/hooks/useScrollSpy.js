import { useState, useEffect } from "react";

export default function useScrollSpy(ids, offset = 100) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    function handleScroll() {
      let currentId = "";
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            currentId = id;
            break;
          }
        }
      }
      setActiveId(currentId);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return activeId;
}
