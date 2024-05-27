import request from "../config";
import { Request } from "@workers-interface";

const auth: Request = {
  get_workers: (params) => request.get("/v1/workers", { params }),
  get_worker: (id) => request.get(`/v1/worker/${id}`),
  create_worker: (data) => request.post("/v1/worker", data),
  update_worker: (data) => request.put(`/v1/worker`, data),
  delete_worker: (id) => request.delete(`/v1/worker/${id}`),
};

export default auth;
