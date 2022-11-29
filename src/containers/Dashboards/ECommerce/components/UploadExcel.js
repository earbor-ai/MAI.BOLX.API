import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card } from "reactstrap";
import {
  Button,
  message,
  Table,
  Typography,
  Space,
  Spin,
  AutoComplete,
} from "antd";
import _ from "lodash";
// const _ = require('lodash');

const UploadExcel = ({ excelUpload, excelToArray, onBackClick }) => {
  const [deatils, setDetails] = useState();
  const [tabData, setTabData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [emptyArray, setEmptyArray] = useState([]);
  const [filteredTable, setFilteredTable] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const array = [];
    if (excelToArray) {
      excelToArray?.forEach((d) => {
        const data = {
          clientid: d?.ClientID,
          whid: 9001,
          orderdate: "2022-09-17T09:48:27.787948",
          createddate: "2022-09-17T09:48:27.787948",
          entryuserid: 1002,
          modifieddate: "2022-09-17T09:48:27.787948",
          ordertotal: 0,
          ordertax: 0,
          orderskucost: 0,
          orderdiscount: 0,
          ispriority: true,
          saleschannelid: 1006,
          custorderid: d?.PONumber.toString(),
          vendororderid: null,
          expectedshipdate: "2022-09-17T09:48:27.787948",
          ishold: true,
          orderstatus: "Open",
          ordershipcost: 0,
          storeid: null,
          masterskuid: 3134,
          kitqty: 5,
          kitcompletedqty: 0,
          ordercompleteddate: "2022-09-17T09:48:27.787948",
          originalorderid: "string",
          comments: "TEST PRODUCT",
          preferredshipdate: "2022-09-17T09:48:27.787948",
          modifieduserid: 1002,
          isgiftorder: true,
          completeshipment: true,
          giftmessage: null,
          customerpo: null,
          jobid: null,
          toteid: null,
          ispartialkit: null,
          orderitems: d?.orderitems,
          ordersshipments: [
            {
              reqshipviaid: 0,
              shipcustomername: d?.ShiptoName,
              shipcompanyname: "eArbor",
              shipaddress1: d?.ShiptoAddress1,
              shipaddress2: "Madhapur",
              shipaddress3: "Hybd",
              shipcity: d?.ShiptoCity,
              shipstate: "Ohio",
              shippostalcode: "1234ABC",
              shipcountrycode: "USA",
              shipphone: "1234567890",
              shipemail: "test@mail.com",
              billcustomername: "Raghava 234",
              billcompanyname: "eArbor",
              billaddress1: "Chennai",
              billaddress2: "Chennai",
              billcity: "Chennai",
              billstate: "New York",
              billpostalcode: "USA",
              billphone: "1234567890",
              billemail: "test@mail.com",
              _3rdpartyaccno: null,
              reqshipvia: {
                shipviaid: 0,
                shipvianame: "UPS Collect",
                isactive: true,
                shippriority: 0,
                clientid: 1029,
                accountno: null,
                isthirdparty: true,
              },
            },
          ],
        };
        array.push(data);
      });
    }
    setDetails(array);
  }, [excelToArray]);

  console.log(excelToArray);
  console.log(deatils);

  const token = localStorage.getItem("myToken");

  const tabDataSource = (response, e) => {
    const emptyData = {
      PONumber: e?.custorderid,
      orderId: 0,
      isSuccess: false,
      message: "",
      reasonCode: 0,
    };
    emptyData.orderId = response?.data?.data?.orderId;
    emptyData.isSuccess = response?.data?.isSuccess;
    emptyData.message = response?.data?.message;
    emptyData.reasonCode = response?.data?.reasonCode;

    const postVal = emptyArray;
    postVal.push(emptyData);
    console.log(postVal, postVal.length);
    setEmptyArray(postVal);
    setTabData((iniVal) => [...iniVal, emptyArray]);
  };

  useEffect(() => {
    if (tabData?.length > 0) {
      setLoading(false);
    }
  }, [tabData]);

  async function func1() {
    deatils.forEach((e) => {
      console.log(e);
      if (e) {
        axios({
          method: "POST",
          url: "http://216.230.74.17:8013/api/Order",
          data: e,
          headers: {
            accept: "*/*",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            setShowTable(true);
            tabDataSource(response, e);
          })
          .catch((error) => console.log(error));
      }
    });
  }

  const postData = () => {
    setLoading(true);
    func1();
  };

  const columns = [
    {
      key: "1",
      title: "PO#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "custorderid",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.PONumber}</Typography.Text>
      ),
    },
    {
      key: "2",
      title: "ORDER#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "orderid",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.orderId}</Typography.Text>
      ),
      showOnResponse: true,
    },
    {
      key: "3",
      title: "Order Status",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "orderstatus",
      align: "left",
      render: (_, record) => (
        <>
          {record?.reasonCode === 200 ? (
            <Typography.Text style={{ color: "green" }}>
              Order Created Successfully
            </Typography.Text>
          ) : record?.reasonCode === 300 ? (
            <Typography.Text style={{ color: "#ffc300" }}>
              Order already existed
            </Typography.Text>
          ) : null}
        </>
      ),
      showOnResponse: true,
    },
  ];

  const search = (value) => {
    const filterTable = tabData[0].filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredTable(filterTable);
  };

  return (
    <div style={{ marginTop: "-15px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4>Uploads</h4>
        <p>Upload / Order Management</p>
      </div>
      <div>
        <Row>
          <Col md={12} xl={12} lg={6} sm={12} xs={12}>
            <Card
              style={{
                backgroundColor: "white",
                padding: "10px",
                minHeight: "350px",
              }}
            >
              <Button onClick={onBackClick} style={{ width: "60px" }}>
                Back
              </Button>
              <div style={{ margin: "10px auto 10px auto" }}>
                <div>
                  <label style={{ fontWeight: "500" }}>
                    Upload excel: <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <input
                  className="upload-excel"
                  type="file"
                  id="fileUpload"
                  onChange={excelUpload}
                />
                <Button
                  type="primary"
                  style={{ marginLeft: "10px", marginRight: "5px" }}
                  onClick={postData}
                  size="large"
                  loading={loading}
                >
                  Update
                </Button>
              </div>

              {/* <label className="drop-container">
                <span className="drop-title">Drop files here</span>
                or
                <input type="file" id="images" required />
                <Button
                  type="primary"
                  style={{ marginLeft: "10px", marginRight: "5px" }}
                  onClick={postData}
                  size="large"
                >
                  Update
                </Button>
              </label> */}
              {/* <div className="container">
                <div className="fileUploadInput">
                  <label>Upload Excel File</label>
                  <input type="file" onChange={excelUpload} />
                  <button type="bu" onClick={postData}>Update</button>
                </div>
              </div> */}

              <div style={{ width: "50%", margin: "auto" }}>
                {tabData.length > 0 ? (
                  <Table
                    columns={columns}
                    dataSource={
                      filteredTable?.length > 0
                        ? filteredTable
                        : _.cloneDeep(tabData[0])
                    }
                    title={() => (
                      <>
                        <Space>
                          <AutoComplete
                            style={{
                              width: "10em",
                              marginRight: "10px",
                              float: "right",
                            }}
                            enterButton="search"
                            onSearch={search}
                            placeholder="Search by ...."
                          />
                        </Space>
                      </>
                    )}
                    bordered
                    size="small"
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "30", "50", "100"],
                    }}
                    style={{ marginTop: "15px" }}
                    stripes="even"
                    // locale={locale}
                  />
                ) : null}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UploadExcel;
