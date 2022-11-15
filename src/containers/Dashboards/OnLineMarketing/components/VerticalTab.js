import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import KitComponent from "./KitComponent";

const VerticalTab = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="tabs__wrap">
      <Nav tabs className="col-lg-2">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => toggle("1")}
          >
            Sales
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => toggle("2")}
          >
            Kit Component
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <p>
            Direction has strangers now believing. Respect enjoyed gay far
            exposed parlors towards. Enjoyment use tolerably dependent listening
            men. No peculiar in handsome together unlocked do by. Article
            concern joy anxious did picture sir her. Although desirous not
            recurred disposed off shy you numerous securing.
          </p>
        </TabPane>
        <TabPane tabId="2">
          <KitComponent />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default VerticalTab;
