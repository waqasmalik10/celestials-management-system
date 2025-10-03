import { createContext, useState, useEffect, ReactNode } from "react";
import { verify, login } from "../features/api/auth";


interface BaseUser {
  name: string;
  email: string;
}

interface Employee {
  uniqueId: string;
  image: string;
  name: string;
  employeeId: string | number;
  mySelectField?: string;
  password?: string | number;
  date?: string | number | Date;
  employeeInformation?: string;
}


export type AppUser = BaseUser & Partial<Employee> & {
  companyId?: string | number;
  department?: string;
};

export const VerifyContext = createContext<{
  user: AppUser | null;
  admin: boolean;
  setAdmin: (admin: boolean) => void;
  setUser: (user: AppUser | null) => void;
  loginUser: (
    email: string,
    password: string,
    employee?: Employee[]
  ) => Promise<{ success: boolean; message?: string }>;
}>({
  user: null,
  admin: false,
  setAdmin: () => {},
  setUser: () => {},
  loginUser: async () => ({ success: false }),
});

export const VerifyContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [admin, setAdmin] = useState(false)
  

  const loginUser = async (
    email: string,
    password: string,
    employee?: Employee[]
  ) => {
    const { ok, data } = await login(email, password,);
    if (ok && data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }


  }, []);

  useEffect(() => {
    if (user?.name === "Celestial") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  return (
    <VerifyContext.Provider value={{ user, setUser, loginUser, admin, setAdmin }}>
      {children}
    </VerifyContext.Provider>
  );
};
