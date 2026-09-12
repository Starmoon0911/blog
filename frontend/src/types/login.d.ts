interface LoginResponse {
  token: string;
}
interface LoginError {
  message: string;
}

export { LoginResponse, LoginError };
