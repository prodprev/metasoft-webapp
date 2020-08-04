import axios from "axios";

const BASE_URL = `${location.protocol}//${location.hostname}:${location.port ||
  80}`;

// 响应时间
axios.defaults.timeout = 20 * 1000;
// 配置cookie
axios.defaults.withCredentials = true;
// 配置请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// 配置接口地址
axios.defaults.baseURL = process.env.NODE_ENV == "production" ? BASE_URL : "";
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = JSON.stringify(config.data);
    }

    return config;
  },
  (err) => {
    return err;
  }
);
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200 && res.data) {
      // 执行 Promise.resolve(res.data)
      return res.data;
    } else {
      return res;
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

// GET请求
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

// POST请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

// PUT请求
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

// DELETE请求
export function del(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
