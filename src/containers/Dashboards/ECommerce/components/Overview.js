import React from "react";
import { Col, Row, Button } from "reactstrap";
import { Space, Table, Typography } from "antd";
import TruckDeliveryIcon from "mdi-react/TruckDeliveryIcon";
import NoteIcon from "mdi-react/NoteIcon";
import ArchiveIcon from "mdi-react/ArchiveIcon";

const Overview = ({
  previousPage,
  onSubmit,
  dataSource,
  values,
  isButtonLoading,
}) => {
  console.log(dataSource);
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
      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        Details Overview
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
              {values?.orderShipments?.map((details) => (
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
                        {details?.shipCompanyName}
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
                        {details?.shipCustomerName}
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
                        {details?.shipAddress1}, {details?.shipAddress2},{" "}
                        {details?.shipAddress3}, {details?.shipCity},{" "}
                        {details?.shipCountryCode}, {details?.shipState},{" "}
                        {details?.shipPostalCode}
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
                        {details?.shipPhone}
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
                        {details?.shipEmail}
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
              {values?.orderShipments?.map((details) => (
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
                        {details?.billCompanyName}
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
                        {details?.billCustomerName}
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
                        {details?.billAddress1}, {details?.billAddress2},{" "}
                        {details?.billCity}, {details?.billState},{" "}
                        {details?.billCountry}, {details?.billPostalCode}
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
                        {details?.billPhone}
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
                        {details?.billEmail}
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
      <Table columns={columns} dataSource={dataSource} size="small" />

      <hr />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          outline
          color="secondary"
          type="button"
          style={{ float: "right" }}
          onClick={previousPage}
        >
          <b>{`<<`}Back</b>
        </Button>

        <Button
          color="success"
          type="submit"
          onClick={onSubmit}
          style={{ float: "right" }}
        >
          {isButtonLoading ? <b>Please Wait ..</b> : <b>Submit</b>}
        </Button>
      </div>
    </div>
  );
};

export default Overview;
