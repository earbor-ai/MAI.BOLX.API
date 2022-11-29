import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
  Col,
} from "reactstrap";
import { Spin, Button } from "antd";
import classnames from "classnames";
import HomeIcon from "mdi-react/HomeIcon";
import BoxOutlineIcon from "mdi-react/BoxOutlineIcon";
import UserIcon from "mdi-react/UserIcon";
import Cookies from "universal-cookie";
import KitComponent from "./KitComponent";
import EditSkuForm from "./EditSkuForm";
// import ClientId from "../ClientId";

const EditSku = () => {
  const { SKUId } = useParams();
  console.log(SKUId);
  const history = useHistory();
  const [list, setList] = useState();
  const [data, setData] = useState();
  const [clientNameSetting, setClientNameSetting] = useState();
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  console.log(list);
  // const token =
  // "eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImV4cCI6IjE2NTc2OTY1NDIiLCJuYmYiOiIxNjU3NjEwMTQyIn0";
  const cookies = new Cookies();
  const token = localStorage.getItem("myToken");
  console.log(token);
  useEffect(() => {
    const accessToken = token;
    const abortController = new AbortController();
    // const SingleClientID = cookies.get("clientId");
    // const api = `http://216.230.74.17:7039/api/Sku?clientId=${1029}&skuId=${SKUId}`;
    console.log(SKUId);
    const api = `http://216.230.74.17:8013/api/Sku?clientId=1029&skuId=${SKUId}`;
    // http://216.230.74.17:8013/api/Sku?clientId=1029&skuId=3134
    // const api = `https://localhost:7039/api/Sku?clientId=${SingleClientID}&skuId=${SKUId}`;
    // const api = `https://localhost:7039/api/Sku?clientId=${1029}&skuId=${SKUId}`;
    axios
      .get(api, {
        Accept: "*/*",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res?.data?.data);
        setData(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      abortController.abort();
    };
  }, []);
  useEffect(() => {
    const items = localStorage.getItem("ClientName");
    setClientNameSetting(items);
  }, []);
  useEffect(() => {
    const accessToken = token;
    // const getCLient = localStorage.getItem("CLIENTID");
    // const api = `http://216.230.74.17:7039/api/Sku?clientId=${getCLient}`;
    // const api = `https://localhost:7039/api/Sku?clientId=${getCLient}`;
    // const api = `https://localhost:7039/api/Sku?clientId=${1029}`;
    const api = `http://216.230.74.17:8013/api/Sku?clientId=1029`;
    axios
      .get(api, {
        Accept: "*/*",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res?.data?.data);
        setList(res?.data?.data);
        console.log(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const BackToPage = () => {
    history.push("/online_marketing_dashboard");
  };
  return (
    <div>
      {data?.map((d) => (
        <div key={d?.clientid}>
          <Col sm={12} md={12} lg={12} xl={12}>
            {/* <h5>Update SKU</h5> */}
            <Card style={{ minHeight: "500px" }}>
              <CardBody className="tabs tabs--bordered-top">
                {/* <h3>Update SKU</h3> */}
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => toggle("1")}
                    >
                      <HomeIcon />
                      <b>Item</b>
                    </NavLink>
                  </NavItem>
                  {d?.itemtype === "Prebuild KIT" ? (
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => toggle("2")}
                      >
                        <BoxOutlineIcon /> <b> KIT Component</b>
                      </NavLink>
                    </NavItem>
                  ) : d?.itemtype === "Dynamic KIT" ? (
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => toggle("2")}
                      >
                        <BoxOutlineIcon /> <b> KIT Component</b>
                      </NavLink>
                    </NavItem>
                  ) : (
                    <>
                      <NavItem className="tab_component">
                        <NavLink>
                          <BoxOutlineIcon /> <b> KIT Component</b>
                        </NavLink>
                      </NavItem>
                    </>
                  )}
                  <div style={{ display: "flex" }}>
                    <h5 style={{ paddingLeft: "86em", justifyContent: "end" }}>
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        text="white"
                        style={{
                          backgroundColor: "rgb(36 32 32 / 51%)",
                          borderColor: "rgb(36 32 32 / 51%)",
                          color: "white",
                        }}
                        onClick={BackToPage}
                      >
                        Back
                      </Button>
                    </h5>
                  </div>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Col sm={12} md={12} lg={12} xl={12}>
                      <EditSkuForm />
                    </Col>
                  </TabPane>
                  <TabPane tabId="2">
                    <KitComponent data={data} list={list} />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </div>
      ))}
    </div>
  );
};
export default EditSku;
