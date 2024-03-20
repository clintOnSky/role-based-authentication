import { Role, useAuth } from "@/context/authContext";
import React from "react";

interface WithRoleProps {
  children: React.ReactNode;
  role: Role;
}
export const WithRole = ({ children, role }: WithRoleProps) => {
  const { authState } = useAuth();
  if (authState?.role !== role) {
    return <></>;
  }
  return children;
};
