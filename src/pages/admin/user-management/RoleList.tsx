import { useAppDispatch, useAppSelector } from "@/app/store";
import NoTableData from "@/components/atoms/NoTableData";
import TableWrapper from "@/components/elements/common/TableWrapper";
import CustomTable from "@/components/elements/common/custom-table/CustomTable";
import ManageModule from "@/components/elements/modal/ManageModule";
import SkeletonTable from "@/components/elements/skeleton/SkeletonTable";
import { Capsule } from "@/components/ui/Capsule";
import { getActualRole } from "@/constants/role-constant";
import { useDeleteSubCategoryMutation } from "@/feature/category/categoryQuery";
import { categoryAction } from "@/feature/category/categorySlice";
import { coreAction } from "@/feature/core/coreSlice";
import { useGetRolePermissionsQuery } from "@/feature/user-management/userManagementQuery";
import { userManagementAction } from "@/feature/user-management/userManagementSlice";
import PageLayout from "@/layout/PageLayout";
import { BreadCrumbItem, RolePermissionResponse } from "@/types";
import { cn } from "@/utils/twmerge";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: "Role List",
    link: "#",
  },
];

const tableHead = ["SL", "Name", "Permissions", "Action"];

const RoleList = () => {
  const navigator = useNavigate();
  const { type } = useAppSelector((state) => state.core);
  const { selectedCategory, selectedSubCategory } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  const [deleteCategory, { isLoading: isDeleteCategory }] =
    useDeleteSubCategoryMutation();

  const { data, isLoading, refetch } = useGetRolePermissionsQuery({
    query: {},
  });

  useEffect(() => {
    refetch();
  }, []);

  // console.log(`\n\n selectedSubCategory:`, selectedSubCategory);

  const handleUpdateStatus = async () => {
    await deleteCategory({
      id: selectedSubCategory?.id,
      query: {
        cat1: selectedCategory?.id,
      },
    });
  };

  const handleModal = (type?: string, data?: RolePermissionResponse) => {
    if (type === "cancelled") {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: "" }));
      dispatch(categoryAction.setSelectedSubCategory(null));
    } else if (type === "delete") {
      dispatch(
        coreAction.toggleModal({
          type: "delete-role",
          open: true,
        })
      );
      dispatch(
        userManagementAction.setSelectedRolePermission(
          data as RolePermissionResponse
        )
      );
    }
  };

  const manageRoles = (items: any) => {
    if (!items) return [];
    const data = Object?.keys(items?.Permissions)?.map?.((key) =>
      Object?.keys((items?.Permissions)[key])?.length > 0
        ? (getActualRole as any)?.[key]
        : ""
    );
    return data?.filter?.((item) => item !== "");
  };

  return (
    <>
      <ManageModule
        classes={
          type === "delete-role"
            ? {
                top: "visible",
                body: `-translate-y-[0%] max-w-[400px] p-3 min-w-[400px] border-red-500`,
              }
            : {
                top: "invisible",
                body: "-translate-y-[300%] max-w-[400px] p-3 min-w-[400px]",
              }
        }
        handleModal={handleModal}
        wrapperClass="h-full"
        isModalHeader
        outSideClick
        headText={`Delete the Role?`}
        heading={selectedSubCategory?.title || ""}
        details={`Are you certain you want to delete?`}
        type={"delete"}
        buttonText={isDeleteCategory ? "Deleting..." : "Delete"}
        buttonProps={{
          onClick: handleUpdateStatus,
          disabled: isDeleteCategory,
        }}
      />
      <PageLayout
        title="Role List"
        breadcrumbItem={breadcrumbItem}
        buttonText="Add Role"
        buttonProps={{
          onClick: () => navigator("/admin/user-management/role-list/add-role"),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        <TableWrapper isActiveInactive={false} isSort={false}>
          <CustomTable headList={tableHead}>
            {isLoading ? (
              <SkeletonTable total={6} tableCount={4} />
            ) : data?.data &&
              typeof data?.data === "object" &&
              data?.data?.length > 0 ? (
              data?.data?.map((item, index) => (
                <tr className="table_tr" key={item?.id}>
                  <td className="table_td">{index + 1}</td>
                  <td className="table_td uppercase">{item?.Title}</td>
                  <td className="table_td">
                    {manageRoles(item?.Permissions)?.map((el, key) => (
                      <Capsule key={key}>{el}</Capsule>
                    ))}
                  </td>
                  <td className="table_td">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/user-management/role-list/edit-role/${item?.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleModal("delete", item)}
                        className={cn(
                          "font-medium hover:underline",
                          "text-red-600 dark:text-red-500"
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
                <span className="font-medium">
                  {selectedCategory
                    ? "No data found!"
                    : "Please select a category to display the sub category list"}
                </span>
              </NoTableData>
            )}
          </CustomTable>
        </TableWrapper>
        {/* </Card> */}
      </PageLayout>
    </>
  );
};

export default RoleList;
