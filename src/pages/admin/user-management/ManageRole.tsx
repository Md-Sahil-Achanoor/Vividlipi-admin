import Loader from "@/components/atoms/Loader";
import MultiSelectItem from "@/components/atoms/MultiSelectItem";
import CustomInput from "@/components/form/CustomInput";
import InfiniteSelect from "@/components/form/InfiniteSelect";
import { Card } from "@/components/ui/Card";
import { permissionOptions } from "@/constants/role-constant";
import {
  useGetRolePermissionByIdQuery,
  useManageRolePermissionMutation,
} from "@/feature/user-management/userManagementQuery";
import PageLayout from "@/layout/PageLayout";
import {
  IOptions,
  IRolePermissionForm,
  rolePermissionFormSchema,
} from "@/models/user-management";
import { BreadCrumbItem } from "@/types";
import { convertPermissionIntoObject } from "@/utils/validateSchema";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const initialValues: IRolePermissionForm = {
  Title: "",
  Dashboard: [],
  Product_Management: [],
  User_Management: [],
  Promotions_and_Discounts: [],
  Return_and_Refund_Management: [],
  Product_Category_Management: [],
  Product_Sub_Category_Management: [],
  Permissions_and_Roles: [],
  Analytics_and_Reporting: [],
  Customer_Support: [],
  Shipping_Management: [],
  Content_Management: [],
  Dashboard_Customization: [],
  Multi_language_Support: [],
  Backup_and_Recovery: [],
  Notification_Management: [],
  Tax_Management: [],
  Order_Management: [],
};

