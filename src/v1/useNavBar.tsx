import { useEffect, useState } from "react";

const useNavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showMainNav, setShowMainNav] = useState(true);
  const [showMainNavAsFixed, setShowMainNavAsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const curScrollPos = window.scrollY;

      const isScrollingDown = curScrollPos > prevScrollPos;
      // h-7 + h-12 = h-19
      // convert h-19 to pixels => (19/4) * 16px = 76px
      // add some paddings => 76px + 4px = 80px
      const showMainNavAsFixedThreshold = 80;
      const isUserAtOrBelowCertainPixel =
        curScrollPos <= showMainNavAsFixedThreshold;

      if (
        !isScrollingDown &&
        isUserAtOrBelowCertainPixel &&
        !showMainNavAsFixed
      ) {
        setShowMainNav(true);
      } else {
        setShowMainNav(false);
      }

      if (
        (!isUserAtOrBelowCertainPixel && !isScrollingDown) ||
        (!isScrollingDown && prevScrollPos >= 32)
      ) {
        setShowMainNavAsFixed(true);
      } else {
        setShowMainNavAsFixed(false);
      }

      setPrevScrollPos(curScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return {
    curScrollPos: prevScrollPos,
    showMainNav,
    showMainNavAsFixed,
    // where does 128 come from?
    // height of the 3 top nav => showMainNavAsFixedThreshold + height of the Membership
    // so we get 80 + h-12 => 80px + 48px = 128px
    isNewReleaseSticky: showMainNavAsFixed && prevScrollPos > 128,
  };
};

export default useNavBar;
