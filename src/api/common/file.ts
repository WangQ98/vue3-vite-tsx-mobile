import { SYSTEM_SERVER } from "@/utils/constants";
import { ContentTypeEnum } from "@/enums";
import { http } from "@/utils/http";

enum Api {
  FILE_UPLOAD = "/v1/file/upload",
}

export const fileUpload = (data: FormData) => {
  return http.post({
    url: SYSTEM_SERVER + Api.FILE_UPLOAD,
    data,
    headers: {
      "Content-type": ContentTypeEnum.FORM_DATA,
    },
  });
};
