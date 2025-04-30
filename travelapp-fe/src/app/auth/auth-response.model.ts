export type AuthResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  user: {
    id: string;
    email: string;
  };
}
