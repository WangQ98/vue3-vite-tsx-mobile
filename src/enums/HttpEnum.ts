export enum ResultEnum {
  SUCCESS = 200,
  TIMEOUT = 401,
  NO_ENABLED = 400,
  NO_PERMISSION = 403,
  SERVER_ERROR = 500,
}

export enum RequestEnum {
  GET = "GET",
  POST = "POST",
}

export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data qs
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}
