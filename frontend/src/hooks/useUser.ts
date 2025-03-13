"use client";

import { useEffect, useState } from "react";

interface User {
  id: string | null;
  role: string | null;
}

export const useUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    const role = localStorage.getItem("user_role");
    setUser({ id, role });
  }, []);

  return { user };
};
