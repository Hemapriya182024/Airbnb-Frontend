
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (token) {
      axios
        .get("https://airbnb-backend-tm1o.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        })
        .then(({ data }) => {
          setUser(data.userDoc); // Adjust based on your actual data structure
          setReady(true);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setReady(true); // Set ready to true even if there is an error
        });
    } else {
      setReady(true); // Set ready to true if there is no token
    }
  }, []); // Empty dependency array to run only on mount

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
