import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "../../../libs/cn";

const ScrollNavBarSubV1 = () => {
  const [scaleFactor, setScaleFactor] = useState(1); // Initialize with 0
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      const initialScroll = 60;
      const maxScroll = 100;
      const normalizedScroll = Math.min(
        Math.max(currentScrollPosition - initialScroll, 0),
        maxScroll - initialScroll
      );
      const normalizedFactor =
        0.75 + (normalizedScroll / (maxScroll - initialScroll)) * 0.25; // Between 0.75 and 1

      setScaleFactor(normalizedFactor);
      setPrevScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  console.log("🚀 ~ ScrollNavBarSubV1 ~ scaleFactor:", scaleFactor);

  return (
    <motion.div className={cn("sticky left-0 top-0 bg-green-200")}>
      <motion.p initial={{ scale: 1 }} animate={{ scale: scaleFactor }}>
        SUB NAV BAR THAT WILL BE SCALED
      </motion.p>
    </motion.div>
  );
};

export default ScrollNavBarSubV1;
