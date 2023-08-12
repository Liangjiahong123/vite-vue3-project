import request from "../request";

export const login = (params = {}) => {
  return request.post({ url: "/login", params, showLoading: true });
};
