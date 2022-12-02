import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import moment from "moment";
import axios from "axios";
import { Col, Card, CardBody } from "reactstrap";
import { Button, message, Steps, Alert } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import CheckCircleIcon from "mdi-react/CheckCircleIcon";
import ShippingDetails from "./ShippingDetails";
import OrderItems from "./OrderItems";
import Overview from "./Overview";
import baseUrl from "../../../../utils/api/baseUrl";
import useGetReq from "../../../../customHooks/useGetReq";

const { Step } = Steps;

const CreateOrders = () => {
  const history = useHistory();
  const formatter = "YYYY-MM-DD[T]HH:mm:ss.000";
  const date = new Date();
  const orderDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "T" +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + (date.getSeconds() + 1)).slice(-2) +
    "." +
    "000";

  console.log(orderDate.replace("T", " "));
  const time = moment(orderDate).format(formatter);

  console.log(time);
  const id = localStorage.getItem("clientId");
  const [values, setValues] = useState({
    orderShipments: [],
    orderItems: [],
    clientId: `${id}`,
    whid: 9001,
    gnOrderId: null,
    orderDate: orderDate,
    createDate: orderDate,
    promiseDeliveryDate: null,
    userId: 1,
    modifiedDate: null,
    orderTotal: 0,
    orderTax: 0,
    orderGst: 0,
    orderSkuCost: 0,
    orderdiscount: 0,
    isPriority: false,
    salesChannelId: 1006,
    customerOrderId: null,
    vendorOrderId: null,
    isCod: false,
    entryUserId: 1002,
    modifiedUserId: 1002,
    expectedShipDate: null,
    shipCost: 0,
    isHold: false,
    orderStatus: "Open",
    completeShipment: 0,
    orderGuid: null,
    ordershipCost: 0,
    storeId: null,
  });
  const [shippingData, setShippingData] = useState({
    orderShipments: [
      {
        shipViaId: 1000,
        shipCustomerName: "",
        shipCompanyName: "",
        shipAddress1: "",
        shipAddress2: "",
        shipAddress3: "",
        shipCity: "",
        shipState: "",
        shipPostalCode: "",
        shipCountryCode: "",
        shipPhone: "",
        shipEmail: "",
        billCustomerName: "",
        billCompanyName: "",
        billAddress1: "",
        billAddress2: "",
        billCity: "",
        billState: "",
        billCountry: "",
        billPostalCode: "",
        billPhone: "",
        modifiedUserId: 1002,
        billEmail: "",
      },
    ],
  });
  const [orderShipments, setOrderShipments] = useState(
    shippingData.orderShipments[0]
  );
  const [billing, setBilling] = useState({});
  const [initialVal, setInitialVal] = useState({
    billCustomerName: "",
    billCompanyName: "",
    billAddress1: "",
    billAddress2: "",
    billCity: "",
    billCountry: "",
    billState: "",
    billPostalCode: "",
    billPhone: "",
    billEmail: "",
  });
  const [orderItems, setOrderItems] = useState([]);
  const [countries, setCountries] = useState();
  const [isChecked, setIsChecked] = useState();
  const [filterCountries, setFilterCountries] = useState();
  const [filterBillCountries, setFilterBillCountries] = useState();
  const [success, setSuccess] = useState(false);
  const [selectedState, setSelectedpState] = useState({
    shipCountry: "USA",
    billCountry: "CANADA",
  });
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [current, setCurrent] = useState(0);
  const [createdOrderId, setCreatedOrderId] = useState();
  const [getData, cancelRequests] = useGetReq();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const warningAlert = () => {
    setShowWarn(true);
  };
  setTimeout(() => {
    setShowWarn(false);
  }, 5000);

  console.log(values);

  console.log(filterBillCountries);

  useEffect(() => {
    if (orderShipments?.shipCountryCode === selectedState.shipCountry) {
      setFilterCountries(
        countries?.filter((obj) => obj?.country === selectedState.shipCountry)
      );
    } else if (orderShipments?.shipCountryCode === selectedState.billCountry) {
      setFilterCountries(
        countries?.filter((obj) => obj?.country === selectedState.billCountry)
      );
    } else {
      setFilterCountries(null);
    }
  }, [orderShipments]);

  useEffect(() => {
    if (orderShipments?.billCountry === selectedState.shipCountry) {
      setFilterBillCountries(
        countries?.filter((obj) => obj?.country === selectedState.shipCountry)
      );
    } else if (orderShipments?.billCountry === selectedState.billCountry) {
      setFilterBillCountries(
        countries?.filter((obj) => obj?.country === selectedState.billCountry)
      );
    } else {
      setFilterBillCountries(null);
    }
  }, [orderShipments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderShipments((val) => ({
      ...val,
      [name]: value,
    }));

    setBilling((bil) => ({
      ...bil,
      billCustomerName: orderShipments?.shipCustomerName,
      billCompanyName: orderShipments?.shipCompanyName,
      billAddress1: orderShipments?.shipAddress1,
      billAddress2: orderShipments?.shipAddress2,
      billCountry: orderShipments?.shipCountryCode,
      billCity: orderShipments?.shipCity,
      billState: orderShipments?.shipState,
      billPostalCode: orderShipments?.shipPostalCode,
      billPhone: orderShipments?.shipPhone,
      billEmail: orderShipments?.shipEmail,
    }));
  };

  const handleCustomerOrderNo = (evnt) => {
    const { name, value } = evnt.target;
    setValues((val) => ({
      ...val,
      [name]: value,
    }));
  };

  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
    setCurrent(current + 1);
    values?.orderShipments.splice(0, 1, orderShipments);
    Object.assign(shippingData.orderShipments[0], orderShipments);
    Object.assign(values, shippingData);
  };

  const previousPage = () => {
    setPage(page - 1);
    setCurrent(current - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.assign(values?.orderItems, orderItems);
    setIsButtonLoading(true);
    axios({
      method: "POST",
      url: "https://localhost:7039/api/Order",
      data: values,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        setIsButtonLoading(false);
        setCreatedOrderId(response.data.orderId);
        setSuccess(true);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      Object.assign(orderShipments, billing);
      Object.assign(shippingData.orderShipments[0], orderShipments);
      Object.assign(values, shippingData);
    } else {
      Object.assign(orderShipments, initialVal);
      Object.assign(shippingData.orderShipments[0], orderShipments);
      Object.assign(values, shippingData);
    }
  };

  useEffect(() => {
    getData(`${baseUrl}/api/State`, setCountries);

    return cancelRequests;
  }, []);

  const steps = [
    {
      title: "Order Items",
      content: (
        <OrderItems
          previousPage={previousPage}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
          onSubmit={nextPage}
          initialValues={values}
          baseUrl={baseUrl}
        />
      ),
    },
    {
      title: "Shipping/Billing Details",
      content: (
        <ShippingDetails
          onSubmit={nextPage}
          values={values}
          filterCountries={filterCountries}
          filterBillCountries={filterBillCountries}
          orderShipments={orderShipments}
          handleChange={handleChange}
          handleCheck={handleCheck}
          isChecked={isChecked}
          previousPage={previousPage}
          handleCustomerOrderNo={handleCustomerOrderNo}
        />
      ),
    },
    {
      title: "Overview",
      content: (
        <Overview
          previousPage={previousPage}
          onSubmit={handleSubmit}
          isButtonLoading={isButtonLoading}
          dataSource={orderItems}
          values={values}
        />
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <Col md={12} lg={12}>
      <p style={{ float: "right", marginBottom: "10px", marginTop: "-15px" }}>
        Create Order / Order Management
      </p>
      {success && createdOrderId ? (
        <SweetAlert
          success
          title="Order Created"
          onConfirm={() => {
            setSuccess(false);
            history.push("/e_commerce_dashboard");
          }}
          onCancel={() => setSuccess(false)}
        >
          New Order Created Succesfully
          <br />
          OrderId : {createdOrderId}
        </SweetAlert>
      ) : null}
      <Card className="wizard__Card">
        <CardBody className="wizard">
          <Steps current={current}>
            <Step title="Order Items" labelPlacement="vertical" />
            <Step title="Shipping/Billing Details" labelPlacement="vertical" />
            <Step title="Overview" labelPlacement="vertical" />
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          {/* <div className="steps-action">
            {current < steps.length - 1 && (
              <>
                <div
                  style={{
                    display: "flex",
                    float: "right",
                    alignItems: "center",
                  }}
                >
                  {showWarn ? (
                    <Alert
                      message="Please Add Order Items..."
                      type="warning"
                      showIcon
                      closable
                      style={{ marginTop: "-20px", marginRight: "20px" }}
                    />
                  ) : null}

                  {orderItems.length > 0 ? (
                    <Button
                      outline
                      type="primary"
                      htmlType="submit"
                      onClick={nextPage}
                      style={{ float: "right" }}
                    >
                      <b> Next {`>>`}</b>
                    </Button>
                  ) : (
                    <Button
                      outline
                      type="primary"
                      htmlType="button"
                      onClick={warningAlert}
                      style={{ float: "right" }}
                    >
                      <b> Next {`>>`}</b>
                    </Button>
                  )}
                </div>
                {/* <Button type="primary" onClick={() => next()}>
                  Next
                </Button> */}
          {/* </>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )} */}
          {/* </div> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default CreateOrders;
