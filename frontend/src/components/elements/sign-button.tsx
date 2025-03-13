"use client";
import React from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdweb-dev";
import { toast } from "sonner";
import { signup } from "@/lib/services/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useCompleteMission } from "@/hooks/mission/useMission";
import { useXPToast } from "@/hooks/useXPToast";

function SignButton() {
  const account = useActiveAccount();

  const showToast = useXPToast();
  const { mutate: completeMission } = useCompleteMission();
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  account &&
    account.address &&
    localStorage.setItem("account", account.address);

  const { mutateAsync } = useMutation({
    mutationFn: async (address: string) => {
      const response = await signup(address);
      if (response.status === 200) {
        return response;
      }
      throw new Error(response.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const logout = async () => {
    console.log("logging out!");
  };
  return (
    <ConnectButton
      client={client}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", address);
          return true;
        },
        doLogin: async (params) => {
          const data = await mutateAsync(params.payload.address);
          const isUserAlreadyExists = localStorage.getItem("user_id");
          if (!isUserAlreadyExists && data?.result?.id) {
            await completeMission({
              missionId: "cm848foa6000b9li8z1wn6y8b",
              userId: data?.result?.id as string,
            });

            showToast("xp", "Earned 100 XP for signing in 🎉", {
              xp: 100,
            });
          }
          localStorage.setItem("user_id", data?.result?.id as string);
          localStorage.setItem("user_role", data.result?.role as string);
        },
        getLoginPayload: async ({ address }) => {
          return {
            domain: "nesify.com",
            address,
            statement: "Sign in to Nesify",
            version: "1",
            nonce: "1234567890",

            issued_at: new Date().toISOString(),
            expiration_time: new Date(
              Date.now() + 1000 * 60 * 60 * 24
            ).toISOString(),
            invalid_before: new Date(
              Date.now() - 1000 * 60 * 60 * 24
            ).toISOString(),
          };
        },
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
}

export default SignButton;
