export const endpoints = {
  // Global
  imageUpload: "/UploadProfilePic",
  profile: "/Profile",
  update_profile: "/ProfileUpdate",
  updatePassword: "/ChangePassword",
  globalSearch: "/GlobalSearch",

  // auth
  login: "/Auth",

  // admin
  operator_register: "/Operator_register",
  operator_list: `/ListOperator`,
  approved_operator: `/Approve-UnApprove-Operator`,
  delete_operator: `/DeleteOperator`,
  dashboard: "/OperatorDashboard",
  salesman: "/Salesman",
  approveVendor: "/Approve-UnApprove-Vendor",
  approveAds: "/Approve-UnApprove-ads",
  admin_dashboard: "/AdminDashboard",
  brand: "/Brand",
  pos: "/POS",
  posBulk: "/ImportPOS",

  // employee
  employee_create: "/CreateEmployee",
  employee_update: "/UpdateEmployee",
  employee_list: `/ListEmployee`,
  delete_employee: `/DeleteEmployee`,
  employeeBulk: `/ImportEmployees`,

  // operator
  // stage
  stage: "/Stage",
  stageBulk: "/ImportStage",
  // asset
  asset: "/Asset",
  assetBulk: "/ImportAssets",
  // connect asset
  connect_asset: "/ConnectAsset",
  // route
  route: "/Routes",
  // route map
  routeMap: "/RouteMap",
  // multi ticket
  multiTicket: "/MutiTicketConfiguration",
  // child fare
  childFare: "/ChildFare",
  // ticket master
  PassengerRoles: "/PassengerRoles",

  // event manager
  eventmanager_register: "/EManager_register",
  eventmanager_list: `/ListEmanager`,
  approved_eventmanager: `/Approve-UnApprove-Emanager`,
  delete_eventmanager: `/DeleteEmanager`,

  // employee
  event_employee_create: "/CreateEventEmployee",
  event_employee_update: "/UpdateEventEmployee",
  event_employee_list: `/ListEventEmployee`,
  delete_event_employee: `/DeleteEventEmployee`,

  // event
  event: "/Event",

  // ticket
  ticket: "/Tickets",

  // ticket config
  ticket_config: "/TicketsConfiguration",

  // advertisement
  advertisement: "/Advertisement",

  // vendor
  vendor: "/Vendor",
};
