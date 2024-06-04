import { useAppDispatch } from "@/app/store";
import NoTableData from "@/components/atoms/NoTableData";
import SkeletonTable from "@/components/elements/skeleton/SkeletonTable";
import Table from "@/components/ui/Table";
import { featureSliderHeader } from "@/constants/tableHeader";
import { coreAction } from "@/feature/core/coreSlice";
import { homeAction } from "@/feature/home/homeSlice";
import { FeatureSliderResponse } from "@/types";
import { cn } from "@/utils/twmerge";
import ModuleHeader from "../ModuleHeader";

type FeatureSliderProps = {
  data: FeatureSliderResponse[];
  isLoading: boolean;
};

const FeatureSlider = ({ data, isLoading }: FeatureSliderProps) => {
  const dispatch = useAppDispatch();
  const handleModal = (type: string, item?: any) => {
    if (type === "cancelled") {
      dispatch(coreAction.toggleModal({ type: "", open: false }));
    } else if (item) {
      dispatch(
        coreAction.toggleModal({
          type: type,
          open: true,
        })
      );
      dispatch(homeAction.setSelectedFeatureSlider(item));
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
        handleModal={() => handleModal("manage-feature-slider")}
      />
      <Table headList={featureSliderHeader}>
        {isLoading ? (
          <SkeletonTable total={6} tableCount={5} />
        ) : data && data?.length > 0 ? (
          data?.map((item, index) => (
            <tr className="table_tr" key={item?.id}>
              <td className="table_td">{index + 1}</td>
              <td className="table_td">{item?.text}</td>
              <td className="table_td">
                <img
                  src={item?.imageurl}
                  alt={item?.text}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="table_td">
                <div className="flex items-center gap-2">
                  <span>X: {item?.contentpostionX}</span>
                  <span>Y: {item?.contentpostionY}</span>
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
