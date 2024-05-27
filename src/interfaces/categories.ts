export interface GetCategories {
  limit: number;
  page: number;
}

export interface DeleteCategories {
  id: string;
}

export interface FormData {
  category_name?: string;
}

export interface CategoriesStore {
  data: any[];
  isLoading: boolean;
  totalCount: number;
  getData: (params: GetCategories) => Promise<any>;
  createData: (data: FormData) => Promise<any>;
}

export interface Request {
  get_categories: (params: GetCategories) => any;
  create_category: (data: FormData) => any;
  delete_category: (id: DeleteCategories) => any;
}
