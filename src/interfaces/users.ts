export interface CreateUser {
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  password: string;
}

export interface GetUsers {
  limit: number;
  page: number;
}

export interface DeleteUser {
  id: string;
}
export interface GetUser {
  id: string | undefined;
}

export interface UserData {
  age: number;
  email: string;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  password: string;
  phone_number: string;

}

export interface FormData {
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface Request {
  get_users: (data: GetUsers) => any;
  get_user: (id: GetUser) => any;
  create_user: (data: CreateUser) => any;
  update_user: (data: UserData) => any;
  delete_user: (data: DeleteUser) => any;
}
