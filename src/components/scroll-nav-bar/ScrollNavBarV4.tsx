/**
 * This version includes:
 * - Both the main navigation and secondary navigation bars
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "../../libs/cn";

const ScrollNavBarV4: React.FC = () => {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [mainNavBarVisible, setMainNavBarVisible] = useState(true);
  const [secondaryNavBarSticky, setSecondaryNavBarSticky] = useState(false);

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    const isScrollingDown = currentScrollPosition > prevScrollPosition;

    if (isScrollingDown && currentScrollPosition > 50) {
      setMainNavBarVisible(false);
    } else {
      setMainNavBarVisible(true);
    }
    setPrevScrollPosition(currentScrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="bg-white">
      <AnimatePresence>
        {mainNavBarVisible && (
          <motion.nav
            initial={{
              opacity: "var(--opacity-from, 0)",
              y: "var(--y-from, -10)",
            }}
            animate={{ opacity: "var(--opacity-to, 1)", y: "var(--y-to, 0)" }}
            exit={{
              opacity: "var(--opacity-from, 0)",
              y: "var(--y-from, -10)",
            }}
            transition={{ duration: 0.15 }}
            className={cn(
              "fixed top-0 z-50 w-full bg-white",
              "[--opacity-from:0] [--y-from:-10px]",
              "[--opacity-to:1] [--y-to:0px]"
            )}
          >
            MAIN NAV BAR
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollNavBarV4;
