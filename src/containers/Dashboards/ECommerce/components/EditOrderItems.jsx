import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import ArchiveIcon from "mdi-react/ArchiveIcon";
import { Select, Alert, Empty, Spin } from "antd";
import PlusBoldIcon from "mdi-react/PlusBoldIcon";
import { Button, Row } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import EditTable from "./EditTable";
import BASE_URL from "../../../../utils/api/baseUrl";

const { Option } = Select;

const EditOrderItems = ({
  onSubmit,
  orderItemsData,
  setOrderItemsData,
  onClientChange,
  selected,
  loading,
  options,
  setSelected,
  resData,
  spin,
}) => {
  console.log(orderItemsData);
  const [quantity, setQuantity] = useState();
  const [id, setId] = useState([]);
  const [duplicateAlert, setDuplicateAlert] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [availableQty, setAvailableQuantity] = useState(50);
  const [showVal, setShowVal] = useState(false);
  const [createSkuValues, setCreateSkuValues] = useState({
    orderShipments: [
      {
        shipViaId: 1000,
        shipCustomerName: resData?.orderShipments[0]?.shipCustomerName,
        shipCompanyName: resData?.orderShipments[0]?.shipCompanyName,
        shipAddress1: resData?.orderShipments[0]?.shipAddress1,
        shipAddress2: resData?.orderShipments[0]?.shipAddress2,
        shipAddress3: resData?.orderShipments[0]?.shipAddress3,
        shipCity: resData?.orderShipments[0]?.shipCity,
        shipState: resData?.orderShipments[0]?.shipState,
        shipPostalCode: resData?.orderShipments[0]?.shipPostalCode,
        shipCountryCode: resData?.orderShipments[0]?.shipCountry,
        shipPhone: resData?.orderShipments[0]?.shipPhone,
        shipMobile: resData?.orderShipments[0]?.shipMobile,
        shipEmail: resData?.orderShipments[0]?.shipEmail,
        billCustomerName: resData?.orderShipments[0]?.billCustomerName,
        billCompanyName: resData?.orderShipments[0]?.billCompanyName,
        billAddress1: resData?.orderShipments[0]?.billAddress1,
        billAddress2: resData?.orderShipments[0]?.billAddress2,
        billCity: resData?.orderShipments[0]?.billCity,
        billState: resData?.orderShipments[0]?.billState,
        billCountry: resData?.orderShipments[0]?.billCountry,
        billPostalCode: resData?.orderShipments[0]?.billPostalCode,
        billPhone: resData?.orderShipments[0]?.billPhone,
        modifiedUserId: 1002,
        billEmail: resData?.orderShipments[0]?.billEmail,
      },
    ],
    orderItems: [],
    clientId: 1029,
    whid: 9001,
    gnOrderId: null,
    orderDate: "2022-07-13T13:47:08.628656",
    createDate: "2022-07-13T13:47:08.628812",
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
    customerOrderId: "Shipping",
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

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  useEffect(() => {
    orderItemsData?.map((elm) => setId([...id, elm?.skuId]));
  }, [orderItemsData]);

  useEffect(() => {
    Object.assign(createSkuValues?.orderItems, orderItemsData);
  }, [orderItemsData]);

  const add = (e) => {
    e.preventDefault();
    if (orderItemsData !== "") {
      const data = {
        skuId: selected?.value,
        orderQty: quantity,
        description: selected?.children[2],
        bkoQty: 0,
        shipQty: 0,
        cancelQty: 0,
        itemCost: 0,
        extItemCost: 0,
        qcQty: 0,
        qcDone: 0,
        qcUserId: 1002,
        pickedUserId: 1002,
        pickedDate: "2022-09-09T09:04:16.633Z",
        manifestId: 5001087,
        qcDate: "2022-09-09T09:04:16.633Z",
      };
      const check = id?.some((i) => {
        return i === data?.skuId;
      });
      if (check) {
        setDuplicateAlert(true);
      } else {
        setOrderItemsData([...orderItemsData, data]);
        setSelected();
        setQuantity(0);
        setShowVal(false);
      }
    }
  };

  const validate = () => {
    setShowVal(true);
  };
  const warningAlert = () => {
    setShowWarn(true);
  };
  return (
    <div>
      {duplicateAlert ? (
        <SweetAlert
          title="Item already exists!"
          onConfirm={() => setDuplicateAlert(false)}
          onCancel={() => setDuplicateAlert(false)}
        >
          You can add an item only once.
        </SweetAlert>
      ) : null}
      <Spin tip="Loading...." spinning={spin}>
        <Form onSubmit={onSubmit}>
          <h4 style={{ color: "#0b0c71", display: "flex", marginTop: "15px" }}>
            <ArchiveIcon style={{ marginRight: "5px" }} />
            Order Items
          </h4>
          <hr />
          <Row style={{ width: "60%", margin: "auto" }}>
            <Form.Group className="mb-3 col-lg-5" controlId="formBasicEmail">
              <Form.Label>
                <span style={{ fontWeight: "500" }}>
                  Select SKU:<span style={{ color: "red" }}>*</span>
                </span>
              </Form.Label>
              <Select
                showSearch
                status="primary"
                placeholder="Select a Sku..."
                optionFilterProp="children"
                value={selected}
                onChange={onClientChange}
                loading={loading}
                filterOption={(input, option) =>
                  option?.children
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(input?.toLowerCase())
                }
                style={{ width: "100%", height: "32px", marginRight: "10px" }}
                allowClear
              >
                {options?.map((opt) => (
                  <>
                    <Option value={opt?.skuId}>
                      {opt?.sku1}-{opt?.description}
                    </Option>
                  </>
                ))}
              </Select>
              {!selected ? (
                <p style={{ color: "red" }}>
                  {showVal ? <>Please Select a Sku</> : null}
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3 col-lg-3" controlId="formBasicPassword">
              <Form.Label>
                <span style={{ fontWeight: "500" }}>Available Quantity:</span>
              </Form.Label>
              <p style={{ fontWeight: "bold" }}>50</p>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-2" controlId="formBasicPassword">
              <Form.Label>
                <span style={{ fontWeight: "500" }}>
                  Quantity:<span style={{ color: "red" }}>*</span>
                </span>
              </Form.Label>
              <Form.Control
                placeholder="Qty"
                type="number"
                size="sm"
                min="0"
                onChange={handleChange}
                value={quantity}
                isInvalid={quantity >= availableQty}
              />
              <Form.Control.Feedback type="invalid">
                Quantity should be less than Available Quantity
              </Form.Control.Feedback>
              {!quantity ? (
                <p style={{ color: "red" }}>
                  {showVal ? <>Please enter quantity</> : null}
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mt-4 col-lg-2" controlId="formBasicPassword">
              {quantity >= availableQty || !quantity || !selected ? (
                <Button
                  type="button"
                  color="primary"
                  onClick={validate}
                  style={{
                    padding: "7px",
                    width: "75px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PlusBoldIcon />
                  ADD
                </Button>
              ) : (
                <Button
                  type="button"
                  color="primary"
                  onClick={add}
                  style={{
                    padding: "7px",
                    width: "75px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PlusBoldIcon />
                  ADD
                </Button>
              )}
            </Form.Group>
          </Row>
          <hr />
          {orderItemsData?.length === 0 ? (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: "auto",
                width: "25%",
                margin: "auto",
              }}
              description={<span>Add Order Items</span>}
            />
          ) : (
            <EditTable
              dataSource={orderItemsData}
              setOrderItemsData={setOrderItemsData}
              availableQty={availableQty}
            />
          )}

          <hr />
          <div
            style={{ display: "flex", float: "right", alignItems: "center" }}
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

            {orderItemsData?.length > 0 ? (
              <Button
                outline
                color="primary"
                type="submit"
                style={{ float: "right" }}
              >
                Next{`>>`}
              </Button>
            ) : (
              <Button
                outline
                color="primary"
                type="button"
                onClick={warningAlert}
                style={{ float: "right" }}
              >
                <b> Next {`>>`}</b>
              </Button>
            )}
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default EditOrderItems;
