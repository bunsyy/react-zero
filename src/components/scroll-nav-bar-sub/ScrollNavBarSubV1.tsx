import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "../../libs/cn";

const ScrollNavBarSubV1 = () => {
  const [scaleFactor, setScaleFactor] = useState(1); // Initialize with 0
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [mainNavBarVisible, setMainNavBarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      const initialScroll = 60;
      const maxScroll = 300;
      const normalizedScroll = Math.min(
        Math.max(currentScrollPosition - initialScroll, 0),
        maxScroll - initialScroll
      );
      // const normalizedFactor =
      //   0.75 + (normalizedScroll / (maxScroll - initialScroll)) * 0.25; // Between 0.75 and 1
      const scaleFactorRange = 0.75 - 1;
      const normalizedFactor =
        1 + (normalizedScroll / (maxScroll - initialScroll)) * scaleFactorRange; // Between 1.25 and 1

      setScaleFactor(normalizedFactor);

      const isScrollingDown = currentScrollPosition > prevScrollPosition;

      if (isScrollingDown && currentScrollPosition > 50) {
        setMainNavBarVisible(false);
      } else {
        setMainNavBarVisible(true);
      }
      setPrevScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  // console.log("🚀 ~ ScrollNavBarSubV1 ~ scaleFactor:", scaleFactor);
  const a = 16 + 16 * scaleFactor;
  return (
    <motion.div
      className={cn("sticky left-0 top-0 bg-green-200 text-base")}
      style={{ fontSize: `${a}px` }}
    >
      SUB NAV BAR THAT WILL BE SCALED
    </motion.div>
  );
};

export default ScrollNavBarSubV1;
