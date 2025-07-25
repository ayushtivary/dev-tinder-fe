import axiosInstance from "../Middleware/axios-wrapper";
import { ApiEndPoints } from "../Utils/Constants";

export const feedApi = () =>
  axiosInstance.get(ApiEndPoints.feedUrl, { hideLoader: true });
export const connectionApi = () => axiosInstance.get(ApiEndPoints.fetchConnectionsUrl);