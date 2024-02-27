import { AnimatePresence, motion } from "framer-motion";

import LongContent from "./components/long-content";
import useNavBar from "./hooks/useNavBar";
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

const MainBody = () => {
  return (
    <div className="flex h-[calc(100vh-50px)] bg-green-400">
      <aside className="fixed left-0 top-0 h-full">ASIDE</aside>
      <main>MAIN BODY</main>
    </div>
  );
};

const MainContent = () => {
  const { isNewReleaseSticky } = useNavBar();

  return (
    <div>
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
      {/* <LongContent className="flex bg-cyan-200" /> */}
      <MainBody />
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
