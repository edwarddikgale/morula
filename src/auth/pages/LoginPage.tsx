import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { authAPI } from "../utils/AuthAPI";
import { AuthFormData } from "../types/AuthFormData";
import { pageNames } from "../../config/pageNames";
import { useAuth } from "../../providers/authProvider";

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (authData: AuthFormData) => {
    try {
      setIsLoading(true);
      const response = await signIn(authData.email, authData.password);
      setIsLoading(false);
      navigate(pageNames.DASHBOARD);
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} isLoading={isLoading} errorMessage={errorMessage} />
    </div>
  );
};
