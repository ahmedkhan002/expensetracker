import axios from "axios";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const [internalActiveSection, setInternalActiveSection] = useState("Dashboard");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/user-data`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.userData);
      } else {
        toast.error(res.data.message || "Failed to fetch user");
        setUser(null);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "An unexpected error occurred";
      toast.error(message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <AppContext.Provider
      value={{
        internalActiveSection,
        setInternalActiveSection,
        user,
        isLoading,
        getUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
