interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    scope: string; 
    permissions: string[];
  };
}

export default LoginResponse;
