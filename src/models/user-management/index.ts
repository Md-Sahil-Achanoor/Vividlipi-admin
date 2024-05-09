import * as Yup from "yup";

export const optionsSchema = Yup.object({
  label: Yup.string(),
  value: Yup.string(),
});

export type IOptions = Yup.InferType<typeof optionsSchema>;

export const rolePermissionFormSchema = Yup.object({
  role_name: Yup.string()
    .required("Role name can't be empty")
    .trim("Role name can't be empty")
    .matches(/^\s*$/, "Role name can't be empty"),
  Dashboard: Yup.array(optionsSchema),
  featured_category_management: Yup.array(optionsSchema),
  domain_management: Yup.array(optionsSchema),
  referral_and_gifts: Yup.array(optionsSchema),
  admin_user_management: Yup.array(optionsSchema),
  roles_management: Yup.array(optionsSchema),
  course_management: Yup.array(optionsSchema),
  application_user_management: Yup.array(optionsSchema),
  insight_management: Yup.array(optionsSchema),
  banners_management: Yup.array(optionsSchema),
  subscription_management: Yup.array(optionsSchema),
  payment_management: Yup.array(optionsSchema),
  static_content_management: Yup.array(optionsSchema),
}).test({
  test: function (value) {
    // Array of keys to check
    const keysToCheck = [
      "Dashboard",
      "featured_category_management",
      "domain_management",
      "referral_and_gifts",
      "admin_user_management",
      "roles_management",
      "course_management",
      "application_user_management",
      "insight_management",
      "banners_management",
      "subscription_management",
      "payment_management",
      "static_content_management",
    ];

    // Check if at least one key has a length greater than zero
    return keysToCheck.some(
      (key: string) =>
        Array.isArray((value as any)[key]) && (value as any)[key].length > 0
    );
  },
  message: "At least one key must have a length greater than zero",
});

export type IRolePermissionForm = Yup.InferType<
  typeof rolePermissionFormSchema
>;
