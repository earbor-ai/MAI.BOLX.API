import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Typography, Spin } from "antd";
import { Col, Row } from "reactstrap";
import "antd/dist/antd.css";
import TruckDeliveryIcon from "mdi-react/TruckDeliveryIcon";
import NoteIcon from "mdi-react/NoteIcon";
import ArchiveIcon from "mdi-react/ArchiveIcon";
import BASE_URL from "../../../../utils/api/baseUrl";

const ViewModal = ({ id }) => {
  const [singleOrder, setSingleOrder] = useState();
  const [data, setData] = useState();
  console.log(data);
  const getSingleOrder = () => {
    const api = `${BASE_URL}/api/Order?clientId=1029&orderId=${id}`;
    axios
      .get(api, {
        Accept: "*/*",
      })
      .then((res) => {
        setSingleOrder(res.data);
        res.data?.map((d) => setData(d?.orderItems));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSingleOrder();
  });

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "skuId",
    },
    {
      key: "2",
      title: "Description",
      render: (record) => (
        <Typography.Text>{record?.description}</Typography.Text>
      ),
    },
    {
      key: "3",
      title: "Quantity",
      render: (record) => <Typography.Text>{record?.orderQty}</Typography.Text>,
    },
  ];
  return (
    <div>
      {singleOrder ? (
        <div>
          <h3 style={{ textAlign: "center", marginTop: "10px" }}>
            Order Details
          </h3>
          <hr />
          <Row style={{ justifyContent: "space-around" }}>
            <div className="col-lg-6">
              <Col
                className="shipping_col"
                style={{ border: "1px solid #70bbfd", borderRadius: "5px" }}
              >
                <h4
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    color: "#0c3d7c",
                  }}
                >
                  <TruckDeliveryIcon />
                  SHIPPING INFO
                </h4>
                <hr />
                <div>
                  {singleOrder?.map((details) => (
                    <>
                      <table
                        style={{ width: "100%", marginBottom: "20px" }}
                        className="overview__table"
                      >
                        <tr>
                          <th style={{ width: "130px" }}>Company Name:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.shipCompanyName}
                          </td>
                        </tr>
                        <tr>
                          <th>Customer Name:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.shipCustomerName}
                          </td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.shipAddress1},{" "}
                            {details?.orderShipments[0]?.shipAddress2},{" "}
                            {details?.orderShipments[0]?.shipAddress3},{" "}
                            {details?.orderShipments[0]?.shipCity},{" "}
                            {details?.orderShipments[0]?.shipCountry},{" "}
                            {details?.orderShipments[0]?.shipState},{" "}
                            {details?.orderShipments[0]?.shipPostalCode}
                          </td>
                        </tr>
                        <tr>
                          <th>Phone No:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.shipPhone}
                          </td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.shipEmail}
                          </td>
                        </tr>
                      </table>
                    </>
                  ))}
                </div>
              </Col>
            </div>
            <div className="col-lg-6">
              <Col style={{ border: "1px solid #70bbfd", borderRadius: "5px" }}>
                <h4
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    color: "#0c3d7c",
                  }}
                >
                  <NoteIcon />
                  BILLING INFO
                </h4>
                <hr />
                <div>
                  {singleOrder?.map((details) => (
                    <>
                      <table
                        style={{ width: "100%", marginBottom: "20px" }}
                        className="overview__table"
                      >
                        <tr>
                          <th style={{ width: "130px" }}>Company Name:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.billCompanyName}
                          </td>
                        </tr>
                        <tr>
                          <th>Customer Name:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.billCustomerName}
                          </td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.billAddress1},{" "}
                            {details?.orderShipments[0]?.billAddress2},{" "}
                            {details?.orderShipments[0]?.billCity},{" "}
                            {details?.orderShipments[0]?.billState},{" "}
                            {details?.orderShipments[0]?.billCountry},{" "}
                            {details?.orderShipments[0]?.billPostalCode}
                          </td>
                        </tr>
                        <tr>
                          <th>Phone No:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.billPhone}
                          </td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td
                            style={{
                              width: "167px",
                              color: "#615f5f",
                              fontWeight: "500",
                            }}
                          >
                            {details?.orderShipments[0]?.billEmail}
                          </td>
                        </tr>
                      </table>
                    </>
                  ))}
                </div>
              </Col>
            </div>
          </Row>
          <hr />
          <h4 style={{ textAlign: "center", color: "#0c3d7c" }}>
            {" "}
            <ArchiveIcon /> Order Items
          </h4>
          <hr />
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
          />

          <hr />
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default ViewModal;
