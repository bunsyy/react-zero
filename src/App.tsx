import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LongContent from "./components/long-content";
import useNavBar from "./hooks/useNavBar";
import { useRect } from "./hooks/useRect";
import { cn } from "./libs/cn";

const Header = () => {
  const { showMainNav, showMainNavAsFixed } = useNavBar();

  return (
    <div>
      <div className="flex h-7 items-center justify-between bg-gray-100">
        <div>SUB BRANDS</div>
        <div>STORE TABS</div>
      </div>
      <header>
        <div className="relative">
          <div className="h-12"></div>
          <AnimatePresence>
            {(showMainNav || showMainNavAsFixed) && (
              <motion.nav
                animate={{
                  opacity: "var(--nav-opacity-to, 1)",
                  y: `var(--nav-y-to, ${showMainNav ? 0 : 10})`,
                }}
                exit={{
                  opacity: "var(--nav-opacity-from, 0)",
                  y: "var(--nav-y-from, -10)",
                }}
                transition={{ duration: showMainNav ? 0.3 : 0.05 }}
                className={cn(
                  showMainNav ? "absolute" : "fixed bg-white",
                  "inset-0 z-10 flex h-12 items-center justify-between"
                )}
              >
                <div>LOGO</div>
                <div>SEARCH</div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
      <div className="flex h-12 items-center bg-gray-100">MEMBERSHIP</div>
    </div>
  );
};

const MainBody = ({ asideTop }: { asideTop?: number }) => {
  console.log("🚀 ~ MainBody ~ asideTop:", asideTop);
  const { showMainNav, showMainNavAsFixed } = useNavBar();

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-50px)] bg-green-400",
        !showMainNav && "bg-yellow-300",
        showMainNavAsFixed && "bg-pink-300"
      )}
    >
      <aside
        className={cn(
          "flex-0 h-full w-28 bg-cyan-300",
          showMainNavAsFixed && "pt-40"
        )}
      >
        ASIDE
      </aside>
      <main>MAIN BODY</main>
    </div>
  );
};

// const calculateTopPosition = (elementRef: MutableRefObject<null>) => {
//   const rect = elementRef.current.getBoundingClientRect();
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   return rect.top + scrollTop;
// };

const MainContent = () => {
  const { isNewReleaseSticky } = useNavBar();
  const [rect, newReleaseRef] = useRect("scroll");
  const [asideTop, setAsideTop] = useState(rect?.bottom);
  // console.log("🚀 ~ MainContent ~ newReleaseRef:", {
  //   rect: rect,
  //   asideTop: rect?.bottom,
  // });

  useEffect(() => {
    setAsideTop(rect?.bottom);
  }, [rect?.bottom]);

  return (
    <div>
      <motion.div
        ref={newReleaseRef}
        className={cn(
          "flex h-12 items-center justify-between bg-white",
          "sticky top-0"
        )}
        animate={{
          translateY: isNewReleaseSticky ? 48 : 0,
        }}
        transition={{ duration: 0.05 }}
      >
        <div>NEW RELEASE</div>
        <div>FILTERS</div>
      </motion.div>
      {/* <LongContent className="flex bg-cyan-200" /> */}
      <MainBody asideTop={asideTop} />
    </div>
  );
};

const Footer = () => {
  return <div className="h-24 bg-blue-300">FOOTER</div>;
};

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
