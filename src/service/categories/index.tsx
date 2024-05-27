import request from "../config";
import { Request } from "@categories-interface";

const auth: Request = {
  get_categories: (params) => request.get("/v1/categories", { params }),
  create_category: (data) => request.post(`/v1/category`, data),
  delete_category: (id) => request.get(`/v1/category/${id}`),
};

export default auth;
