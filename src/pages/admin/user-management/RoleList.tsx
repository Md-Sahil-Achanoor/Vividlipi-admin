import { useAppDispatch, useAppSelector } from "@/app/store";
import NoTableData from "@/components/atoms/NoTableData";
import TableWrapper from "@/components/elements/common/TableWrapper";
import CustomTable from "@/components/elements/common/custom-table/CustomTable";
import ManageModule from "@/components/elements/modal/ManageModule";
import SkeletonTable from "@/components/elements/skeleton/SkeletonTable";
import { Capsule } from "@/components/ui/Capsule";
import { getActualRole } from "@/constants/role-constant";
import { coreAction } from "@/feature/core/coreSlice";
import {
  useDeleteRolePermissionMutation,
  useGetRolePermissionsQuery,
} from "@/feature/user-management/userManagementQuery";
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
  const { selectedRolePermission } = useAppSelector(
    (state) => state.userManagement
  );
  const dispatch = useAppDispatch();

  const [deleteRolePermission, { isLoading: isDeleteRolePermission }] =
    useDeleteRolePermissionMutation();

  const { data, isLoading, refetch } = useGetRolePermissionsQuery({
    query: {},
  });

  useEffect(() => {
    dispatch(userManagementAction.resetAll());
    refetch();
  }, []);

  // console.log(`\n\n selectedSubRolePermission:`, selectedSubRolePermission);

  const handleUpdateStatus = async () => {
    await deleteRolePermission({
      id: selectedRolePermission?.id,
      query: {
        id: selectedRolePermission?.id as number,
      },
    });
  };

  const handleModal = (type?: string, data?: RolePermissionResponse) => {
    if (type === "cancelled") {
      // do nothing
      dispatch(coreAction.toggleModal({ open: false, type: "" }));
      dispatch(userManagementAction.setSelectedRolePermission(null));
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
    const data = Object?.keys(items)?.map?.(
      (key) => (getActualRole as any)?.[key]
    );
    console.log(`\n\n data:`, data);
    return data;
    // return data?.filter?.((item) => item !== "");
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
        heading={selectedRolePermission?.Title || ""}
        details={`Are you certain you want to delete?`}
        type={"delete"}
        buttonText={isDeleteRolePermission ? "Deleting..." : "Delete"}
        buttonProps={{
          onClick: handleUpdateStatus,
          disabled: isDeleteRolePermission,
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
                    <div className="flex gap-2 items-center flex-wrap">
                      {manageRoles(item?.Permissions)?.map((el, key) => (
                        <Capsule
                          className="bg-gray-200 w-max md:px-2 md:py-1"
                          key={key}
                        >
                          <span className="text-xs text-black/90">{el}</span>
                        </Capsule>
                      ))}
                    </div>
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
                <span className="font-medium">{"No data found!"}</span>
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
