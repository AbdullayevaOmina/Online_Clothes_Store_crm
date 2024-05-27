import { useEffect, useState } from "react";
import { GlobalTable } from "@global_table";
import { AddCategory } from "@modals";
import { categories } from "@service";
import { GlobalTableSkeleton, GlobalPagination, Search } from "@ui";
import { useCategoryStore } from "@store";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { getData, data, isLoading, totalCount } = useCategoryStore();
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
    { key: "category_name", value: "Category name" },
    { key: "category_id", value: "Category ID" },
  ];

  return (
    <>
      <div className="flex justify-between w-full">
        <Search />
        <AddCategory />
      </div>
      {isLoading ? (
        <GlobalTableSkeleton />
      ) : (
        <div>
          <GlobalTable
            rows={data}
            headTitles={headTitles}
            deleteAction={categories.delete_category}
            singlePageName={"user"}
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
