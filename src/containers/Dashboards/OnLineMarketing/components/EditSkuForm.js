import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import { AvForm, AvField, AvFeedback } from "availity-reactstrap-validation";
import { Col, Row } from "reactstrap";
import { Button, Skeleton, Spin } from "antd";
import Cookies from "universal-cookie";
import SweetAlert from "react-bootstrap-sweetalert";
import UpdateIcon from "mdi-react/UpdateIcon";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import ClientId from "../ClientId";

const EditSkuForm = () => {
  const { SKUId } = useParams();
  console.log(SKUId);
  const history = useHistory();
  const [data, setData] = useState();
  const [utils, setUtils] = useState({
    clientid: 0,
    entryuserid: 0,
    modifieduserid: 0,
  });
  const { clientid, modifieduserid, entryuserid } = utils;
  const [updateData, setUpdateData] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [size, setSize] = useState("default");
  const [formLoading, setFormLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [myButton, setMyButton] = useState(false);

  const handleUpdate = (e) => {
    const { name, value } = e.target;

    setUpdateData((state) => ({
      ...state,
      [name]: value,
      clientid: Number(clientid),
      skuid: Number(SKUId),
      entryuserid: Number(entryuserid),
      modifieduserid: Number(modifieduserid),
    }));
  };

  const cookies = new Cookies();
  const SingleClientID = cookies.get("clientId");
  console.log(SingleClientID);

  const token = localStorage.getItem("myToken");
  useEffect(() => {
    const accessToken = token;
    // const api = `http://216.230.74.17:7039/api/Sku?clientId=1029&skuId=${SKUId}`;
    // const api = `https://localhost:7039/api/Sku?clientId=${SingleClientID}&skuId=${SKUId}`;
    // const api = `https://localhost:7039/api/Sku?clientId=${1029}&skuId=${SKUId}`;
    const api = `http://216.230.74.17:8013/api/Sku?clientId=1029&skuId=${SKUId}`;
    setFormLoading(true);
    axios
      .get(api, {
        Accept: "*/*",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setFormLoading(false);
        console.log(res?.data?.data);
        setData(res?.data?.data);
        res.data?.map((d) =>
          setUtils({
            clientid: d?.clientid,
            entryuserid: d?.entryuserid,
            modifieduserid: d?.modifieduserid,
          })
        );
        res.data?.map((d) => setUpdateData(d));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(data);

  const updateSkuData = () => {
    const accessToken = token;
    setMyButton(true);
    axios({
      method: "PUT",
      // url: "http://216.230.74.17:7039/api/Sku",
      url: "http://216.230.74.17:8013/api/Sku",
      // url: "https://localhost:7039/api/Sku",
      data: updateData,
      headers: {
        Accept: "*/*",
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    })
      .then((response) => {
        console.log(response);
        setOpenAlert(true);
        setMyButton(false);
      })
      .catch((error) => console.log(error));
  };

  const handleValidSubmit = (event, values) => {
    event.preventDefault();
  };

  const handleInvalidSubmit = (event, errors, values) => {
    console.log(errors);
  };
  return (
    <>
      {openAlert ? (
        <SweetAlert
          success
          title="SKU Updated"
          onConfirm={() => {
            // history.push("/online_marketing_dashboard");
            setOpenAlert(false);
          }}
          onCancel={() => {
            setOpenAlert(false);
          }}
        >
          SKU Updated Succesfully
        </SweetAlert>
      ) : null}
      {formLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5em",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          {data?.map((d) => (
            <>
              <AvForm
                onValidSubmit={handleValidSubmit}
                onInvalidSubmit={handleInvalidSubmit}
              >
                <Col>
                  <Row>
                    <Col lg="4">
                      <div className="mb-3">
                        <AvField
                          name="sku1"
                          label={
                            <>
                              <b>SKU/ITEM Code:</b>
                              <span style={{ color: "red" }}>*</span>
                            </>
                          }
                          type="text"
                          style={{ borderColor: "#5b73e8" }}
                          value={d?.sku1}
                          onChange={handleUpdate}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter SKU/ITEM CODE",
                            },
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="mb-3">
                        <AvField
                          name="description"
                          label={
                            <>
                              <b>Description:</b>
                              <span style={{ color: "red" }}>*</span>
                            </>
                          }
                          type="text"
                          required
                          style={{ borderColor: "#5b73e8" }}
                          value={d?.description}
                          onChange={handleUpdate}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter Description",
                            },
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="mb-3">
                        <AvField
                          type="select"
                          name="itemtype"
                          label={
                            <>
                              <b>Item Type:</b>
                              <span style={{ color: "red" }}>*</span>
                            </>
                          }
                          className="form-select"
                          style={{ borderColor: "#5b73e8" }}
                          required
                          value={d?.itemtype}
                          onChange={handleUpdate}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please select ItemType",
                            },
                          }}
                        >
                          <option value="">Select Item Type</option>
                          <option value="Item">Item</option>
                          <option value="Prebuild KIT">Prebuild KIT</option>
                          <option value="Dynamic KIT">Dynamic KIT</option>
                          <option value="Non Inventory Item">
                            Non Inventory Item
                          </option>
                        </AvField>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <div className="mb-3">
                        <AvField
                          name="weight"
                          label={
                            <>
                              <b> Weight(lbs):</b>
                              <span style={{ color: "red" }}>*</span>
                            </>
                          }
                          type="text"
                          required
                          style={{ borderColor: "#5b73e8" }}
                          // value={d?.weight}
                          value={
                            String(d?.weight).split(".").length < 2 ||
                            String(d?.weight).split(".")[1].length <= 2
                              ? d?.weight.toFixed(2)
                              : d?.weight
                          }
                          onChange={handleUpdate}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter Weight",
                            },
                          }}
                        />
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="mb-3">
                        <AvField
                          type="select"
                          name="uom"
                          label={
                            <>
                              <b>Primary UOM:</b>
                              <span style={{ color: "red" }}>*</span>
                            </>
                          }
                          className="form-select"
                          style={{ borderColor: "#5b73e8" }}
                          required
                          value={d?.uom}
                          onChange={handleUpdate}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please select UOM",
                            },
                          }}
                        >
                          <option value="">Select UOM</option>
                          <option value="UNIT">UNIT</option>
                          <option value="CASE">CASE</option>
                          <option value="PACK">PACK</option>
                          <option value="LPN">LPN</option>
                          <option value="OTHER">OTHER</option>
                        </AvField>
                      </div>
                    </Col>

                    <Col lg="4">
                      <div className="mb-3">
                        <AvField
                          name="purchasecost"
                          label={
                            <>
                              <b>Purchase Cost</b>
                              <span style={{ color: "red" }}>*</span>{" "}
                            </>
                          }
                          type="text"
                          style={{ borderColor: "#5b73e8" }}
                          required
                          // value={d?.purchasecost}
                          value={
                            String(d?.purchasecost).split(".").length < 2 ||
                            String(d?.purchasecost).split(".")[1].length <= 2
                              ? d?.purchasecost.toFixed(2)
                              : d?.purchasecost
                          }
                          onChange={handleUpdate}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please Enter Purchase Cost",
                            },
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <AvField
                        type="select"
                        name="status"
                        label={
                          <>
                            <b>Status:</b>
                            <span style={{ color: "red" }}>*</span>
                          </>
                        }
                        className="form-select"
                        style={{ borderColor: "#5b73e8" }}
                        required
                        value={d?.status}
                        onChange={handleUpdate}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please select Status",
                          },
                        }}
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Defective">Inactive</option>
                        <option value="Hold">Hold</option>
                        <option value="Discontinue">Discontinue</option>
                      </AvField>
                    </Col>
                  </Row>
                </Col>
                <Row>
                  <Col lg={12} offset={8} style={{ padding: "20px" }}>
                    {myButton ? (
                      <div>
                        <Button
                          type="primary"
                          shape="round"
                          icon={<UpdateIcon />}
                          size="large"
                          style={{
                            display: "flex",
                            backgroundColor: "#20c997",
                            borderColor: "#20c997",
                            float: "right",
                          }}
                          onClick={updateSkuData}
                          disabled
                        >
                          Updating...
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          type="primary"
                          shape="round"
                          icon={<UpdateIcon />}
                          size="large"
                          style={{
                            display: "flex",
                            backgroundColor: "#20c997",
                            borderColor: "#20c997",
                            float: "right",
                          }}
                          onClick={updateSkuData}
                        >
                          Update SKU
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </AvForm>
            </>
          ))}
        </>
      )}
    </>
  );
};
export default EditSkuForm;
