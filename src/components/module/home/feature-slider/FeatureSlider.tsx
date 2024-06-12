import { useAppDispatch } from "@/app/store";
import NoTableData from "@/components/atoms/NoTableData";
import SkeletonTable from "@/components/elements/skeleton/SkeletonTable";
import Table from "@/components/ui/Table";
import { featureSliderHeader } from "@/constants/tableHeader";
import { coreAction } from "@/feature/core/coreSlice";
import { useGetHomeFeatureSliderQuery } from "@/feature/home/homeQuery";
import { homeAction } from "@/feature/home/homeSlice";
import { FeatureSliderResponse } from "@/types";
import { cn } from "@/utils/twmerge";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import PlaceholderImage from "../../../../assets/Images/image.png";
import PlaceholderImage from "@/assets/svg/placeholder";
import ModuleHeader from "../ModuleHeader";

const FeatureSlider = () => {
  const { data, isLoading } = useGetHomeFeatureSliderQuery({});
  // console.log(`\n\n ~ FeatureSlider ~ data:`, data);
  const dispatch = useAppDispatch();
  const handleModal = (type: string, item?: FeatureSliderResponse) => {
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
      const { home_text, contentpostion_X, ...rest } = item;
      dispatch(
        homeAction.setSelectedFeatureSlider({
          ...rest,
          text: item?.home_text as string,
          contentpostionX: item?.contentpostion_X as number,
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
        title="Feature Slider"
        isButton={false}
        handleModal={() => handleModal("manage-feature-slider")}
      />
      <Table headList={featureSliderHeader}>
        {isLoading ? (
          <SkeletonTable total={6} tableCount={5} />
        ) : data?.data && data?.data?.length > 0 ? (
          data?.data?.map((item, index) => (
            <tr className="table_tr" key={item?.id}>
              <td className="table_td">{index + 1}</td>
              <td className="table_td">{item?.home_text}</td>
              <td className="table_td">
                <LazyLoadImage
                  src={item?.file as string}
                  alt={item?.home_text}
                  placeholder={<PlaceholderImage />}
                  effect="blur"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="table_td">
                <div className="flex items-center gap-1">
                  <span>X: {item?.contentpostion_X},</span>
                  <span>Y: {item?.contentpositionY}</span>
                </div>
              </td>
              <td className="table_td">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleModal("manage-feature-slider", item)}
                    className={cn(
                      "font-medium hover:underline",
                      "text-blue-600 dark:text-blue-500"
                    )}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleModal("delete-feature-slider", item)}
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

export default FeatureSlider;
