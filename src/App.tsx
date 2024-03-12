import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useAtom } from "jotai";

import { footerVisibleHeightAtom } from "./atoms/footerAtom";
import LoremIpsum from "./components/long-content/lorem-ipsum";
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
  const [footerVisibleHeight] = useAtom(footerVisibleHeightAtom);

  const asideHeight = asideTop + footerVisibleHeight + 1;

  return (
    <div className={cn("flex")}>
      <aside
        className={cn(
          "flex-0 sticky h-full w-48 overflow-y-scroll"
          // showMainNav && "bg-violet-300",
          // !showMainNav && "bg-sky-300",
          // showMainNavAsFixed && "bg-orange-300"
        )}
        style={{
          height: `calc(100vh - ${asideHeight}px)`,
          maxHeight: `calc(100vh - ${asideHeight}px)`,
          top: asideTop && asideTop > 48 ? asideTop : 48,
        }}
      >
        <LoremIpsum className="" />
      </aside>
      <main className="w-full">
        <LoremIpsum />
      </main>
    </div>
  );
};

const MainContent = () => {
  const { isNewReleaseSticky } = useNavBar();
  const [rect, newReleaseRef] = useRect("scroll");
  const [asideTop, setAsideTop] = useState(rect?.bottom);

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
      <MainBody asideTop={asideTop} />
    </div>
  );
};

const Footer = () => {
  const [_, setFooterAtom] = useAtom(footerVisibleHeightAtom);
  const [footerRect, footerRef] = useRect("scroll");
  const isFooterInView = useInView(footerRef);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const scrollMaxY =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  useEffect(() => {
    setFooterAtom(
      isFooterInView
        ? Math.ceil(window.scrollY - (scrollMaxY - footerRect?.height))
        : 0
    );
  }, [isFooterInView, scrollMaxY, footerRect, setFooterAtom]);

  useEffect(() => {
    const handleScroll = () => {
      const curScrollPos = window.scrollY;

      if (Math.ceil(curScrollPos) === scrollMaxY) {
        setFooterAtom(96);
      } else {
        setFooterAtom(
          isFooterInView
            ? Math.ceil(prevScrollPos - (scrollMaxY - footerRect?.height))
            : 0
        );
      }

      setPrevScrollPos(curScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div ref={footerRef} className="h-24">
      FOOTER
    </div>
  );
};

function App() {
  return (
    <div className="scroll-smooth">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
