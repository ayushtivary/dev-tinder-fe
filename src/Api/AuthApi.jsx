import axiosInstance from "../Middleware/axios-wrapper";
import { ApiEndPoints } from "../Utils/Constants";

export const loginApi = (data) => axiosInstance.post(ApiEndPoints.loginUrl, data);
export const signupApi = (data) => axiosInstance.post(ApiEndPoints.signupUrl, data);
export const logoutApi = () => axiosInstance.post(ApiEndPoints.logoutUrl);