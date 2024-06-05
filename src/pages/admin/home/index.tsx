import { useAppDispatch, useAppSelector } from "@/app/store";
import ManageModule from "@/components/elements/modal/ManageModule";
import FeatureProducts from "@/components/module/home/feature-product/FeatureProducts";
import ManageFeatureProduct from "@/components/module/home/feature-product/ManageFeatureProduct";
import FeatureSlider from "@/components/module/home/feature-slider/FeatureSlider";
import { default as ManageFeatureSlider } from "@/components/module/home/feature-slider/ManageFeatureSlider";
import FeatureSubSlider from "@/components/module/home/feature-sub-slider/FeatureSubSlider";
import ManageFeatureSubSlider from "@/components/module/home/feature-sub-slider/ManageFeatureSubSlider";
import { Card } from "@/components/ui/Card";
import TabButtons from "@/components/ui/TabButtons";
import { tabItems } from "@/constants/tableHeader";
import { coreAction } from "@/feature/core/coreSlice";
import {
  useDeleteFeatureProductMutation,
  useDeleteFeatureSlideMutation,
  useDeleteFeatureSubSlideMutation,
} from "@/feature/home/homeQuery";
import PageLayout from "@/layout/PageLayout";
import { checkType, getModuleName, getTitle } from "@/utils/modules/home";
import { useState } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>("feature-slider");

  const { type } = useAppSelector((state) => state.core);
  const { selectedFeatureSlider } = useAppSelector((state) => state.home);

  const [deleteFeatureSlider, { isLoading: isDeleteCategory }] =
    useDeleteFeatureSlideMutation();
  const [deleteFeatureSubSlider, { isLoading: isDeleteSubCategory }] =
    useDeleteFeatureSubSlideMutation();
  const [deleteFeatureProduct, { isLoading: isDeleteProduct }] =
    useDeleteFeatureProductMutation();

  const renderItems = () => {
    switch (activeTab) {
      case "feature-product":
        return <FeatureProducts />;
      case "feature-sub-slider":
        return <FeatureSubSlider />;
      default:
        return <FeatureSlider />;
    }
  };

  const handleModal = (type: string) => {
    if (type === "cancelled") {
      dispatch(coreAction.toggleModal({ type: "", open: false }));
    }
  };

  const handleUpdateStatus = async () => {
    if (type === "delete-feature-slider") {
      await deleteFeatureSlider({
        id: selectedFeatureSlider?.id,
        query: {},
      });
    } else if (type === "delete-feature-sub-slider") {
      await deleteFeatureSubSlider({
        id: selectedFeatureSlider?.id,
        query: {},
      });
    } else {
      await deleteFeatureProduct({
        id: selectedFeatureSlider?.id,
        query: {},
      });
    }
  };

  return (
    <PageLayout title="Home Page CMS">
      <ManageFeatureSlider />
      <ManageFeatureSubSlider />
      <ManageFeatureProduct />
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
        headText={`Delete the ${getModuleName(type)}?`}
        heading={getTitle(type, selectedFeatureSlider)}
        details={`Are you certain you want to delete?`}
        type={"delete"}
        buttonText={isDeleteCategory ? "Deleting..." : "Delete"}
        buttonProps={{
          onClick: handleUpdateStatus,
          disabled: isDeleteCategory || isDeleteSubCategory || isDeleteProduct,
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
