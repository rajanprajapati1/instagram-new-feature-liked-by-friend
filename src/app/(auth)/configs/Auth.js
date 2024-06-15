"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const UserContext = createContext();

export const InstaOAuth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);

  const fetchUser = useCallback(() => {
    setLoading(true);

    fetch(`/api/getUser`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error fetching user");
        }
      })
      .then((data) => {
        setUser(data?.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, Loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const OAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    return null;
  } else {
    return context;
  }
};
