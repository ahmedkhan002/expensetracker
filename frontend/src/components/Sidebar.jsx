import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAppContext } from '../context/context';
import toast from "react-hot-toast";
import axios from "axios";

const Sidebar = ({toggle}) => {
  const { internalActiveSection, setInternalActiveSection, user } = useAppContext();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()
  const logout = async () => {
    try {
      setloading(true)
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        setloading(false);
        toast.success('Logged Out Successfully');
        navigate('/auth');
      } else {
        setloading(false);
      }
    } catch (err) {
      setloading(false);
    }
  };

  return (
    <aside className={`max-lg:fixed lg:flex flex-col w-64 bg-white border-r h-screen border-gray-200 p-6 ${toggle === true ? '' : 'hidden'}`}>
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-purple-100 flex items-center justify-center scroll-none">
          {user ?
          <img
            src={user.profilePhoto}
            alt="User avatar"
            className="w-full h-full object-cover"
          /> : <p>{user?.name.slice(0,1).toUpperCase()}</p>
          }
        </div>
        <h2 className="mt-4 text-gray-800 font-semibold text-lg">
          {user ? user.name.slice(0, 1).toUpperCase() + user.name.slice(1) : 'Loading...'}
        </h2>
      </div>

      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <a
              onClick={() => setInternalActiveSection('Dashboard')}
              className={`flex items-center gap-3 p-3 rounded-xl ${internalActiveSection === "Dashboard" ? "bg-purple-600 text-white" : "text-gray-700"} font-medium transition hover:text-white cursor-pointer hover:bg-purple-700`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </a>
          </li>
          <li>
            <a
              onClick={() => setInternalActiveSection('Income')}
              className={`flex items-center gap-3 p-3 rounded-xl ${internalActiveSection === "Income" ? "bg-purple-600 text-white" : "text-gray-700"} font-medium transition hover:text-white cursor-pointer hover:bg-purple-700`}
            >
              <Wallet size={20} />
              Income
            </a>
          </li>
          <li>
            <a
              onClick={() => setInternalActiveSection('Expenses')}
              className={`flex items-center gap-3 p-3 rounded-xl ${internalActiveSection === "Expenses" ? "bg-purple-600 text-white" : "text-gray-700"} font-medium transition hover:text-white cursor-pointer hover:bg-purple-700`}
            >
              <TrendingDown size={20} />
              Expense
            </a>
          </li>
          <li>
            <a
              onClick={logout}
              className={`flex items-center gap-3 p-3 rounded-xl ${internalActiveSection === "Logout" ? "bg-purple-600 text-white" : "text-gray-700"} font-medium transition hover:text-white hover:bg-purple-700 ${loading ? 'pointer-events-none hover:bg-purple-400 bg-purple-400' : 'cursor-pointer'}`}
            >
              <LogOut size={20} />
              { loading ? 'Logging Out...' : 'Logout' }
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
