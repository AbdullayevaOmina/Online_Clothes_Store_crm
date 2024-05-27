import request from "../config";
import { Request } from "@auth-interface";
const auth: Request = {
  sign_in: (data) => request.post("/v1/login", data),
};

export default auth;
