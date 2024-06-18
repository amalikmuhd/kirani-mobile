export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  address?: IAddress;
  nin?: string;
  currency?: string;
  date?: Date;
}

export interface UserAccountResponse {}
export type ICheckEmail = {
  email: string;
};
export type ISignUp = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};
export interface ICheckPhone {
  phone: string;
}
export interface ISignIn {
  email: string;
  password: string;
}

export interface IAddress {
  street: string;
  state: string;
  country: string;
}

export interface IOtp {
  email: string;
  otp: string;
  password: string;
}
