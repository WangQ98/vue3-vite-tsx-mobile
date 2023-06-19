export interface RequestOptions {
  // 是否处理请求结果
  isTransformResponse?: boolean;
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean;
}

export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}
