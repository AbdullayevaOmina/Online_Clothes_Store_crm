import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import {
  Categories,
  Dashboard,
  MainLayout,
  Product,
  Products,
  ProtectedRoute,
  RequireAuth,
  SignIn,
  User,
  Users,
  Worker,
  Workers,
} from "@pages";
import { getDataFromCookie } from "@token-service";
// import MainStore from "../store/mainStore";

const Index = () => {
  // const { id } = MainStore();
  // const id = localStorage.getItem("id");
  const id = getDataFromCookie("id");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProtectedRoute element={<SignIn />} />} />
          <Route
            path="/main/*"
            element={<RequireAuth element={<MainLayout />} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="workers" element={<Workers />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<Categories />} />
            <Route path={`product/${id}`} element={<Product />} />
            <Route path={`worker/${id}`} element={<Worker />} />
            <Route path={`user/${id}`} element={<User />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
