export const endpoints = {
  /**
   * @module Global
   * */
  imageUpload: '/api/uploadfile',

  /**
   * @module Auth
   * */
  login: '/api/login',

  /**
   * @module Role { Admin }
   * @protected
   * */

  /**
   *  @module Category
   * */
  category: '/api/category',

  // old api
  category_list1: '/api/list-cat1',
  add_category1: '/api/add-cat1',
  edit_category1: '/api/edit-cat1',
  delete_category1: '/api/delete-cat1',
  // single_category1: "/api/single-cat1",
  category_list2: '/api/list-cat2',
  add_category2: '/api/add-cat2',
  edit_category2: '/api/edit-cat2',
  delete_category2: '/api/delete-cat2',
  cat2_by_cat1: '/api/Cat2ByCat1',

  /**
   * @module Product
   * */
  product: '/api/product',
  category_product: '/api/Products',
  import_product: '/api/import-product',

  // old api
  add_product: '/api/add-product',
  product_list: '/api/list-product',
  edit_product: '/api/edit-product',
  delete_product: '/api/delete-product',
  product_by_cat1: '/api/ProductByCat1',
  product_comment: '/api/Reviews',

  /**
   * @module Role Management
   * */
  role_list: '/api/AdminRoles',

  /**
   * @module User Management
   * */
  subAdmin_list: '/api/subadmins',

  /**
   * @module Publisher
   * */
  publisher: '/api/Publisher',
  publisher_by_cat1: '/api/PublisherByCat1',

  /**
   * @module Author
   * */
  author: '/api/Author',
  author_by_cat1: '/api/AuthorByCat1',

  /**
   * @module Albums
   * */
  albums: '/api/Albums',

  /**
   * @module Photos
   * */
  albumsPhotos: '/api/AlbumsPhotos',

  /**
   * @module CMS
   * @description Content Management System Main Home Module
   * */
  /**
   * @module Feature Slider
   * @submodule of CMS
   * */
  add_home_slider: '/api/add-home-sliders',
  list_home_slider: '/api/list-home-sliders',
  edit_home_slider: '/api/replace-home-sliders',
  delete_home_slider: '/api/delete-home-sliders',
  /**
   * @module Feature Sub Slider
   * @submodule of CMS
   * */
  add_home_sub_slider: '/api/add-home-sub-sliders',
  list_home_sub_slider: '/api/list-home-sub-sliders',
  edit_home_sub_slider: '/api/replace-home-sub-sliders',
  delete_home_sub_slider: '/api/delete-home-sub-sliders',
  /**
   * @module Feature Product
   * @submodule of CMS
   * */
  add_home_product: '/api/add-featured-products',
  list_home_product: '/api/list-featured-products',
  edit_home_product: '/api/replace-featured-products',
  delete_home_product: '/api/remove-featured-products',

  /**
   * @module Feature New In
   * @submodule of CMS
   * */
  add_new_in: '/api/add-newin-products',
  list_new_in: '/api/list-newin-products',
  delete_new_in: '/api/remove-newin-products',
  toggle_new_in: '/api/newin-toggle',
  top_ten_books: '/api/TopBook',

  /**
   * @module Coupon
   * */
  coupon: '/api/Coupons',

  /**
   * @module Order Management
   * */
  order_user: '/api/Users',
  order_list: '/api/Orders',
  update_order: '/api/OrderStatusUpdate',

  assign_book: '/api/AssignBooks',
  get_assign_book: '/api/GetAssignBooks',
  delete_assign_book: '/api/RemoveAssignedBooks',
}
