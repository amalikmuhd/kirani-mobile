export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
  nin?: string;
  currency?: string;
  date?: Date;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface IOtp {
  email: string;
  otp: string;
  password: string;
}
