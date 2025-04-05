declare namespace Auth {
  interface LoginResponse {
    status: boolean;
    message: string;
    token: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}

export default Auth;
