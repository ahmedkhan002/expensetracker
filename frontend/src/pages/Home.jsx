import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Income from "../components/Income";
import Expenses from "../components/Expenses";
import { useState } from "react";

const Home = () => {
  const [toggle, settoggle] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header toggle={toggle} settoggle={settoggle} />

      <div className="flex flex-1 relative">
        <Sidebar toggle={toggle} setToggle={settoggle} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 mt-16 lg:mt-0">
          <Dashboard />
          <Income />
          <Expenses />
        </main>
      </div>
    </div>
  );
};

export default Home;
