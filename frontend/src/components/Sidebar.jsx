import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  LogOut,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/context";
import toast from "react-hot-toast";
import axios from "axios";

const Sidebar = ({ toggle, setToggle }) => {
  const { internalActiveSection, setInternalActiveSection, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success("Logged Out Successfully");
        navigate("/auth");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggle]);

  return (
    <>
      {toggle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setToggle(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 p-6 flex flex-col transform transition-transform duration-300 ease-in-out 
          ${toggle ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:relative lg:z-auto lg:flex`}
      >
        <button
          onClick={() => setToggle(false)}
          className="absolute top-4 right-4 lg:hidden text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-10 mt-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center">
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-2xl text-purple-600 font-semibold">
                {user?.name?.slice(0, 1).toUpperCase() || "U"}
              </p>
            )}
          </div>
          <h2 className="mt-4 text-gray-800 font-semibold text-lg">
            {user
              ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
              : "Loading..."}
          </h2>
        </div>

        <nav className="flex-1">
          <ul className="space-y-3">
            <li>
              <a
                onClick={() => {
                  setInternalActiveSection("Dashboard");
                  setToggle(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                  internalActiveSection === "Dashboard"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-purple-700 hover:text-white"
                }`}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setInternalActiveSection("Income");
                  setToggle(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                  internalActiveSection === "Income"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-purple-700 hover:text-white"
                }`}
              >
                <Wallet size={20} />
                Income
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  setInternalActiveSection("Expenses");
                  setToggle(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                  internalActiveSection === "Expenses"
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-purple-700 hover:text-white"
                }`}
              >
                <TrendingDown size={20} />
                Expense
              </a>
            </li>
            <li>
              <a
                onClick={logout}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  loading
                    ? "bg-purple-400 text-white cursor-not-allowed"
                    : "text-gray-700 hover:bg-purple-700 hover:text-white cursor-pointer"
                }`}
              >
                <LogOut size={20} />
                {loading ? "Logging Out..." : "Logout"}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
