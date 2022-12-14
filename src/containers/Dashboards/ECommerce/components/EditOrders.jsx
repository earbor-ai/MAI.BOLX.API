import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { Col, Card, CardBody } from "reactstrap";
import { Steps } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import EditOrderItems from "./EditOrderItems";
import EditShipments from "./EditShipments";
import BASE_URL from "../../../../utils/api/baseUrl";
import EditOverview from "./EditOverview";

const { Step } = Steps;

const EditOrders = () => {
  const { orderID } = useParams();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [resData, setResData] = useState();
  const [orderItemsData, setOrderItemsData] = useState();
  const [skuDetails, setSkuDetails] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [options, setOptions] = useState();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [shippingData, setShippingData] = useState();
  const [data, setData] = useState();
  const [countries, setCountries] = useState();
  const [spin, setSpin] = useState();
  const [isSucess, setIsSucess] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectedState, setSelectedpState] = useState({
    shipCountry: "USA",
    billCountry: "CANADA",
  });
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  // console.log(resData);

 const token = localStorage.getItem("myToken");

  const nextPage = () => {
    setPage(page + 1);
    setCurrent(current + 1);
    Object.assign(resData?.orderItems, orderItemsData);
  };

  const previousPage = () => {
    setPage(page - 1);
    setCurrent(current - 1);
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setData((initialVal) => ({
      ...initialVal,
      [name]: value,
    }));
    setResData((val) => ({
      ...val,
      [name]: value,
    }));
  };

  useEffect(() => {
    setSpin(true);
    const api = `${BASE_URL}/api/Order?clientId=1029&orderId=${orderID}`;
    axios
      .get(api, {
        Accept: "*/*",
      })
      .then((res) => {
        setResData(res?.data[0]);
        setSpin(false);
        res.data.map((d) => setOrderItemsData(d?.orderItems));
        res.data.map((d) => setShippingData(d?.orderShipments));
        res.data.map((d) => setData(d?.orderShipments[0]));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const api = `${BASE_URL}/api/Sku?clientId=1029`;
    axios
      .get(api, {
        Accept: "*/*",
      })
      .then((res) => {
        // console.log(res?.data);
        setOptions(res?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const api = `${BASE_URL}/api/Sku?clientId=1030&skuId=${selected}`;
    axios
      .get(api, {
        Accept: "*/*",
      })
      .then((res) => {
        res?.data.map((elem) =>
          setSkuDetails({
            sku: elem?.sku1,
            desc: elem?.description,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selected]);

  const submitUpdatedData = () => {
    resData?.orderShipments.splice(0, 1, data);
    setIsButtonLoading(true);
    axios({
      method: "PUT",
      url: `${BASE_URL}/api/Order`,
      data: resData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log(response);
        setIsButtonLoading(false);
        setIsSucess(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const api = `${BASE_URL}/api/State`;
    axios
      .get(api, {
        Accept: "*/*",
      })
      .then((res) => {
        setCountries(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClientChange = (text, value, children) => {
    console.log(`selected ${value} ${text} ${children}`);
    setSelected(value);
  };

  const steps = [
    {
      title: "Order Items",
      content: (
        <EditOrderItems
          onSubmit={nextPage}
          resData={resData}
          orderItemsData={orderItemsData}
          orderItems={orderItems}
          setOrderItemsData={setOrderItemsData}
          onClientChange={onClientChange}
          selected={selected}
          setSelected={setSelected}
          loading={loading}
          options={options}
          spin={spin}
        />
      ),
    },
    {
      title: "Shipping/Billing Details",
      content: (
        <EditShipments
          onSubmit={nextPage}
          resData={resData}
          previousPage={previousPage}
          shippingData={shippingData}
          data={data}
          update={handleUpdate}
          submitData={submitUpdatedData}
          countries={countries}
        />
      ),
    },
    {
      title: "Overview",
      content: (
        <EditOverview
          dataSource={orderItemsData}
          details={data}
          onSubmit={submitUpdatedData}
          previousPage={previousPage}
          isButtonLoading={isButtonLoading}
        />
      ),
    },
  ];

  return (
    <Col md={12} lg={12}>
       <p style={{ float: "right", marginBottom: "10px", marginTop: "-15px" }}>
        Update Order / Order Management
      </p>
      {isSucess ? (
        <SweetAlert
          success
          title="Order Updated"
          onConfirm={() => {
            setIsSucess(false);
            history.push("/e_commerce_dashboard");
          }}
          onCancel={() => setIsSucess(false)}
        >
          Order Updated Succesfully
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
          {/* <div>
            {page === 1 && (
              <EditOrderItems
                onSubmit={nextPage}
                resData={resData}
                orderItemsData={orderItemsData}
                orderItems={orderItems}
                setOrderItemsData={setOrderItemsData}
                onClientChange={onClientChange}
                selected={selected}
                setSelected={setSelected}
                loading={loading}
                options={options}
                spin={spin}
              />
            )}
            {page === 2 && (
              <EditShipments
                onSubmit={nextPage}
                resData={resData}
                previousPage={previousPage}
                shippingData={shippingData}
                data={data}
                update={handleUpdate}
                submitData={submitUpdatedData}
                countries={countries}
              />
            )}
            {page === 3 && (
              <EditOverview
                dataSource={orderItemsData}
                details={data}
                onSubmit={submitUpdatedData}
                previousPage={previousPage}
                isButtonLoading={isButtonLoading}
              />
            )}
          </div> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default EditOrders;
