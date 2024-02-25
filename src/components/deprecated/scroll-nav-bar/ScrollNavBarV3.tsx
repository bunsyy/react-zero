/**
 * Reference: https://stackoverflow.com/questions/68292416/navbar-hide-on-scroll-with-offset
 */

import { useEffect, useState } from "react";

import { cn } from "../../libs/cn";

const ScrollNavBarV3 = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      //   console.log("🚀 ~ handleScroll ~ currentScrollPos:", currentScrollPos);

      if (Math.abs(currentScrollPos - prevScrollpos) < 20) {
        return;
      }

      if (currentScrollPos > prevScrollpos) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);

  return (
    <nav
      className={cn(
        "slide-in-from-top-8 sticky left-0 top-0 bg-red-300",
        isVisible ? "hidden" : "block"
      )}
    >
      <div className="h-8"></div>
    </nav>
  );
};

export default ScrollNavBarV3;
