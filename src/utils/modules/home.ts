const checkType = (type: string) => {
  switch (type) {
    case "delete-feature-slider":
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

const getModuleName = (type: string) => {
  switch (type) {
    case "delete-feature-slider":
      return "Feature Slider";
    default:
      return "";
  }
};

export { checkType, getModuleName, getTitle };
