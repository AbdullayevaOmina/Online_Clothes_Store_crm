import { getDataFromCookie } from "@token-service";
import request from "../config";
import { Request } from "@products-interface";

const auth: Request = {
  get_products: (params) => request.get("/v1/products", { params }),
  get_product: (id) => request.get(`/v1/product/${id}`),
  get_photo: (id) => request.get(`/v1/media/${id}`),
  create_product: (data) => request.post("/v1/product", data),
  delete_product: (id) => request.delete(`/v1/product/${id}`),
  upload_photo: (form) =>
    request.post(
      `http://store.go-clothes.uz:5555/v1/media/upload-photo?id=${getDataFromCookie(
        "id"
      )}`,
      form
    ),
  update_product: (data) => request.put(`/v1/product`, data),
};

export default auth;
