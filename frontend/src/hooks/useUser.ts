"use client";

export const useUser = () => {
  const id = localStorage.getItem("user_id");
  const role = localStorage.getItem("user_role");

  return { user: { id, role } };
};
