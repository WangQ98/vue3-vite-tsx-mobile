import axios from "axios";
import { showFailToast } from "vant";
import { cloneDeep } from "lodash-es";
import qs from "qs";
import { ContentTypeEnum, RequestEnum, ResultEnum } from "@/enums/";
import { getToken, logOut, removeToken } from "../auth";
import { isString } from "../is";
import { joinTimestamp } from "./helper";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { RequestOptions, Result } from "#/axios";

export default class Axios {
  private axiosInstance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);

    this.interceptors();
  }

  interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  interceptorsRequest() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const isToken = (config.headers || {}).isToken === false;
        const headers = config.headers || {};
        const params = config.params || {};
        const data = config.data || false;

        const token = getToken() || "";
        if (token && !isToken) {
          config.headers = Object.assign(headers, {
            Authorization: token,
          });
        }

        if (config.method?.toUpperCase() === RequestEnum.GET) {
          if (!isString(params)) {
            // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
            config.params = Object.assign(params || {}, joinTimestamp(true));
          }
        } else if (!isString(params)) {
          if (
            (Reflect.has(config, "data") &&
              config.data &&
              Object.keys(config.data).length > 0) ||
            config.data instanceof FormData
          ) {
            config.data = data;
            config.params = params;
          } else {
            // 非GET请求如果没有提供data，则将params视为data
            config.data = params;
            config.params = undefined;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  interceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    let conf = cloneDeep(config);

    const opt: RequestOptions = Object.assign({}, options);

    conf = this.beforeRequestHook(conf);

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          try {
            const ret = this.transformResponseHook(res, opt);
            resolve(ret);
          } catch (err) {
            reject(err || new Error("request error!"));
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: "GET" }, options);
  }

  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, method: "POST" }, options);
  }
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers;
    const contentType = headers?.["Content-Type"] || headers?.["content-type"];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, "data") ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: "brackets" }),
    };
  }
  transformResponseHook(res: AxiosResponse<Result>, options: RequestOptions) {
    const { isTransformResponse = true, isReturnNativeResponse = false } =
      options;
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回
    const { data: result } = res;

    if (!result) {
      throw new Error("请求出错，请稍候重试");
    }
    const { code, data, msg } = result;

    const hasSuccess =
      Reflect.has(result, "code") && Number(code) === ResultEnum.SUCCESS;

    if (hasSuccess) {
      return data;
    }

    let errorMsg = "请求出错，请稍候重试";

    switch (code) {
      case ResultEnum.TIMEOUT:
        errorMsg = "";
        removeToken();
        logOut();
        break;
      default:
        if (msg) {
          errorMsg = msg;
        }
    }

    if (errorMsg) {
      showFailToast(errorMsg);
    }

    throw new Error(msg);
  }
  beforeRequestHook(config) {
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(false));
      }
    } else if (!isString(params)) {
      if (
        Reflect.has(config, "data") &&
        config.data &&
        (Object.keys(config.data).length > 0 || config.data instanceof FormData)
      ) {
        config.data = data;
        config.params = params;
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params;
        config.params = undefined;
      }
    }
    return config;
  }
}
