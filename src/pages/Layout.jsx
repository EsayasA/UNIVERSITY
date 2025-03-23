import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-outlet">
        <ToastContainer />
        <Outlet className="main-outlet" />
      </main>
      <Footer />
    </div>
  );
}
