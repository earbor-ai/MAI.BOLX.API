import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Button, Row } from "reactstrap";
import { Select, Alert, Empty, Spin } from "antd";
import PlusBoldIcon from "mdi-react/PlusBoldIcon";
import ArchiveIcon from "mdi-react/ArchiveIcon";
import SweetAlert from "react-bootstrap-sweetalert";
import TableEdit from "./Table";
import useGetReq from "../../../../customHooks/useGetReq";

const { Option } = Select;

const OrderItems = ({
  onSubmit,
  baseUrl,
  initialValues,
  setOrderItems,
  orderItems,
}) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();
  const [quantity, setQuantity] = useState();
  const [tableData, setTableData] = useState([]);
  // const [skuDetails, setSkuDetails] = useState({
  //   sku: "",
  //   desc: "",
  // });
  const [availableQty, setAvailableQty] = useState(50);
  const [loading, setLoading] = useState(true);
  const [showVal, setShowVal] = useState(false);
  const [id, setId] = useState([]);
  const [duplicateAlert, setDuplicateAlert] = useState(false);
  const [showWarn, setShowWarn] = useState(false);
  const [getData, cancelRequests] = useGetReq();
  // console.log(id);
  // console.log(duplicateAlert);

  useEffect(() => {
    // setLoading(true);
    getData(`${baseUrl}/api/Sku?clientId=1029`, setOptions);

    return cancelRequests;
  }, []);

  // const getOptionVal = () =>{
  //   const api = `${baseUrl}/api/Sku?clientId=1030&skuId=${selected}`;
  //   axios
  //     .get(api, {
  //       Accept: "*/*",
  //     })
  //     .then((res) => {
  //       res?.data.map((elem) =>
  //         setSkuDetails({
  //           sku: elem?.sku1,
  //           desc: elem?.description,
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // useEffect(() => {
  //    getOptionVal();
  //    return () => {
  //     setSkuDetails({});
  //   };
  // }, [selected]);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const onClientChange = (text, value, children) => {
    // console.log(`selected ${value} ${text} ${children}`);
    setSelected(value);
  };
  const onSearch = (value) => {
    // console.log("search:", value);
  };

  const add = (e) => {
    e.preventDefault();
    if (orderItems !== "") {
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
        setOrderItems([...orderItems, data]);
        setSelected();
        setQuantity(0);
        setShowVal(false);
      }
    }
  };

  useEffect(() => {
    orderItems?.map((elm) => setId([...id, elm?.skuId]));
  }, [orderItems]);

  // console.log(orderItems);
  const validate = () => {
    setShowVal(true);
  };

  const warningAlert = () => {
    setShowWarn(true);
  };

  setTimeout(() => {
    setShowWarn(false);
  }, 5000);

  const isLoading = false;
  return (
    // <Spin spinnig={isLoading} tip="Fetching data...">
      <div style={{ marginTop: "20px" }}>
        {duplicateAlert ? (
          <SweetAlert
            title="Item already exists!"
            onConfirm={() => setDuplicateAlert(false)}
            onCancel={() => setDuplicateAlert(false)}
          >
            You can add an item only once.
          </SweetAlert>
        ) : null}

        <Form onSubmit={onSubmit} initialValues={initialValues}>
          <h4 style={{ color: "#0b0c71", display: "flex" }}>
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
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option?.children
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(input?.toLowerCase())
                }
                style={{ width: "100%", height: "32px", marginRight: "10px" }}
                allowClear
                // loading={loading}
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
              <p style={{ fontWeight: "bold" }}>{availableQty}</p>
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
          {orderItems.length === 0 ? (
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
            <TableEdit
              tableData={tableData}
              setTableData={setTableData}
              orderItems={orderItems}
              setOrderItems={setOrderItems}
              value={initialValues}
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

            {orderItems.length > 0 ? (
              <Button
                outline
                color="primary"
                type="submit"
                style={{ float: "right" }}
              >
                <b> Next {`>>`}</b>
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
      </div>
    // </Spin>
  );
};

export default OrderItems;
