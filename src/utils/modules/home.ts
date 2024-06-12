const checkType = (type: string) => {
  switch (type) {
    case "delete-feature-slider":
      return true;
    case "delete-feature-sub-slider":
      return true;
    case "delete-feature-product":
      return true;
    case "delete-new-in":
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
    case "delete-feature-product":
      return data?.productDetails?.book_title;
    case "delete-new-in":
      return data?.productDetails?.book_title;
    default:
      return "";
  }
};

const getModuleName = (type: string) => {
  switch (type) {
    case "delete-feature-slider":
      return "Feature Slider";
    case "delete-feature-sub-slider":
      return "Feature Sub Slider";
    case "delete-feature-product":
      return "Feature Product";
    case "delete-new-in":
      return "New In";
    default:
      return "";
  }
};

export { checkType, getModuleName, getTitle };