const ManageRole = () => {
  const { id } = useParams();
  const router = useNavigate();
  // const [values] = useState<Role | null>(null);
  // const { selectedRole } = useAppSelector((state) => state.se);
  const breadcrumbItem: BreadCrumbItem[] = [
    {
      name: "Role List",
      link: "/admin/user-management/role-list",
    },
    {
      name: id ? "Edit Role" : "Create Role",
      link: "#",
    },
  ];

  const { isLoading: loading, refetch } = useGetRolePermissionByIdQuery(
    { query: { id } },
    { skip: !id }
  );

  const [manageRolePermission, { isLoading }] =
    useManageRolePermissionMutation();

  const onSubmit = async (
    values: IRolePermissionForm,
    { setSubmitting, resetForm }: FormikHelpers<IRolePermissionForm>
  ) => {
    // console.log(values);
    // const { Title, ...rest } = values;

    // let obj : Record<string, RoleBase> = {}
    // Object.keys(rest).forEach((key: any) => {
    //   if ((rest as any)[key]?.length > 0){
    //     (obj as any)[key] = convertPermissionIntoObject(
    //       (rest as any)[key] as IOptions[]
    //     );
    //   }
    // });

    const permissions = {
      Dashboard: convertPermissionIntoObject(values.Dashboard as IOptions[]),
      Product_Category_Management: convertPermissionIntoObject(
        values.Product_Category_Management as IOptions[]
      ),
      Analytics_and_Reporting: convertPermissionIntoObject(
        values.Analytics_and_Reporting as IOptions[]
      ),
      Customer_Support: convertPermissionIntoObject(
        values.Customer_Support as IOptions[]
      ),
      Shipping_Management: convertPermissionIntoObject(
        values.Shipping_Management as IOptions[]
      ),
      Content_Management: convertPermissionIntoObject(
        values.Content_Management as IOptions[]
      ),
      Dashboard_Customization: convertPermissionIntoObject(
        values.Dashboard_Customization as IOptions[]
      ),
      Multi_language_Support: convertPermissionIntoObject(
        values.Multi_language_Support as IOptions[]
      ),
      Backup_and_Recovery: convertPermissionIntoObject(
        values.Backup_and_Recovery as IOptions[]
      ),
      Notification_Management: convertPermissionIntoObject(
        values.Notification_Management as IOptions[]
      ),
      Product_Management: convertPermissionIntoObject(
        values.Product_Management as IOptions[]
      ),
      User_Management: convertPermissionIntoObject(
        values.User_Management as IOptions[]
      ),
      Promotions_and_Discounts: convertPermissionIntoObject(
        values.Promotions_and_Discounts as IOptions[]
      ),
      Return_and_Refund_Management: convertPermissionIntoObject(
        values.Return_and_Refund_Management as IOptions[]
      ),
      Permissions_and_Roles: convertPermissionIntoObject(
        values.Permissions_and_Roles as IOptions[]
      ),
      Product_Sub_Category_Management: convertPermissionIntoObject(
        values.Product_Sub_Category_Management as IOptions[]
      ),
    };

    await manageRolePermission({
      id,
      data: {
        Title: values.Title,
        Permissions: permissions,
      },
      options: {
        setSubmitting,
        resetForm,
        router,
      },
    });
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <PageLayout
      title={id ? "Edit Role" : "Create Role"}
      breadcrumbItem={breadcrumbItem}
    >
      <Card className="border rounded-md">
        {id && loading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={rolePermissionFormSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                {/* {console.log(values)} */}
                <div className="mt-5">
                  <div className="max-w-[50%]">
                    <Field
                      name="Title"
                      label={"Role Name"}
                      component={CustomInput}
                      placeholder="Type here..."
                      isRequired
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                      <Field
                        label={"Dashboard"}
                        name="Dashboard"
                        isRequired={false}
                        renderData={permissionOptions.Dashboard}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Dashboard?.find(
                            (Dashboard) => Dashboard?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Dashboard as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Dashboard",
                                values?.Dashboard?.filter(
                                  (Dashboard) =>
                                    Dashboard?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique = values?.Dashboard?.find(
                            (Dashboard) => Dashboard?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Dashboard", [
                              ...(values?.Dashboard as IOptions[]),
                              item,
                            ]);
                          } else {
                            return;
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data = values?.Dashboard?.filter(
                            (Dashboard) => Dashboard?.value !== item?.value
                          );
                          setFieldValue("Dashboard", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Product Management"}
                        name="Product_Management"
                        isRequired={false}
                        renderData={permissionOptions.Product_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_Management?.find(
                            (Product_Management) =>
                              Product_Management?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Product_Management as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Product_Management",
                                values?.Product_Management?.filter(
                                  (Product_Management) =>
                                    Product_Management?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique = values?.Product_Management?.find(
                            (Product_Management) =>
                              Product_Management?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Product_Management", [
                              ...(values?.Product_Management as IOptions[]),
                              item,
                            ]);
                          } else {
                            return;
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data = values?.Product_Management?.filter(
                            (Product_Management) =>
                              Product_Management?.value !== item?.value
                          );
                          setFieldValue("Product_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Category Management"}
                        name="Product_Category_Management"
                        isRequired={false}
                        renderData={
                          permissionOptions.Product_Category_Management
                        }
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_Category_Management?.find(
                            (Product_Category_Management) =>
                              Product_Category_Management?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Product_Category_Management as IOptions[]
                            }
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Product_Category_Management",
                                values?.Product_Category_Management?.filter(
                                  (Product_Category_Management) =>
                                    Product_Category_Management?.value !==
                                    item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique =
                            values?.Product_Category_Management?.find(
                              (Product_Category_Management) =>
                                Product_Category_Management?.value ===
                                item?.value
                            );
                          if (!isUnique) {
                            setFieldValue("Product_Category_Management", [
                              ...(values?.Product_Category_Management as IOptions[]),
                              item,
                            ]);
                          } else {
                            return;
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data =
                            values?.Product_Category_Management?.filter(
                              (Product_Category_Management) =>
                                Product_Category_Management?.value !==
                                item?.value
                            );
                          setFieldValue("Product_Category_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Sub Category Management"}
                        name="Product_Sub_Category_Management"
                        isRequired={false}
                        renderData={
                          permissionOptions.Product_Sub_Category_Management
                        }
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Product_Sub_Category_Management?.find(
                            (Product_Sub_Category_Management) =>
                              Product_Sub_Category_Management?.value ===
                              item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Product_Sub_Category_Management as IOptions[]
                            }
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Product_Sub_Category_Management",
                                values?.Product_Sub_Category_Management?.filter(
                                  (Product_Sub_Category_Management) =>
                                    Product_Sub_Category_Management?.value !==
                                    item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique =
                            values?.Product_Sub_Category_Management?.find(
                              (Product_Sub_Category_Management) =>
                                Product_Sub_Category_Management?.value ===
                                item?.value
                            );
                          if (!isUnique) {
                            setFieldValue("Product_Sub_Category_Management", [
                              ...(values?.Product_Sub_Category_Management as IOptions[]),
                              item,
                            ]);
                          } else {
                            return;
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data =
                            values?.Product_Sub_Category_Management?.filter(
                              (Product_Sub_Category_Management) =>
                                Product_Sub_Category_Management?.value !==
                                item?.value
                            );
                          setFieldValue(
                            "Product_Sub_Category_Management",
                            data
                          );
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"User Management"}
                        name="User_Management"
                        isRequired={false}
                        renderData={permissionOptions.User_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.User_Management?.find(
                            (User_Management) =>
                              User_Management?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.User_Management as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "User_Management",
                                values?.User_Management?.filter(
                                  (User_Management) =>
                                    User_Management?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique = values?.User_Management?.find(
                            (User_Management) =>
                              User_Management?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("User_Management", [
                              ...(values?.User_Management as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data = values?.User_Management?.filter(
                            (User_Management) =>
                              User_Management?.value !== item?.value
                          );
                          setFieldValue("User_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Promotions and Discounts"}
                        name="Promotions_and_Discounts"
                        isRequired={false}
                        renderData={permissionOptions.Promotions_and_Discounts}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Promotions_and_Discounts?.find(
                            (Promotions_and_Discounts) =>
                              Promotions_and_Discounts?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Promotions_and_Discounts as IOptions[]
                            }
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Promotions_and_Discounts",
                                values?.Promotions_and_Discounts?.filter(
                                  (Promotions_and_Discounts) =>
                                    Promotions_and_Discounts?.value !==
                                    item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique = values?.Promotions_and_Discounts?.find(
                            (Promotions_and_Discounts) =>
                              Promotions_and_Discounts?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Promotions_and_Discounts", [
                              ...(values?.Promotions_and_Discounts as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data = values?.Promotions_and_Discounts?.filter(
                            (Promotions_and_Discounts) =>
                              Promotions_and_Discounts?.value !== item?.value
                          );
                          setFieldValue("Promotions_and_Discounts", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Return and Refund Management"}
                        name="Return_and_Refund_Management"
                        isRequired={false}
                        renderData={
                          permissionOptions.Return_and_Refund_Management
                        }
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Return_and_Refund_Management?.find(
                            (Return_and_Refund_Management) =>
                              Return_and_Refund_Management?.value ===
                              item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={
                              values?.Return_and_Refund_Management as IOptions[]
                            }
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Return_and_Refund_Management",
                                values?.Return_and_Refund_Management?.filter(
                                  (Return_and_Refund_Management) =>
                                    Return_and_Refund_Management?.value !==
                                    item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique =
                            values?.Return_and_Refund_Management?.find(
                              (Return_and_Refund_Management) =>
                                Return_and_Refund_Management?.value ===
                                item?.value
                            );
                          if (!isUnique) {
                            setFieldValue("Return_and_Refund_Management", [
                              ...(values?.Return_and_Refund_Management as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data =
                            values?.Return_and_Refund_Management?.filter(
                              (Return_and_Refund_Management) =>
                                Return_and_Refund_Management?.value !==
                                item?.value
                            );
                          setFieldValue("Return_and_Refund_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Permissions and Roles"}
                        name="Permissions_and_Roles"
                        isRequired={false}
                        renderData={permissionOptions.Permissions_and_Roles}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Permissions_and_Roles?.find(
                            (Permissions_and_Roles) =>
                              Permissions_and_Roles?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Permissions_and_Roles as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Permissions_and_Roles",
                                values?.Permissions_and_Roles?.filter(
                                  (Permissions_and_Roles) =>
                                    Permissions_and_Roles?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique = values?.Permissions_and_Roles?.find(
                            (Permissions_and_Roles) =>
                              Permissions_and_Roles?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Permissions_and_Roles", [
                              ...(values?.Permissions_and_Roles as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data = values?.Permissions_and_Roles?.filter(
                            (Permissions_and_Roles) =>
                              Permissions_and_Roles?.value !== item?.value
                          );
                          setFieldValue("Permissions_and_Roles", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Analytics and Reporting"}
                        name="Analytics_and_Reporting"
                        isRequired={false}
                        renderData={permissionOptions.Analytics_and_Reporting}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Analytics_and_Reporting?.find(
                            (Analytics_and_Reporting) =>
                              Analytics_and_Reporting?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Analytics_and_Reporting as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Analytics_and_Reporting",
                                values?.Analytics_and_Reporting?.filter(
                                  (Analytics_and_Reporting) =>
                                    Analytics_and_Reporting?.value !==
                                    item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique = values?.Analytics_and_Reporting?.find(
                            (Analytics_and_Reporting) =>
                              Analytics_and_Reporting?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Analytics_and_Reporting", [
                              ...(values?.Analytics_and_Reporting as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data = values?.Analytics_and_Reporting?.filter(
                            (Analytics_and_Reporting) =>
                              Analytics_and_Reporting?.value !== item?.value
                          );
                          setFieldValue("Analytics_and_Reporting", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Customer Support"}
                        name="Customer_Support"
                        isRequired={false}
                        renderData={permissionOptions.Customer_Support}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Customer_Support?.find(
                            (Customer_Support) =>
                              Customer_Support?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Customer_Support as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Customer_Support",
                                values?.Customer_Support?.filter(
                                  (Customer_Support) =>
                                    Customer_Support?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          // check unique item in array
                          let isUnique = values?.Customer_Support?.find(
                            (Customer_Support) =>
                              Customer_Support?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Customer_Support", [
                              ...(values?.Customer_Support as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          // find data and clear
                          let data = values?.Customer_Support?.filter(
                            (Customer_Support) =>
                              Customer_Support?.value !== item?.value
                          );
                          setFieldValue("Customer_Support", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Shipping Management"}
                        name="Shipping_Management"
                        isRequired={false}
                        renderData={permissionOptions.Shipping_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Shipping_Management?.find(
                            (Shipping_Management) =>
                              Shipping_Management?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Shipping_Management as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Shipping_Management",
                                values?.Shipping_Management?.filter(
                                  (Shipping_Management) =>
                                    Shipping_Management?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          let isUnique = values?.Shipping_Management?.find(
                            (Shipping_Management) =>
                              Shipping_Management?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Shipping_Management", [
                              ...(values?.Shipping_Management as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          let data = values?.Shipping_Management?.filter(
                            (Shipping_Management) =>
                              Shipping_Management?.value !== item?.value
                          );
                          setFieldValue("Shipping_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Content Management"}
                        name="Content_Management"
                        isRequired={false}
                        renderData={permissionOptions.Content_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Content_Management?.find(
                            (Content_Management) =>
                              Content_Management?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Content_Management as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Shipping_Management",
                                values?.Shipping_Management?.filter(
                                  (Shipping_Management) =>
                                    Shipping_Management?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          let isUnique = values?.Content_Management?.find(
                            (Content_Management) =>
                              Content_Management?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Content_Management", [
                              ...(values?.Content_Management as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          let data = values?.Content_Management?.filter(
                            (Content_Management) =>
                              Content_Management?.value !== item?.value
                          );
                          setFieldValue("Content_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Dashboard Customization"}
                        name="Dashboard_Customization"
                        isRequired={false}
                        renderData={permissionOptions.Dashboard_Customization}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Dashboard_Customization?.find(
                            (Dashboard_Customization) =>
                              Dashboard_Customization?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Dashboard_Customization as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Dashboard_Customization",
                                values?.Dashboard_Customization?.filter(
                                  (Dashboard_Customization) =>
                                    Dashboard_Customization?.value !==
                                    item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          let isUnique = values?.Dashboard_Customization?.find(
                            (Dashboard_Customization) =>
                              Dashboard_Customization?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Dashboard_Customization", [
                              ...(values?.Dashboard_Customization as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          let data = values?.Dashboard_Customization?.filter(
                            (Dashboard_Customization) =>
                              Dashboard_Customization?.value !== item?.value
                          );
                          setFieldValue("Dashboard_Customization", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Multi Language Support"}
                        name="Multi_language_Support"
                        isRequired={false}
                        renderData={permissionOptions.Multi_language_Support}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Multi_language_Support?.find(
                            (Multi_language_Support) =>
                              Multi_language_Support?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Multi_language_Support as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Multi_language_Support",
                                values?.Multi_language_Support?.filter(
                                  (Multi_language_Support) =>
                                    Multi_language_Support?.value !==
                                    item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          let isUnique = values?.Multi_language_Support?.find(
                            (Multi_language_Support) =>
                              Multi_language_Support?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Multi_language_Support", [
                              ...(values?.Multi_language_Support as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          let data = values?.Multi_language_Support?.filter(
                            (Multi_language_Support) =>
                              Multi_language_Support?.value !== item?.value
                          );
                          setFieldValue("Multi_language_Support", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Backup and Recovery"}
                        name="Backup_and_Recovery"
                        isRequired={false}
                        renderData={permissionOptions.Backup_and_Recovery}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Backup_and_Recovery?.find(
                            (Backup_and_Recovery) =>
                              Backup_and_Recovery?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Backup_and_Recovery as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Backup_and_Recovery",
                                values?.Backup_and_Recovery?.filter(
                                  (Backup_and_Recovery) =>
                                    Backup_and_Recovery?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          let isUnique = values?.Backup_and_Recovery?.find(
                            (Backup_and_Recovery) =>
                              Backup_and_Recovery?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Backup_and_Recovery", [
                              ...(values?.Backup_and_Recovery as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          let data = values?.Backup_and_Recovery?.filter(
                            (Backup_and_Recovery) =>
                              Backup_and_Recovery?.value !== item?.value
                          );
                          setFieldValue("Backup_and_Recovery", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Notification Management"}
                        name="Notification_Management"
                        isRequired={false}
                        renderData={permissionOptions.Notification_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Notification_Management?.find(
                            (Notification_Management) =>
                              Notification_Management?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Notification_Management as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Notification_Management",
                                values?.Notification_Management?.filter(
                                  (Notification_Management) =>
                                    Notification_Management?.value !==
                                    item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          let isUnique = values?.Notification_Management?.find(
                            (Notification_Management) =>
                              Notification_Management?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Notification_Management", [
                              ...(values?.Notification_Management as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          let data = values?.Notification_Management?.filter(
                            (Notification_Management) =>
                              Notification_Management?.value !== item?.value
                          );
                          setFieldValue("Notification_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Tax Management"}
                        name="Tax_Management"
                        isRequired={false}
                        renderData={permissionOptions.Tax_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Tax_Management?.find(
                            (Tax_Management) =>
                              Tax_Management?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Tax_Management as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Tax_Management",
                                values?.Tax_Management?.filter(
                                  (Tax_Management) =>
                                    Tax_Management?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          let isUnique = values?.Tax_Management?.find(
                            (Tax_Management) =>
                              Tax_Management?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Tax_Management", [
                              ...(values?.Tax_Management as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          let data = values?.Tax_Management?.filter(
                            (Tax_Management) =>
                              Tax_Management?.value !== item?.value
                          );
                          setFieldValue("Tax_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                    <div className="col-span-1">
                      <Field
                        label={"Order Management"}
                        name="Order_Management"
                        isRequired={false}
                        renderData={permissionOptions.Order_Management}
                        renderItem={(item: IOptions) => <>{item?.label}</>}
                        isActive={(item: IOptions) =>
                          values?.Order_Management?.find(
                            (Order_Management) =>
                              Order_Management?.value === item?.value
                          )
                        }
                        renderName={() => (
                          <MultiSelectItem<IOptions>
                            data={values?.Order_Management as IOptions[]}
                            defaultName="Select..."
                            displayName="label"
                            onClick={(item) => {
                              setFieldValue(
                                "Order_Management",
                                values?.Order_Management?.filter(
                                  (Order_Management) =>
                                    Order_Management?.value !== item?.value
                                )
                              );
                            }}
                          />
                        )}
                        onChangeCallback={(item: IOptions) => {
                          let isUnique = values?.Order_Management?.find(
                            (Order_Management) =>
                              Order_Management?.value === item?.value
                          );
                          if (!isUnique) {
                            setFieldValue("Order_Management", [
                              ...(values?.Order_Management as IOptions[]),
                              item,
                            ]);
                          }
                        }}
                        clearData={(item: IOptions) => {
                          let data = values?.Order_Management?.filter(
                            (Order_Management) =>
                              Order_Management?.value !== item?.value
                          );
                          setFieldValue("Order_Management", data);
                        }}
                        isSelected={false}
                        component={InfiniteSelect}
                        isAuth
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="button_primary"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2"></span>
                        <span className="font-medium">Processing</span>
                      </>
                    ) : (
                      <>
                        <span className="font-medium">
                          {id ? "Update" : "Create"}
                        </span>
                        <span className="text-2xl ml-1">
                          <BsArrowRightShort />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Card>
    </PageLayout>
  );
};

export default ManageRole;
