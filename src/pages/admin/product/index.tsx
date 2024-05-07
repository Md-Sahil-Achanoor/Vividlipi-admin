import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useAppSelector } from "../../../app/store";
import NoTableData from "../../../components/atoms/NoTableData";
import CustomTable from "../../../components/elements/common/custom-table/CustomTable";
import SkeletonTable from "../../../components/elements/skeleton/SkeletonTable";
import { useGetProductsQuery } from "../../../feature/product/productQuery";
import PageLayout from "../../../layout/PageLayout";
import { BreadCrumbItem } from "../../../types";

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: "Product List",
    link: "#",
  },
];

const LIMIT = 10;
// release_date: "",
// digital_product_url: "",
// sale_price: "",
// sale_quantity: "",
const tableHead = [
  "SL",
  "Name",
  "Author",
  "Price",
  "Publisher",
  "Release Date",
  "Sale Price",
  "Sale Quantity",
  "Action",
];

const ProductList = () => {
  const navigate = useNavigate();
  const { page } = useAppSelector((state) => state.core);
  // const { selectedProduct, reRender } = useAppSelector(
  //   (state) => state.operator
  // );
  // const { type, selectedStatus } = useAppSelector((state) => state.core);

  // const [updateProductStatus, { isLoading: isUpdateStatus }] =
  //   useUpdateProductStatusMutation();

  // const dispatch = useAppDispatch();
  const { data, isLoading, refetch } = useGetProductsQuery({
    query: {
      page: 1,
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  // const handleModal = (type: string) => {
  //   // console.log(`\n\n handleModal ~ type:`, type);
  //   if (type === "cancelled") {
  //     dispatch(coreAction.toggleModal({ type: "", open: false }));
  //     dispatch(operatorAction.setSelectedProduct(null));
  //   }
  // };

  // const handleUpdateStatus = async () => {
  //   await updateProductStatus({
  //     id: selectedProduct?.ID,
  //     query: {
  //       isActive: selectedProduct?.isActive === 1 ? "0" : "1",
  //     },
  //   });
  // };

  // const status = selectedProduct?.isActive === 1 ? "Deactivate" : "Activate";

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
        // headText={`Delete the Product?`}
        // heading={selectedProduct?.ShortName || ""}
        // details={`Are you certain you want to delete?`}
        // type={"delete"}
        // buttonText={isUpdateStatus ? "Deleting..." : "Delete"}
        headText={`${status} the Product?`}
        heading={selectedProduct?.ShortName || ""}
        details={`Are you certain you want to ${status}?`}
        type={selectedProduct?.isActive === 1 ? "delete" : ""}
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
          onClick: () => navigate("/admin/products/product-list/add-product"),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        {/* <TableWrapper isActiveInactive isSort={false}> */}
        <CustomTable headList={tableHead}>
          {isLoading ? (
            <SkeletonTable total={6} tableCount={6} />
          ) : data?.data && data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <tr
                key={item?.id}
                className={`table_tr border-0 ${
                  data?.data?.length - 1 !== index
                    ? "border-table-background-gray border-b"
                    : ""
                }`}
              >
                <th scope="row" className="table_td">
                  {index + 1 + (page - 1) * LIMIT}
                </th>
                <td className="table_td">{item?.book_title}</td>
                <td className="table_td">{item?.author_name}</td>
                <td className="table_td">{item?.price}</td>
                <td className="table_td">{item?.publisher}</td>
                <td className="table_td">{item?.release_date}</td>
                <td className="table_td">{item?.sale_price}</td>
                <td className="table_td">{item?.sale_quantity}</td>
                <td className="table_td">
                  <div className="flex items-center gap-3">
                    <Link to={`/admin/products/product-list/${item?.id}`}>
                      View
                    </Link>
                    <div
                      onClick={() => {
                        // dispatch(
                        //   coreAction.toggleModal({
                        //     type: "status-operator",
                        //     open: true,
                        //   })
                        // );
                      }}
                      className="cursor-pointer"
                    >
                      Delete
                    </div>
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
