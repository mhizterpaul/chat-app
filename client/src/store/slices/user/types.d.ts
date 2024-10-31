import { ReactNode } from "react";

type SignupInfo = {
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginInfo = {
  email: string, 
  password: string
}

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  profileSetup: boolean;
}

interface IActivePage {
  name: string;
  description?: string;
  icon?: ReactNode | null;
}
