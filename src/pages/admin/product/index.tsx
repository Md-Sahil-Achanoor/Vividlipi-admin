import { useAppDispatch, useAppSelector } from "@/app/store";
import NoTableData from "@/components/atoms/NoTableData";
import ManageModule from "@/components/elements/modal/ManageModule";
import SkeletonTable from "@/components/elements/skeleton/SkeletonTable";
import BulkUpload from "@/components/module/bulk/BulkUpload";
import Table from "@/components/ui/Table";
import { coreAction } from "@/feature/core/coreSlice";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/feature/product/productQuery";
import { productAction } from "@/feature/product/productSlice";
import PageLayout from "@/layout/PageLayout";
import { BreadCrumbItem } from "@/types";
import { useEffect } from "react";
import { BiUpload } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const breadcrumbItem: BreadCrumbItem[] = [
  {
    name: "Product List",
    link: "#",
  },
];

const LIMIT = 10;
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
  const { reRenderBulk } = useAppSelector((state) => state.common);
  const { selectedProduct } = useAppSelector((state) => state.product);
  const { type } = useAppSelector((state) => state.core);

  const [deleteProduct, { isLoading: isDeleteProduct }] =
    useDeleteProductMutation();

  const dispatch = useAppDispatch();
  const { data, isLoading, refetch } = useGetProductsQuery({
    query: {
      page: 1,
    },
  });

  // console.log(`\n\n ~ ProductList ~ data:`, data?.data?.data);
  useEffect(() => {
    refetch();
  }, [reRenderBulk]);

  const handleModal = (type: string) => {
    // console.log(`\n\n handleModal ~ type:`, type);
    if (type === "cancelled") {
      dispatch(coreAction.toggleModal({ type: "", open: false }));
      dispatch(productAction.setSelectedProduct(null));
    }
  };

  const handleDeleteProduct = async () => {
    await deleteProduct({
      id: selectedProduct?.id,
      query: {
        page,
      },
    });
  };

  const handleOpenModal = () => {
    dispatch(
      coreAction.toggleModal({
        type: "bulk-upload",
        open: true,
      })
    );
  };
  // const totalPage = data?.data?.last_page || 1;
  const productList = data?.data?.data || [];

  return (
    <>
      <BulkUpload uploadType="product" />
      <ManageModule
        classes={
          type === "delete-product"
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
        headText={`Delete the Product?`}
        heading={selectedProduct?.book_title || ""}
        details={`Are you certain you want to delete?`}
        type={"delete"}
        buttonText={isDeleteProduct ? "Deleting..." : "Delete"}
        // headText={`${status} the Product?`}
        // heading={selectedProduct?.ShortName || ""}
        // details={`Are you certain you want to ${status}?`}
        // type={selectedProduct?.isActive === 1 ? "delete" : ""}
        // buttonText={isDeleteProduct ? "Updating..." : status}
        buttonProps={{
          onClick: handleDeleteProduct,
          disabled: isDeleteProduct,
        }}
      />
      <PageLayout
        title="Product List"
        breadcrumbItem={breadcrumbItem}
        buttonText="Add Product"
        renderElements={() => (
          <>
            <button className="button_sm_primary" onClick={handleOpenModal}>
              <BiUpload className="mr-1" />
              <span className="mr-1">Bulk Upload</span>
            </button>
          </>
        )}
        buttonProps={{
          onClick: () => navigate("/admin/products/product-list/add-product"),
        }}
      >
        {/* <Card className="p-3 border-0 shadow-md"> */}
        {/* <TableWrapper isActiveInactive isSort={false}> */}
        <Table headList={tableHead}>
          {isLoading ? (
            <SkeletonTable total={6} tableCount={9} />
          ) : productList && productList?.length > 0 ? (
            productList?.map((item, index) => (
              <tr
                key={item?.id}
                className={`table_tr border-0 ${
                  productList?.length - 1 !== index
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
                <td className="table_td">{item?.publisher?.Name || "N/A"}</td>
                <td className="table_td">{item?.release_date}</td>
                <td className="table_td">{item?.sale_price}</td>
                <td className="table_td">{item?.sale_quantity}</td>
                <td className="table_td">
                  <div className="flex items-center gap-3">
                    <Link
                      className="text-blue-600 hover:underline cursor-pointer"
                      to={`/admin/products/product-list/edit-product/${item?.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(
                          coreAction.toggleModal({
                            type: "delete-product",
                            open: true,
                          })
                        );
                        dispatch(productAction.setSelectedProduct(item));
                      }}
                      className="cursor-pointer text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <NoTableData colSpan={9} parentClass="h-40">
              <span className="font-medium">No data found!</span>
            </NoTableData>
          )}
        </Table>
        {/* </TableWrapper> */}
        {/* </Card> */}
      </PageLayout>
    </>
  );
};

export default ProductList;
