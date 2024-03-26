import axios from "axios";
import configs from "configs";

const http = axios.create({
  baseURL: configs.apiEndpoint,
});

export { http };
