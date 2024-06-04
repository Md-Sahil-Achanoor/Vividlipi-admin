import { useAppDispatch, useAppSelector } from "@/app/store";
import ManageModule from "@/components/elements/modal/ManageModule";
import FeatureSlider from "@/components/module/home/FeatureSlider";
import ManageFeatureSlider from "@/components/module/home/ManageFeatureSlider";
import { Card } from "@/components/ui/Card";
import TabButtons from "@/components/ui/TabButtons";
import { coreAction } from "@/feature/core/coreSlice";
import {
  useDeleteFeatureSlideMutation,
  useGetHomeFeatureSliderQuery,
} from "@/feature/home/homeQuery";
import PageLayout from "@/layout/PageLayout";
import { TabItem } from "@/types";
import { useState } from "react";

const tabItems: TabItem[] = [
  {
    name: "Feature Slider",
    type: "feature-slider",
  },
  {
    name: "Feature Products",
    type: "feature-product",
  },
];

const checkType = (type: string) => {
  switch (type) {
    case "manage-feature-slider":
      return true;
    case "delete-feature-slider":
      return true;
    case "manage-feature-product":
      return true;
    default:
      return false;
  }
};

const getTitle = (type: string, data: any) => {
  switch (type) {
    case "manage-feature-slider":
      return data?.text;
    case "delete-feature-slider":
      return data?.text;
    default:
      return "";
  }
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<string>("feature-slider");
  const { data, isLoading } = useGetHomeFeatureSliderQuery({});
  const { type } = useAppSelector((state) => state.core);

  const [deleteFeatureSlider, { isLoading: isDeleteCategory }] =
    useDeleteFeatureSlideMutation();
  const dispatch = useAppDispatch();

  const renderItems = () => {
    switch (activeTab) {
      case "feature-product":
        return <FeatureSlider data={data?.data || []} isLoading={isLoading} />;
      default:
        return <FeatureSlider data={data?.data || []} isLoading={isLoading} />;
    }
  };

  const handleModal = (type: string) => {
    if (type === "cancelled") {
      dispatch(coreAction.toggleModal({ type: "", open: false }));
    }
  };

  const handleUpdateStatus = async () => {
    // await deleteFeatureSlider({
    //   id: selectedCategory?.id,
    //   query: {},
    // });
  };

  return (
    <PageLayout title="Home Page CMS">
      <ManageFeatureSlider />
      <ManageModule
        classes={
          checkType(type)
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
        headText={`Delete the Sub Category?`}
        heading={getTitle(type, {})}
        details={`Are you certain you want to delete?`}
        type={"delete"}
        buttonText={isDeleteCategory ? "Deleting..." : "Delete"}
        buttonProps={{
          onClick: handleUpdateStatus,
          disabled: isDeleteCategory,
        }}
      />
      <Card>
        <div className="mb-3 pb-5">
          <div className="flex justify-center relative mt-2">
            <TabButtons
              data={tabItems}
              containerClass={"box-border justify-safe-center"}
              itemClasses="p-3 px-4 whitespace-nowrap"
              onChangeCallback={(data) => setActiveTab(data?.type)}
              isActive={(data) => data?.type === activeTab}
              renderData={(data) => <>{data?.name}</>}
            />
          </div>
          {renderItems()}
        </div>
      </Card>
    </PageLayout>
  );
};

export default HomePage;
