// src/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuthStore from "../stores/authStore";

const Layout: React.FC = () => {
  const { user } = useAuthStore();
  const handleLogout = () => useAuthStore.getState().logout();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
