export type Role =
  | "Admin"
  | "User"
  | "SuperAdmin"
  | "Operator"
  | "EventManager"
  | "Saleman"
  | "";

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

export interface ISignUp {
  email: string;
  password: string;
  passwordConfirm: string;
  agree: boolean;
}

export interface UpdateAdmin {
  Name: string;
  profilepic: string;
  name?: string;
}

export type SignUpPayload = Omit<ISignUp, "agree" | "passwordConfirm">;

export interface ResponseUser {
  ID: string;
  // images: string;
  // phone: string;
  role: Role;
  name: string;
  // profilepic: string;
  email: string;
}

// export interface ResponseUser {
//   firstName: string;
//   lastName: string;
//   userName: string;
//   email: string;
//   phoneNumber: string;
//   isphoneNumberVerified: boolean;
//   isEmailVerified: boolean;
//   id: string;
//   images?: string;
// }

export interface AuthResponse {
  // tokens: Tokens<TokenObject>;
  jwt: string;
  status: number;
  message: string;
  user: ResponseUser;
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
  email_phone: string;
  password: string;
  RemeberMe?: number | string;
  Type: string;
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
