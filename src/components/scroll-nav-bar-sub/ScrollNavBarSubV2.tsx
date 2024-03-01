import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "../../libs/cn";

const ScrollNavBarSubV2 = () => {
  const [fontSize, setFontSize] = useState(16); // Initial font size (you can adjust this)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the new font size based on scroll position
      const scrollPosition = window.scrollY;
      const newSize = 16 + scrollPosition * 0.02; // Adjust the multiplier as needed

      // Update the state
      setFontSize(newSize);
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log("🚀 ~ ScrollNavBarSubV1 ~ scaleFactor:", scaleFactor);
  // const a = 16 + 16 * scaleFactor;
  return (
    <motion.div
      className={cn("sticky left-0 top-0 bg-pink-200", `font-[${fontSize}px]`)}
      // style={{ fontSize: `${fontSize}px` }}
    >
      SUB NAV BAR THAT WILL BE SCALED
    </motion.div>
  );
};

export default ScrollNavBarSubV2;
