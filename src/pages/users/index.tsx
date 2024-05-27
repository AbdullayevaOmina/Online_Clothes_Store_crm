import { useEffect, useState } from "react";
import { GlobalTable } from "@global_table";
import { AddUser } from "@modals";
import { Search } from "@ui";
import { users } from "@service";
import { GlobalTableSkeleton } from "@ui";
const Index = () => {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await users.get_users({
          page: 1,
          limit: 10,
        });
        if (response.status === 200) {
          setUsersData(response?.data?.user);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <AddUser />
      </div>
      {loading ? (
        <GlobalTableSkeleton />
      ) : (
        <GlobalTable
          rows={usersData}
          headTitles={headTitles}
          deleteAction={users.delete_user}
          singlePageName={"user"}
        />
      )}
      {/* <TableV2 tableHead={headTitles}/> */}
    </>
  );
};

export default Index;
