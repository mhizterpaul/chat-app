type SignupInfo = {
  email: string;
  password: string;
};

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  profileSetup: boolean;
}

interface ApiError {
  message: string;
}
