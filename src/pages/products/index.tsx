import { products } from "@service";
import { useEffect, useState } from "react";
import { AddProduct } from "@modals";
import { Search, GlobalTableSkeleton, GlobalPagination } from "@ui";
import { GlobalTable } from "@global_table";
import { useProductStore } from "@store";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { getData, data, isLoading, totalCount } = useProductStore();
  const location = useLocation();
  const [params, setParams] = useState({
    limit: 8,
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
    { key: "product_name", value: "Name" },
    { key: "color", value: "Color" },
    { key: "count", value: "Count" },
    { key: "cost", value: "Cost %" },
    { key: "made_in", value: "Made in" },
    { key: "size", value: "Size" },
  ];

  return (
    <>
      <div className="flex justify-between w-full">
        <Search />
        <AddProduct />
      </div>
      <div>
        {isLoading ? (
          <GlobalTableSkeleton />
        ) : (
          <div>
            <GlobalTable
              headTitles={headTitles}
              rows={data}
              deleteAction={products.delete_product}
              singlePageName={"product"}
            />
          
              <GlobalPagination
                totalCount={totalCount}
                page={params.page}
                setParams={changePage}
              />

          </div>
        )}
      </div>
    </>
  );
};

export default Index;
