import Loader from "../../../components/atoms/Loader";
import NoTableData from "../../../components/atoms/NoTableData";
import CustomTable from "../../../components/elements/common/custom-table/CustomTable";

import { useEffect } from "react";
import { useAppDispatch } from "../../../app/store";
import ManageCategory from "../../../components/module/category/ManageCategory";
import { useGetCategoriesQuery } from "../../../feature/category/categoryQuery";
import { coreAction } from "../../../feature/core/coreSlice";
import PageLayout from "../../../layout/PageLayout";
import { BreadCrumbItem } from "../../../types";
import { cn } from "../../../utils/twmerge";

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: "Category List",
    link: "#",
  },
];
const tableHead = ["SL", "Name", "Action"];

const MainCategoryList = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch } = useGetCategoriesQuery({
    query: {},
    conditions: {
      type: "category1",
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  // const handleModal = (type: string) => {
  //   // console.log(`\n\n handleModal ~ type:`, type);
  //   if (type === "cancelled") {
  //     dispatch(coreAction.toggleModal({ type: "", open: false }));
  //     dispatch(operatorAction.setSelectedOperator(null));
  //   }
  // };

  // const handleUpdateStatus = async () => {
  //   await updateOperatorStatus({
  //     id: selectedOperator?.ID,
  //     query: {
  //       isActive: selectedOperator?.isActive === 1 ? "0" : "1",
  //     },
  //   });
  // };

  // const status = selectedOperator?.isActive === 1 ? "Deactivate" : "Activate";

  const handleModal = (type?: string) => {
    if (type === "cancelled") {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: "" }));
    } else {
      dispatch(coreAction.toggleModal({ open: true, type: "manage-category" }));
    }
  };

  return (
    <>
      <ManageCategory />
      <PageLayout
        title="Category List"
        breadcrumbItem={breadcrumbItem}
        buttonText="Add Category"
        buttonProps={{
          onClick: () => handleModal(),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        {/* <TableWrapper isActiveInactive isSort={false}> */}
        <CustomTable headList={tableHead}>
          {isLoading ? (
            <NoTableData colSpan={7}>
              <Loader className="h-40" />
            </NoTableData>
          ) : data?.data &&
            typeof data?.data === "object" &&
            data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <tr className="table_tr" key={item?.id}>
                <td className="table_td">{index + 1}</td>
                <td className="table_td uppercase">{item?.title}</td>
                <td className="table_td">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        // dispatch(
                        //   coreAction.toggleModal({
                        //     type: "status-operator",
                        //     open: true,
                        //   })
                        // );
                        // dispatch(operatorAction.setSelectedOperator(item));
                      }}
                      className={cn(
                        "font-medium hover:underline",
                        "text-blue-600 dark:text-blue-500"
                        // : "text-green-600 dark:text-green-500"
                      )}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        // dispatch(
                        //   coreAction.toggleModal({
                        //     type: "status-operator",
                        //     open: true,
                        //   })
                        // );
                        // dispatch(operatorAction.setSelectedOperator(item));
                      }}
                      className={cn(
                        "font-medium hover:underline",
                        "text-red-600 dark:text-red-500"
                        // : "text-green-600 dark:text-green-500"
                      )}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <NoTableData colSpan={7} parentClass="h-40">
              <span className="font-medium">No data found!</span>
            </NoTableData>
          )}
        </CustomTable>
        {/* </TableWrapper> */}
        {/* </Card> */}
      </PageLayout>
    </>
  );
};

export default MainCategoryList;
