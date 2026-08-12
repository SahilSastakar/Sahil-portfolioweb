import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav.jsx";
import Footer from "../Footer/Footer.jsx";
import GrainOverlay from "../GrainOverlay/GrainOverlay.jsx";
import { useSmoothScroll } from "../../hooks/useSmoothScroll.js";

function Layout() {
  useSmoothScroll();

  return (
    <>
      <GrainOverlay />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
