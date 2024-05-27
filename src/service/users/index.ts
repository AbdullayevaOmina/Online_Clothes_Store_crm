import request from "../config";
import { Request } from "@users-interface";

const auth: Request = {
  get_users: (params) => request.get("/v1/users", { params }),
  get_user: (id) => request.get(`/v1/user/${id}`),
  create_user: (data) => request.post("/v1/user", data),
  update_user: (data) => request.put(`/v1/user`, data),
  delete_user: (id) => request.delete(`/v1/user/${id}`),
};

export default auth;
