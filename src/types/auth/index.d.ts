export type Role = "admin" | "";

export type CountryInfoCode = {
  countryCode?: string;
  dialCode?: string;
};

export interface TokenObject {
  expires: string;
  token: string;
}

export interface Tokens<T> {
  access: T;
  refresh: T;
}

export interface ResponseUser {
  email: string;
  id: number;
  picture: string;
  first_name: string;
  last_name: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  status: number;
  message: string;
  user: ResponseUser;
  admin: ResponseUser;
}

export interface OtpPayload {
  phoneNumber: string;
}

export interface OTPVerify extends OtpPayload {
  countryInfo: CountryInfoCode;
}

export interface OtpVerify {
  otp: string;
}

export interface ForgotPasswordType {
  email: string;
}

export interface ResetPasswordType {
  password: string;
  passwordConfirm: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: ResponseUser | null;
  tokens: Tokens<TokenObject> | null;
  token: string;
  reRender: boolean;
  role: Role;
  type: string;
  selectedUser: UpdateAdmin | null;
}

export interface IUserPassword {
  OldPassword: string;
  NewPassword: string;
  passwordConfirm: string;
}

export interface UserPasswordPayload
  extends Omit<IUserPassword, "passwordConfirm"> {}

export interface UserPasswordResponse extends ResponseUser {
  message: string;
}
