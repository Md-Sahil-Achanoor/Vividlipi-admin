import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/atoms/Loader";
import NoTableData from "../../../components/atoms/NoTableData";
import CustomTable from "../../../components/elements/common/custom-table/CustomTable";

import PageLayout from "../../../layout/PageLayout";
import { BreadCrumbItem } from "../../../types";
import { cn } from "../../../utils/twmerge";

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: "Product List",
    link: "#",
  },
];
const tableHead = [
  "SL",
  // "ID",
  "Name",
  "Category",
  // "Phone Number",
  // "Address",
  "Action",
];

const ProductList = () => {
  const navigate = useNavigate();
  // const { selectedOperator, reRender } = useAppSelector(
  //   (state) => state.operator
  // );
  // const { type, selectedStatus } = useAppSelector((state) => state.core);

  // const [updateOperatorStatus, { isLoading: isUpdateStatus }] =
  //   useUpdateOperatorStatusMutation();

  // const dispatch = useAppDispatch();
  // const { data, isLoading, refetch } = useGetOperatorsQuery({
  //   query: { status: "1", isActive: selectedStatus },
  // });

  // useEffect(() => {
  //   refetch();
  // }, [reRender]);

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

  const data: any = [];

  return (
    <>
      {/* <ManageModule
        classes={
          type === "status-operator"
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
        // headText={`Delete the Operator?`}
        // heading={selectedOperator?.ShortName || ""}
        // details={`Are you certain you want to delete?`}
        // type={"delete"}
        // buttonText={isUpdateStatus ? "Deleting..." : "Delete"}
        headText={`${status} the Operator?`}
        heading={selectedOperator?.ShortName || ""}
        details={`Are you certain you want to ${status}?`}
        type={selectedOperator?.isActive === 1 ? "delete" : ""}
        buttonText={isUpdateStatus ? "Updating..." : status}
        buttonProps={{
          onClick: handleUpdateStatus,
          disabled: isUpdateStatus,
        }}
      /> */}
      <PageLayout
        title="Product List"
        breadcrumbItem={breadcrumbItem}
        buttonText="Add Product"
        buttonProps={{
          onClick: () => navigate("/admin/products/add-product"),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        {/* <TableWrapper isActiveInactive isSort={false}> */}
        <CustomTable headList={tableHead}>
          {false ? (
            <NoTableData colSpan={7}>
              <Loader className="h-40" />
            </NoTableData>
          ) : data?.data &&
            typeof data?.data === "object" &&
            data?.data?.length > 0 ? (
            data?.data?.map((item: any, index: any) => (
              <tr className="table_tr" key={item?.ID}>
                <td className="table_td">{index + 1}</td>
                {/* <td className="table_td">{item?.DisplayID}</td> */}
                <td className="table_td uppercase">{item?.CompanyName}</td>
                <td className="table_td">{item?.CompanyEmail}</td>
                {/* <td className="table_td">{item?.PhoneNo}</td>
                  <td className="table_td">{item?.Address1}</td> */}
                <td className="table_td">
                  <div className="flex items-center gap-3">
                    <Link to={`/admin/operator/approved-list/${item?.ID}`}>
                      View
                    </Link>
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
                        item?.isActive === 1
                          ? "text-red-600 dark:text-red-500"
                          : "text-green-600 dark:text-green-500"
                      )}
                    >
                      {item?.isActive === 1 ? "Deactivate" : "Activate"}
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

export default ProductList;
