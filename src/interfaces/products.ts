export interface CreateProduct {
  age_max: number;
  age_min: number;
  category_id: string;
  color: string;
  cost: number;
  count: number;
  description: string;
  discount: number;
  for_gender: "male" | "female";
  made_in: string;
  product_id: string;
  product_name: string;
  size: number;
}

export interface GetProducts {
  limit: number;
  page: number;
  name?: string;
}

export interface UpdateData extends CreateProduct {
  product_id: string;
}

export interface FormData extends CreateProduct {}

export interface UploadPhoto {
  id: string;
  form: FormData;
}

export interface ProductsStore {
  data: any[];
  productData: any[];
  photosData: any[];
  isLoading: boolean;
  totalCount: number;
  getData: (params: GetProducts) => Promise<any>;
  createData: (data: FormData) => Promise<any>;
  getPhotos: (id: string | undefined) => Promise<any>;
  getProduct: (id: string | undefined) => Promise<any>;
  uploadPhoto: (form: UploadPhoto) => Promise<any>;
  updateProduct: (data: UpdateData) => Promise<any>;
  deleteProduct: (id: string | undefined) => Promise<any>;
}

export interface Request {
  create_product: (data: CreateProduct) => Promise<any>;
  get_products: (params: GetProducts) => Promise<any>;
  get_product: (id: string | undefined) => Promise<any>;
  get_photo: (id: string | undefined) => Promise<any>;
  delete_product: (id: string | undefined) => Promise<any>;
  upload_photo: (form: UploadPhoto) => Promise<any>;
  update_product: (data: UpdateData) => Promise<any>;
}
