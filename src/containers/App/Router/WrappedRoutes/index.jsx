import React from "react";
import { Route } from "react-router-dom";
import Layout from "../../../Layout/index";
import Commerce from "./Commerce";
import Finance from "./Finance";
import OnLineMarketingDashboard from "../../../Dashboards/OnLineMarketing/index";
import AppDashboard from "../../../Dashboards/App/index";
import BookingDashboard from "../../../Dashboards/Booking/index";
import FitnessDashboard from "../../../Dashboards/Fitness/index";
import UI from "./UI";
// import Mail from '../../../Mail/index';
import Chat from "../../../Chat/index";
import Todo from "../../../Todo/index";
import Forms from "./Forms";
import Tables from "./Tables";
import Charts from "./Charts";
import Maps from "./Maps";
import Account from "./Account";
import ECommerce from "./ECommerce";
import DefaultPages from "./DefaultPages";
import Documentation from "./Documentation";
import EditSku from "../../../Dashboards/OnLineMarketing/components/EditSku";
import EditOrders from "../../../Dashboards/ECommerce/components/EditOrders";
import CreateOrders from "../../../Dashboards/ECommerce/components/CreateOrders";
import InvReports from "../../../Dashboards/Fitness/components/InvReports";
import HistoryReport from "../../../Dashboards/Fitness/components/HistoryReport";
import InventoryLotReports from "../../../Dashboards/Fitness/components/InventoryLotReports";
import SerialNoReport from "../../../Dashboards/Fitness/components/SerialNoReport";
import KitInventory from "../../../Dashboards/Fitness/components/KitInventory";

export default () => (
  <div>
    <Layout />
    <div className="container__wrap">
      {/* <Route path="/finance_dashboard" component={Finance} /> */}
      <Route path="/" component={Finance} />
      <Route path="/e_commerce_dashboard" component={Commerce} />
      <Route
        path="/online_marketing_dashboard"
        component={OnLineMarketingDashboard}
      />
      <Route exact path="/app_dashboard" component={AppDashboard} />
      <Route path="/booking_dashboard" component={BookingDashboard} />
      <Route path="/fitness_dashboard" component={FitnessDashboard} />
      <Route path="/inv_reports" component={InvReports} />
      <Route path="/history_reports" component={HistoryReport} />
      <Route path="/inventory_lot_reports" component={InventoryLotReports} />
      <Route path="/serial_reports" component={SerialNoReport} />
      <Route path="/kit_inventory" component={KitInventory} />
      <Route path="/ui" component={UI} />
      <Route path="/chat" component={Chat} />
      <Route path="/todo" component={Todo} />
      <Route path="/forms" component={Forms} />
      <Route path="/tables" component={Tables} />
      <Route path="/charts" component={Charts} />
      <Route path="/maps" component={Maps} />
      <Route path="/account" component={Account} />
      <Route path="/e-commerce" component={ECommerce} />
      <Route path="/default_pages" component={DefaultPages} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/edit-sku/:SKUId" component={EditSku} />
      <Route path="/createOrder" component={CreateOrders} />
      <Route path="/editOrder/:orderID" component={EditOrders} />
    </div>
  </div>
);
