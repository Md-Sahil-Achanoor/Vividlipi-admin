import { useAppDispatch } from "@/app/store";
import PlaceholderImage from "@/assets/svg/placeholder";
import NoTableData from "@/components/atoms/NoTableData";
import SkeletonTable from "@/components/elements/skeleton/SkeletonTable";
import Table from "@/components/ui/Table";
import { featureSubSliderHeader } from "@/constants/tableHeader";
import { coreAction } from "@/feature/core/coreSlice";
import { useGetHomeFeatureSubSliderQuery } from "@/feature/home/homeQuery";
import { homeAction } from "@/feature/home/homeSlice";
import { FeatureSubSliderResponse } from "@/types";
import { cn } from "@/utils/twmerge";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ModuleHeader from "../ModuleHeader";

const FeatureNewIn = () => {
  const { data, isLoading } = useGetHomeFeatureSubSliderQuery({});
  const dispatch = useAppDispatch();
  const handleModal = (type: string, item?: FeatureSubSliderResponse) => {
    if (type === "cancelled") {
      dispatch(coreAction.toggleModal({ type: "", open: false }));
      dispatch(homeAction.resetHome());
    } else if (item) {
      dispatch(
        coreAction.toggleModal({
          type: type,
          open: true,
        })
      );
      dispatch(homeAction.setSelectedFeatureSubSlider({ ...item }));
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
        title="New In"
        handleModal={() => handleModal("manage-feature-sub-slider")}
      />
      <Table headList={featureSubSliderHeader}>
        {isLoading ? (
          <SkeletonTable total={6} tableCount={3} />
        ) : data?.data && data?.data?.length > 0 ? (
          data?.data?.map((item, index) => (
            <tr className="table_tr" key={item?.id}>
              <td className="table_td">{index + 1}</td>
              <td className="table_td">
                <LazyLoadImage
                  src={item?.image as string}
                  alt={item?.image}
                  placeholder={<PlaceholderImage />}
                  effect="blur"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
                {/* <img
                  src={item?.image as string}
                  alt={item?.image as string}
                  className="w-10 h-10 object-cover rounded-full"
                /> */}
              </td>
              <td className="table_td">
                <div className="flex items-center gap-3">
                  {/* <button
                    onClick={() =>
                      handleModal("manage-feature-sub-slider", item)
                    }
                    className={cn(
                      "font-medium hover:underline",
                      "text-blue-600 dark:text-blue-500"
                    )}
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() =>
                      handleModal("delete-feature-sub-slider", item)
                    }
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

export default FeatureNewIn;
