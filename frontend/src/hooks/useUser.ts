"use client";

import { getLocalStorage } from "@/lib/utils/storage";
import { useEffect, useState } from "react";

interface User {
  id: string | null;
  role: string | null;
}

export const useUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const id = getLocalStorage("user_id");
    const role = getLocalStorage("user_role");
    setUser({ id, role });
  }, []);

  return { user };
};
