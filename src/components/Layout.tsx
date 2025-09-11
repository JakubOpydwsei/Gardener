import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <hr />
      <main className="flex-grow text-center pt-8">
        <Outlet />
      </main>
      <hr className="w-8/10 m-auto" />
      <Footer />
    </div>
  );
}

export default Layout;
