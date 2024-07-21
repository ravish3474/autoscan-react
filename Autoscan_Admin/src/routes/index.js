import React from "react";
import { Redirect } from "react-router-dom";
// User profile
// import Home from "../pages/frontend/index";
// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AccessDenied from "../pages/Authentication/AccessDenied";
import ChangePassword from "../pages/Authentication/ChangePassword";
import ResetPassword from "../pages/Authentication/ResetPassword";

// Dashboard
import RecruitmentDashboard from "../pages/Dashboard/Dashboard";
import CreateUser from "../pages/Users/createUser";
import EditUser from "../pages/Users/editUser";
import UserList from "../pages/Users/userList";
import RoleList from "../pages/settings/role-management/roleList";
/**-role-management */
import RoleManagement from "../pages/settings/role-management/RoleManagement";
import AddRoleManagement from "../pages/settings/role-management/AddRoleManagement";
import EditRoleManagement from "../pages/settings/role-management/EditRoleManagement";
// /**-manage-user */
/**-brand-management */
import BrandManagement from "../pages/Brand/brandManagement";
import AddBrandManagement from "../pages/Brand/createBrand";
import EditBrandManagement from "../pages/Brand/editBrand";
/**-model-management */
import ModelManagement from "../pages/Model/modelManagement";
import AddModelManagement from "../pages/Model/createModel";
import EditModelManagement from "../pages/Model/editModel";
/**-varient-management */
import VarientManagement from "../pages/Varient/varientManagement";
import AddVarientManagement from "../pages/Varient/createVarient";
import EditVarientManagement from "../pages/Varient/editVarient";

/**-car-management */
import CarManagement from "../pages/Car/carManagement";
import AddCarManagement from "../pages/Car/createCar";
import EditCarManagement from "../pages/Car/editCar";
import ViewCarManagement from "../pages/Car/viewCar";
/**-inspection-management */
import InspectionManagement from "../pages/Inspection/inspectionManagement";
import AddInspectionManagement from "../pages/Inspection/createInspection";
import EditInspectionManagement from "../pages/Inspection/editInspection";
import ViewInspectionManagement from "../pages/Inspection/viewInspection";

/**-ibidding-management */
import BiddingManagement from "../pages/Bidding/biddingManagement";
import AddBiddingManagement from "../pages/Bidding/createBidding";
import EditBiddingManagement from "../pages/Bidding/editBidding";
import ViewBiddingManagement from "../pages/Bidding/viewBidding";

const authProtectedRoutes = [
  { path: "/", exact: true, component: () => <Redirect to="dashboard" /> },
  { path: "/dashboard", component: RecruitmentDashboard },
  //user
  { path: "/create-user", component: CreateUser },
  { path: "/edit-user/:userId", component: EditUser },
  { path: "/user-list", component: UserList },
  { path: "/change-password", component: ChangePassword },
  { path: "/role-list", component: RoleList },

  /**-role-management**/
  { path: "/role-management", component: RoleManagement },
  { path: "/edit-role-management/:role_id", component: EditRoleManagement },
  { path: "/add-role-management", component: AddRoleManagement },
  /**-brand-management**/
  { path: "/brand-management", component: BrandManagement },
  { path: "/edit-brand-management/:brandId", component: EditBrandManagement },
  { path: "/add-brand-management", component: AddBrandManagement },

  /**-model-management**/
  { path: "/model-management", component: ModelManagement },
  { path: "/edit-model-management/:modelId", component: EditModelManagement },
  { path: "/add-model-management", component: AddModelManagement },
  /**-varient-management**/
  { path: "/varient-management", component: VarientManagement },
  {
    path: "/edit-varient-management/:varientId",
    component: EditVarientManagement,
  },
  { path: "/add-varient-management", component: AddVarientManagement },

  /**-car-management**/
  { path: "/car-management", component: CarManagement },
  { path: "/edit-car-management/:carId", component: EditCarManagement },
  { path: "/add-car-management", component: AddCarManagement },
  { path: "/view-car/:carId", component: ViewCarManagement },
  /**-inspection-management**/
  { path: "/inspection-management", component: InspectionManagement },
  {
    path: "/edit-inspection-management/:inspectionId",
    component: EditInspectionManagement,
  },
  { path: "/add-inspection-management", component: AddInspectionManagement },
  {
    path: "/view-inspection/:inspectionId",
    component: ViewInspectionManagement,
  },
  /**-bidding-management**/
  { path: "/bidding-management", component: BiddingManagement },
  {
    path: "/edit-bidding-management/:biddingId",
    component: EditBiddingManagement,
  },
  { path: "/add-bidding-management", component: AddBiddingManagement },
  {
    path: "/view-bidding/:biddingId",
    component: ViewBiddingManagement,
  },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/access-denied", component: AccessDenied },
  { path: "/reset-password", component: ResetPassword },
];

export { authProtectedRoutes, publicRoutes };
