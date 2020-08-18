import { post } from "./axios.config";

export default {
  upload(formData) {
    // TODO: url 替换为真是的url
    return post("url", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
