import axiosInstance from "../Middleware/axios-wrapper";
import { ApiEndPoints } from "../Utils/Constants";

export const profileApi = (data) => axiosInstance.post(ApiEndPoints.profileUrl, data);
export const updateProfileApi = (data) => axiosInstance.post(ApiEndPoints.sendRequestUrl + data?.status + "/" + data?.userId);
export const updateProfileRequestApi = (data) => axiosInstance.post(ApiEndPoints.requestResponseUrl + data?.message + "/" + data?.data);
export const editProfileApi = (data) => axiosInstance.post(ApiEndPoints.saveProfileUrl, data);
export const fetchPhotoUrlApi = () => axiosInstance.get(ApiEndPoints.profileUrl);