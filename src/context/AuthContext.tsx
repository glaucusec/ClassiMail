"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

type AuthContextType = {
  name: string;
  email: string;
  picture: string;
  token: string;
  setAccessTokenHandler: (token: string) => void;
};

const defaultAuthContext: AuthContextType = {
  name: "",
  email: "",
  token: "",
  picture: "",
  setAccessTokenHandler: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [token, setToken] = useState("");

  const setAccessTokenHandler = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
      const fetchUserData = async () => {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        const picture = data.picture;
        const email: string = data.email;
        const name: string = data.given_name + " " + data.family_name;
        setEmail(email);
        setName(name);
        setPicture(picture);
      };
      fetchUserData();
    }
  }, [token]);

  const authValue: AuthContextType = {
    name,
    email,
    token,
    picture,
    setAccessTokenHandler,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
