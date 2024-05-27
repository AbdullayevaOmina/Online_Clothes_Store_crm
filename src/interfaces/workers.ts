export interface CreateWorker {
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  password: string;
}

export interface GetWorkers {
  limit: number;
  page: number;
}


export interface GetWorker {
  id: string | undefined;
}
export interface PostData {
  age: string | number;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  password: string;
  phone_number: string;
  id?: string;
}

export interface WorkerData {
  access_token: string;
  age: number;
  email: string;
  first_name: string;
  gender: string;
  id?: string;
  last_name: string;
  password: string;
  phone_number: string;
  refresh_token: string;
}

export interface FormData {
  first_name: string;
  last_name: string;
  age: string | number;
  gender: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface WorkersStore {
  data: any[];
  isLoading: boolean;
  totalCount: number;
  getData: (params: GetWorkers) => Promise<any>;
  createData: (data: CreateWorker) => Promise<any>;
  deleteData: (id: string) => Promise<any>;
  updateData: (data: WorkerData) => Promise<any>;
}

export interface Request {
  create_worker: (data: CreateWorker) => any;
  get_workers: (data: GetWorkers) => any;
  get_worker: (id: GetWorker) => any;
  delete_worker: (id: String) => any;
  update_worker: (data: WorkerData) => any;
}
