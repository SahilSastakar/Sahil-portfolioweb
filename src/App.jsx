import { Routes, Route } from "react-router-dom";
import { PageTransitionProvider } from "./components/PageTransition/PageTransition.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Work from "./pages/Work/Work.jsx";
import Styleguide from "./pages/Styleguide/Styleguide.jsx";

function App() {
  return (
    <PageTransitionProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          {import.meta.env.DEV && (
            <Route path="/styleguide" element={<Styleguide />} />
          )}
        </Route>
      </Routes>
    </PageTransitionProvider>
  );
}

export default App;
