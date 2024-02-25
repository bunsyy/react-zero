import { AnimatePresence, motion } from "framer-motion";

import LongContent from "../components/long-content";
import { cn } from "../libs/cn";
import useNavBar from "./useNavBar";

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
    </div>
  );
};

const MainContent = () => {
  const { isNewReleaseSticky } = useNavBar();

  return (
    <div>
      <div className="flex h-12 items-center bg-gray-100">MEMBERSHIP</div>
      <motion.div
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
      <LongContent />
    </div>
  );
};

function App() {
  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
}

export default App;
