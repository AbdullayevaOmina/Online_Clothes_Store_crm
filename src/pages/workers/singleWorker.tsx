import { useEffect, useState } from "react";
import { workers } from "@service";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Notification from "@notification";
import { UpdateWorker } from "@modals";
import { WorkerData } from "@workers-interface";
import { getDataFromCookie } from "@token-service";

const Index: React.FC = () => {
  const id = getDataFromCookie("id");
  // const id = localStorage.getItem("id");
  const [workerData, setWorkerData] = useState<WorkerData>({
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
        const response = await workers.get_worker(id);
        if (response.status === 200) {
          setWorkerData({
            ...response.data,
            refresh_token: getDataFromCookie("refresh_token"),
            access_token: getDataFromCookie("token"),
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await workers.delete_worker(id);
      if (res.status === 200) {
        Notification({ title: "Worker deleted", type: "success" });
        navigate("/main/workers");
      }
    } catch (error) {
      console.error("Error deleting worker:", error);
      Notification({ title: "Failed to delete worker", type: "error" });
    }
  };

  return (
    <>
      <button onClick={() => navigate("/main/workers")}>
        <ArrowBackIosIcon />
      </button>
      <div className="w-full h-full d-flex p-4 mt-4">
        <div className="w-full h-full p-8 xl:flex lg:grid lg:place-items-center lg:place-content-center lg:gap-24 sm:gap-10 bg-slate-600 items-center">
          <img
            src=""
            className="xl:w-2/6 xl:h-5/6 md:w-full md:h-96 sm:w-44 sm:h-44 bg-slate-400 r mb-9"
            alt="Worker"
          />
          <div className="text-white text-[30px] md:text-[23px]">
            <h1>
              <span className="text-gray-900">Fullname: </span>
              {`${workerData.first_name} ${workerData.last_name}`}
            </h1>
            <h2>
              <span className="text-gray-900">Age:</span> {workerData.age}
            </h2>
            <h2 className="capitalize">
              <span className="text-gray-900">Gender:</span> {workerData.gender}
            </h2>
            <h2>
              <span className="text-gray-900">Email:</span> {workerData.email}
            </h2>
            <h2>
              <span className="text-gray-900">Phone: </span>
              {workerData?.phone_number}
            </h2>
            <h2>
              <span className="text-gray-900">ID: </span>
              {workerData.id}
            </h2>
            <h2>
              <span className="text-gray-900">Password: </span>
              {workerData.password}
            </h2>
            <div className="flex gap-5 mt-8">
              <button onClick={handleDelete} className="bg-rose-600 px-8">
                <PersonRemoveIcon />
              </button>
              <UpdateWorker WorkerData={workerData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
