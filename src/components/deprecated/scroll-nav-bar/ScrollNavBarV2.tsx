import { useEffect, useState } from "react";
import { TestTube2 } from "lucide-react";

const ScrollNavBarV2: React.FC = () => {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [mainNavBarVisible, setMainNavBarVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > prevScrollPosition) {
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
    <div>
      <nav
        className={`fixed z-50 flex w-full border-b border-gray-900 bg-gray-50 transition duration-100 ease-linear ${
          mainNavBarVisible ? "" : "invisible opacity-0"
        }`}
      >
        MAIN NAV BAR
      </nav>
    </div>
  );
};

export default ScrollNavBarV2;
