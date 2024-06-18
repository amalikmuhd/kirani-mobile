import { IOtp, ISignIn, ISignUp } from "@/types";
import Api from "./Api";

//  Auth
export const checkEmail = (email: string) => Api.post("check-email", { email });
export const checkPhone = (phoneNumber: string) => Api.post("check-phone", phoneNumber);
export const signup = (payload: ISignUp) => Api.post("signup", payload);
export const signin = (payload: ISignIn) => Api.post("signin", payload);
export const userProfile = () => Api.get(`user-profile`);
export const forgotPassword = (email: string) => Api.post("forgot-password", email);
export const resetPassword = (payload: IOtp) => Api.post("reset-password", payload);
