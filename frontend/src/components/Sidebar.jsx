import React from "react";
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r h-screen border-gray-200 p-6">
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center scroll-none">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-gray-800 font-semibold text-lg">
          Mike William
        </h2>
      </div>

      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl bg-purple-600 text-white font-medium transition hover:bg-purple-700"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 font-medium transition hover:bg-purple-50 hover:text-purple-600"
            >
              <Wallet size={20} />
              Income
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 font-medium transition hover:bg-purple-50 hover:text-purple-600"
            >
              <TrendingDown size={20} />
              Expense
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-700 font-medium transition hover:bg-purple-50 hover:text-purple-600"
            >
              <LogOut size={20} />
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
