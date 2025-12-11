export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  code: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  profile: UserProfile;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
