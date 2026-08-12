import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav.jsx";
import Footer from "../Footer/Footer.jsx";
import GrainOverlay from "../GrainOverlay/GrainOverlay.jsx";

function Layout() {
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
