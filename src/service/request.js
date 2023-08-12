import axios from "axios";
import router from "@/router";
import useLoading from "@/hooks/useLoading";

class Request {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
      // 添加默认的Content-Type
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    this.showLoading = false; // 用于控制loading
    this.loadingInstance = null; // loading实例
    this.interceptorsSetup(); // 建立请求拦截和响应拦截
  }

  // 请求拦截和响应拦截
  interceptorsSetup() {
    this.instance.interceptors.request.use(
      (config) => {
        // 判断请求时有没有传入loading
        this.showLoading = config.showLoading ?? this.showLoading;
        // 有传入loading就显示
        if (this.showLoading) {
          const { loadingInstance } = useLoading();
          this.loadingInstance = loadingInstance;
        }
        // 有token则带上到请求头中
        const token = localStorage.getItem("token") || "";
        if (token) {
          config.headers && (config.headers["token"] = token);
        }
        return config;
      },
      (err) => {
        console.error("网络请求出错", err);
        this.loadingInstance?.close();
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        // 请求完成，关闭loading
        this.loadingInstance?.close();
        const { code } = response.data;

        // 判断token是否过期，过期则跳转到登录页面并清除token
        if (code === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
          return Promise.reject(response.data);
        }
        return response;
      },
      (err) => {
        console.log("请求响应报错", err);
        this.loadingInstance?.close();
        return err;
      }
    );
  }

  // 基础请求方法，通过Promise返回请求结果
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log("request err:", err);
          reject(err);
        });
    });
  }
  get(config) {
    return this.request({ ...config, method: "get" });
  }

  post(config) {
    return this.request({ ...config, method: "post" });
  }

  postJson(config) {
    return this.request({
      ...config,
      method: "post",
      headers: { "Content-Type": "application/json" }
    });
  }
}

const { VITE_BASE_URL } = import.meta.env;
const request = new Request(VITE_BASE_URL, 2000);

export default request;
