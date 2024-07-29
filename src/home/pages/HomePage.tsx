import React from "react";
import Welcome from "./components/Welcome";
import { useAuth } from "../../providers/authProvider";
import DashboardPage from "../../dashboard/pages/DashboardPage";

export const HomePage = () => {
  const { user } = useAuth();

  return <div>{user && user.email ? <DashboardPage /> : <Welcome />}</div>;
};
