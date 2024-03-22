import axios from "axios";
import configs from "configs";

const httpDiv4 = axios.create({
  baseURL: configs.apiEndpointDiv4,
});

const httpDiv3 = axios.create({
  baseURL: configs.apiEndpointDiv3,
});

export { httpDiv3, httpDiv4 };
