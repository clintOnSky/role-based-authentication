import React from "react";
import { Role, useAuth } from "@/tutorial/context/auth";

const WithAccess = ({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) => {
  const { auth } = useAuth();
  return role !== auth?.role ? <></> : children;
};

export default WithAccess;
