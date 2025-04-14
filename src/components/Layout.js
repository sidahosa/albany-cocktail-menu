import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react";

const Layout = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <Analytics />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
