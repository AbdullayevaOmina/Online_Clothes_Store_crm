import { useEffect, useState } from "react";
import { GlobalTable } from "@global_table";
import { AddWorker } from "@modals";
import { GlobalPagination, Search } from "@ui";
import { workers } from "@service";
import { useWorkerStore } from "@store";
import { GlobalTableSkeleton } from "@ui";
import { useLocation } from "react-router-dom";
const Index = () => {
  const { getData, data, isLoading, totalCount } = useWorkerStore();
  const location = useLocation();
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    getData(params);
  }, [params, getData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const pageNumber = page ? parseInt(page) : 1;
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  }, [location.search]);

  const changePage = (value: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  const headTitles = [
    { key: "first_name", value: "First Name" },
    { key: "last_name", value: "Last Name" },
    { key: "age", value: "Age" },
    { key: "email", value: "Email" },
    { key: "gender", value: "Gender" },
  ];

  return (
    <>
      <div className="flex justify-between w-full">
        <Search />
        <AddWorker />
      </div>
      {isLoading ? (
        <GlobalTableSkeleton />
      ) : (
        <div>
          <GlobalTable
            rows={data}
            headTitles={headTitles}
            deleteAction={workers.delete_worker}
            singlePageName={"worker"}
          />
          <GlobalPagination
            totalCount={totalCount}
            page={params.page}
            setParams={changePage}
          />
        </div>
      )}
    </>
  );
};

export default Index;
