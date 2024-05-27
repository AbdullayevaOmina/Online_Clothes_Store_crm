import { useEffect, useState } from "react";
import { users } from "@service";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Notification from "@notification";
import { UpdateUser } from "@modals";
import { UserData } from "@users-interface";
import { getDataFromCookie } from "@token-service";

const Index: React.FC = () => {
  const id = getDataFromCookie("id");
  const [userData, setUserData] = useState<UserData>({
    age: 6,
    email: "",
    first_name: "",
    gender: "",
    id: "",
    last_name: "",
    password: "",
    phone_number: "",
    access_token: "",
    refresh_token: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await users.get_user(id);
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await users.delete_user(id);
      if (res.status === 200) {
        Notification({ title: "user deleted", type: "success" });
        navigate("/main/users");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Notification({ title: "Failed to delete user", type: "error" });
    }
  };
  if (!userData) return <div>Loading...</div>;
  return (
    <>
      <button onClick={() => navigate("/main/users")}>
        <ArrowBackIosIcon />
      </button>
      <div className="w-full h-full d-flex p-4 mt-4">
        <div className="w-full h-full p-8 xl:flex lg:grid lg:place-items-center lg:place-content-center lg:gap-24 sm:gap-10 bg-slate-600 items-center">
          <img
            src=""
            className="xl:w-2/6 xl:h-5/6 md:w-full md:h-96 sm:w-44 sm:h-44 bg-slate-400 r mb-9"
            alt="user"
          />
          <div className="text-white text-[30px] md:text-[23px]">
            <h1>
              <span className="text-gray-900">Fullname: </span>
              {`${userData.first_name} ${userData.last_name}`}
            </h1>
            <h2>
              <span className="text-gray-900">Age:</span> {userData.age}
            </h2>
            <h2 className="capitalize">
              <span className="text-gray-900">Gender:</span> {userData.gender}
            </h2>
            <h2>
              <span className="text-gray-900">Email:</span> {userData.email}
            </h2>
            <h2>
              <span className="text-gray-900">Phone: </span>
              {userData?.phone_number}
            </h2>
            <h2>
              <span className="text-gray-900">ID: </span>
              {userData.id}
            </h2>
            <h2>
              <span className="text-gray-900">Password: </span>
              {userData.password}
            </h2>
            <div className="flex gap-5 mt-8">
              <button onClick={handleDelete} className="bg-rose-600 px-8">
                <PersonRemoveIcon />
              </button>
              <UpdateUser UserData={userData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
