//TODO Implement thing like this https://github.com/sixfwa/react-fastapi/blob/main/frontend/src/context/UserContext.jsx
// See example request template on Login.ts file
// Note: using sessionStorage instead of localStorage
// Route will be 'http://127.0.0.1:8000/api/auth/users'

import { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";


export const UserContext = createContext<[string | null, React.Dispatch<React.SetStateAction<string | null>>] | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = (props) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem("awesomeLeadsToken"));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get("/api/users/me", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          // Assuming the response data is an object with a 'token' property
          const { token: newToken } = response.data;

          // Update the token in state
          setToken(newToken);

          // Update the token in sessionStorage
          sessionStorage.setItem("awesomeLeadsToken", newToken);
        } catch (error) {
          // Handle errors here
          console.error(error);
          setToken(null);
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};