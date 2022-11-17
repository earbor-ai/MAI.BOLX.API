import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Card, CardTitle, Col, Container, Row } from "reactstrap";
import { Button, Spin } from "antd";
import { deleteCryptoTableData } from "../../../redux/actions/cryptoTableActions";
import { CryptoTableProps } from "../../../shared/prop-types/TablesProps";
import { ThemeProps, RTLProps } from "../../../shared/prop-types/ReducerProps";
import BTC from "./components/BTC";
import ETH from "./components/ETH";
import BCH from "./components/BCH";
import XRP from "./components/XRP";
import TradeHistory from "./components/TradeHistory";
import BtcEth from "./components/BtcEth";
import TopTen from "./components/TopTen";
import BASE_URL from "../../../utils/api/baseUrl";
import Loading from "../../../shared/components/Loading";
import ShipmentsGraph from "./components/shipmentsGraph";
import useGetReq from "../../../customHooks/useGetReq";

const onDeleteCryptoTableData = (dispatch, cryptoTable) => (index) => {
  const arrayCopy = [...cryptoTable];
  arrayCopy.splice(index, 1);
  dispatch(deleteCryptoTableData(arrayCopy));
};

const selectedActive = { boxShadow: "#60b2c0 0px 6px 0px 0px" };
const inactive = {};

const FinanceDashboard = ({ dispatch, cryptoTable, rtl, theme }) => {
  const { t } = useTranslation("common");
  const [active, setActive] = useState(true);
  const [data, setData] = useState();
  const [selected, setSelected] = useState(1);
  const [recieptsActive, setRecieptsActive] = useState(false);
  const [shipmentsActive, setShipmentsActive] = useState(false);
  const [deliveryActive, setDeliveryActive] = useState(false);
  const [clickedName, setClickedName] = useState("");
  const [dates, setDates] = useState();
  const [getData, cancelRequests] = useGetReq();

  const cookies = new Cookies();
  const token = cookies.get("myToken");

  useEffect(() => {
    axios
      .get("http://216.230.74.17:8013/api/Order?clientId=1029", {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "*/*",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => error.message);
  }, [token]);
  // console.log(data);

  const clickOrdersCard = (e) => {
    setActive((prevState) => !prevState);
    setSelected(1);
    setRecieptsActive(false);
    setShipmentsActive(false);
    setDeliveryActive(false);
    setClickedName("TOTAL ORDERS");
  };
  const clickReceiptsCard = (e) => {
    setActive(false);
    setSelected(2);
    setRecieptsActive((prevState) => !prevState);
    setShipmentsActive(false);
    setDeliveryActive(false);
    setClickedName("TOTAL PO RECEIPTS");
  };
  const clickShipmentsCard = (e) => {
    setActive(false);
    setSelected(3);
    setRecieptsActive(false);
    setShipmentsActive((prevState) => !prevState);
    setDeliveryActive(false);
    setClickedName("TOTAL SHIPMENTS");
  };
  const clickDeliveryCard = (e) => {
    setActive(false);
    setSelected(4);
    setRecieptsActive(false);
    setShipmentsActive(false);
    setDeliveryActive((prevState) => !prevState);
    setClickedName("ON TIME DELIVERY");
  };

  useEffect(() => {
    if (active) {
      setClickedName("TOTAL ORDERS");
    }
    getData(`${BASE_URL}/api/Order?clientId=1029`, setData);
    return cancelRequests;
  }, []);

  // useEffect(() => {
  //   const d = data?.map((elm) => elm?.orderDate?.toString()?.substring(0, 10));
  //   setDates(d);
  // }, [data]);

  // console.log(dates);

  console.log(data);
  // const

  // const date = moment(data?.orderDate, "YYYY-MM-DD HH:mm:ss").format(
  //   "DD-MM-YYYY"
  // );
  // console.log(date);

  const [name, setName] = useState({
    BTC: "BTC",
    ETH: "ETH",
    BCH: "BCH",
    XRP: "XRP",
  });
  return (
    <>
      {data ? (
        <>
          {" "}
          <Container className="dashboard">
            <Row>
              <Col md={12}>
                <h3
                  className="page-title"
                  style={{ marginTop: "-15px", marginBottom: "15px" }}
                >
                  {t("Dashboard")}
                </h3>
              </Col>
            </Row>
            <Row>
              <BTC
                dir={rtl.direction}
                data={data}
                style={selected === 1 ? selectedActive : inactive}
                clickEvent={clickOrdersCard}
              />
              <ETH
                dir={rtl.direction}
                style={selected === 2 ? selectedActive : inactive}
                clickEvent={clickReceiptsCard}
                data={data}
              />
              <BCH
                dir={rtl.direction}
                style={selected === 3 ? selectedActive : inactive}
                clickEvent={clickShipmentsCard}
                data={data}
              />
              <XRP
                dir={rtl.direction}
                style={selected === 4 ? selectedActive : inactive}
                clickEvent={clickDeliveryCard}
              />
            </Row>
            <Row>
              {active ? (
                <>
                  <TradeHistory name={clickedName} />
                  <BtcEth
                    dir={rtl.direction}
                    theme={theme.className}
                    name={clickedName}
                    data={data}
                  />
                </>
              ) : null}
              {/* {recieptsActive ? (
                <>
                  <TradeHistory name={clickedName} />
                 
                </>
              ) : null} */}
              {shipmentsActive ? (
                <>
                  <TradeHistory name={clickedName} />
                  <ShipmentsGraph
                    dir={rtl.direction}
                    theme={theme.className}
                    name={clickedName}
                    data={data}
                  />
                </>
              ) : null}
              {/* {deliveryActive ? (
                <>
                  <TradeHistory name={clickedName} />
                  <BtcEth
                    dir={rtl.direction}
                    theme={theme.className}
                    name={clickedName}
                    data={data}
                  />
                </>
              ) : null} */}
            </Row>
            <Row style={{ marginTop: "-15px" }}>
              <TopTen
                cryptoTable={cryptoTable}
                onDeleteCryptoTableData={onDeleteCryptoTableData(
                  dispatch,
                  cryptoTable
                )}
              />
            </Row>{" "}
          </Container>
        </>
      ) : (
        <>
          {" "}
          <Spin size="large" />
        </>
      )}
    </>
  );
};

FinanceDashboard.propTypes = {
  cryptoTable: CryptoTableProps.isRequired,
  dispatch: PropTypes.func.isRequired,
  rtl: RTLProps.isRequired,
  theme: ThemeProps.isRequired,
};

export default connect((state) => ({
  cryptoTable: state.cryptoTable.items,
  rtl: state.rtl,
  theme: state.theme,
}))(FinanceDashboard);
