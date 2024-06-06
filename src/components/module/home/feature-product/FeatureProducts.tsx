import { useAppDispatch } from "@/app/store";
import NoTableData from "@/components/atoms/NoTableData";
import SkeletonTable from "@/components/elements/skeleton/SkeletonTable";
import Table from "@/components/ui/Table";
import { featureProductHeader } from "@/constants/tableHeader";
import { coreAction } from "@/feature/core/coreSlice";
import { useGetHomeFeatureProductsQuery } from "@/feature/home/homeQuery";
import { homeAction } from "@/feature/home/homeSlice";
import { cn } from "@/utils/twmerge";
import { BiRupee } from "react-icons/bi";
import ModuleHeader from "../ModuleHeader";

// type FeatureProductsProps = {
//   data: FeatureProductResponse[];
//   isLoading: boolean;
// };

const FeatureProducts = () => {
  const { data, isLoading } = useGetHomeFeatureProductsQuery({});
  const dispatch = useAppDispatch();
  const handleModal = (type: string, item?: any) => {
    if (type === "cancelled") {
      dispatch(homeAction.resetHome());
      dispatch(coreAction.toggleModal({ type: "", open: false }));
    } else if (item) {
      dispatch(
        coreAction.toggleModal({
          type: type,
          open: true,
        })
      );
      dispatch(
        homeAction.setSelectedFeatureProduct({
          id: item?.id,
          main: item?.main,
          productId: item?.productDetails,
        })
      );
    } else {
      dispatch(
        coreAction.toggleModal({
          type: type,
          open: true,
        })
      );
    }
  };

  return (
    <div>
      <ModuleHeader
        title="Feature Products"
        handleModal={() => handleModal("manage-feature-product")}
      />
      <Table headList={featureProductHeader}>
        {isLoading ? (
          <SkeletonTable total={6} tableCount={6} />
        ) : data?.data && data?.data?.length > 0 ? (
          data?.data?.map((item, index) => (
            <tr className="table_tr" key={item?.id}>
              <td className="table_td">{index + 1}</td>
              <td className="table_td">{item?.productDetails?.book_title}</td>
              <td className="table_td">{item?.productDetails?.author_name}</td>
              <td className="table_td">
                <div className="flex items-center gap-1">
                  <BiRupee />
                  <span>{item?.productDetails?.price}</span>
                </div>
              </td>
              <td className="table_td">{item?.main == 1 ? "Yes" : "No"}</td>
              <td className="table_td">
                <div className="flex items-center gap-3">
                  {/* <button
                    onClick={() => handleModal("manage-feature-product", item)}
                    className={cn(
                      "font-medium hover:underline",
                      "text-blue-600 dark:text-blue-500"
                    )}
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleModal("delete-feature-product", item)}
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
            <span className="font-medium">No data found!</span>
          </NoTableData>
        )}
      </Table>
    </div>
  );
};

export default FeatureProducts;
