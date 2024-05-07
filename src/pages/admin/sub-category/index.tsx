import Loader from "../../../components/atoms/Loader";
import NoTableData from "../../../components/atoms/NoTableData";
import CustomTable from "../../../components/elements/common/custom-table/CustomTable";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import TableWrapper from "../../../components/elements/common/TableWrapper";
import InfiniteFilter from "../../../components/elements/filters/InfiniteFilter";
import ManageSubCategory from "../../../components/module/category/ManageSubCategory";
import { useGetCategoriesQuery } from "../../../feature/category/categoryQuery";
import { categoryAction } from "../../../feature/category/categorySlice";
import { coreAction } from "../../../feature/core/coreSlice";
import PageLayout from "../../../layout/PageLayout";
import {
  BreadCrumbItem,
  CategoryQuery,
  CategoryResponse,
} from "../../../types";
import { cn } from "../../../utils/twmerge";

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: "Sub Category List",
    link: "#",
  },
];
const tableHead = [
  "SL",
  // "ID",
  "Name",
  "Category",
  "Action",
];

const SubCategoryList = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state) => state.category);
  const query = () => {
    let q: Partial<CategoryQuery> = {};
    if (selectedCategory) {
      q = {
        cat1: selectedCategory.id,
      };
    }
    return q;
  };
  const { data, isLoading, refetch } = useGetCategoriesQuery({
    query: query(),
  });

  useEffect(() => {
    refetch();
  }, []);

  const handleModal = (type?: string) => {
    if (type === "cancelled") {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: "" }));
    } else {
      dispatch(
        coreAction.toggleModal({ open: true, type: "manage-sub-category" })
      );
    }
  };

  const {
    isLoading: categoryLoading,
    refetch: categoryRefetch,
    data: categoryList,
    isError: categoryIsError,
    error: categoryErrorMessage,
  } = useGetCategoriesQuery({
    conditions: {
      type: "category1",
    },
  });

  useEffect(() => {
    categoryRefetch();
  }, []);

  return (
    <>
      <ManageSubCategory />
      <PageLayout
        title="Sub Category List"
        breadcrumbItem={breadcrumbItem}
        buttonText="Add Sub Category"
        buttonProps={{
          onClick: () => handleModal(),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        <TableWrapper
          isActiveInactive={false}
          isSort={false}
          renderCustom={() => (
            <>
              <div className="max-w-[250px] min-w-[200px]">
                <InfiniteFilter<CategoryResponse>
                  wrapperClass=""
                  buttonClass="border p-2"
                  items={categoryList?.data || []}
                  renderItem={(item) => <>{item.title}</>}
                  isActive={(item) => item.id === selectedCategory?.id}
                  isSelected={false}
                  isLoading={categoryLoading}
                  isError={categoryIsError}
                  errorMessage={
                    (categoryErrorMessage as string) || "Something went wrong!"
                  }
                  name={() => (
                    <div className="flex items-center gap-1">
                      <span className="text-sm">
                        {selectedCategory?.title || "Select Category"}
                      </span>
                    </div>
                  )}
                  clearData={() =>
                    dispatch(categoryAction.setSelectedCategory(null))
                  }
                  handleSelectedOption={(item) =>
                    dispatch(categoryAction.setSelectedCategory(item))
                  }
                />
              </div>
            </>
          )}
        >
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
                  {/* <td className="table_td">{item?.PhoneNo}</td> */}
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
        </TableWrapper>
        {/* </Card> */}
      </PageLayout>
    </>
  );
};

export default SubCategoryList;
