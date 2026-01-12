import { ReactNode, createContext, useContext, useState } from "react";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const [token, setToken] = useState<string | null>(storedToken);

  const [user, setUser] = useState<User | null>(
    storedToken
      ? {
          id:
            localStorage.getItem("userId") ||
            sessionStorage.getItem("userId") ||
            "",
          email:
            localStorage.getItem("email") ||
            sessionStorage.getItem("email") ||
            "",
        }
      : null
  );

  const login = async (email: string, password: string, remember: boolean) => {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Niepoprawny email lub hasło");
    }

    const data = await res.json();

    setToken(data.token);
    setUser({ id: data.userId, email: data.email });

    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("token", data.token);
    storage.setItem("userId", data.userId);
    storage.setItem("email", data.email);
  };

  const register = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      let errMsg = "Błąd rejestracji";
      try {
        const errData = await res.json();
        errMsg = errData.error || errMsg;
      } catch {}
      throw new Error(errMsg);
    }

    const data = await res.json();

    if (!data.token || !data.userId) {
      throw new Error("Brak tokenu lub userId w odpowiedzi backendu.");
    }

    setToken(data.token);
    setUser({ id: data.userId, email });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
