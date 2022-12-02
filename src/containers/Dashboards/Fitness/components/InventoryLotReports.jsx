import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Card, CardBody, Row, Label, Container } from "reactstrap";
import { Button, Select, Input, message, Typography, Table, Space, Spin } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const InventoryLotReports = () => {
  const [clients, setClients] = useState();
  const [lotReports, setLotReports] = useState();
  const [skuLoading, setSkuLoading] = useState(false);
  const [lot, setLot] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const token = localStorage.getItem("myToken");
  const id = localStorage.getItem("clientId");
  useEffect(() => {
    setSkuLoading(true);
    const accessToken = token;
    const clientApi = `http://216.230.74.17:8013/api/Client`;
    axios
      .get(clientApi, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setClients(res?.data?.data);
        console.log(res?.data?.data);
        setSkuLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getLotData = () => {
    if (id && lot) {
      setButtonLoading(true);
      const accessToken = token;
      const lotApi = `http://216.230.74.17:8013/api/InventoryReport/GetInventoryLotcodeReport?clientId=${id}&lotCode=${lot}`;
      axios
        .get(lotApi, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLotReports(res?.data?.data);
          console.log(res?.data?.data);
          setButtonLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setButtonLoading(true);
      const accessToken = token;
      const lotApi = `http://216.230.74.17:8013/api/InventoryReport/GetInventoryLotcodeReport?clientId=${id}`;
      axios
        .get(lotApi, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLotReports(res?.data?.data);
          console.log(res?.data?.data);
          setButtonLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getLotData();
  }, []);

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please select a client",
    });
  };
  const getVal = (e) => {
    setLot(e.target.value);
    console.log(e.target.value);
  };

  const columns = [
    {
      key: "1",
      title: "SKU#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "sku",
      align: "left",
      render: (_, record) => <Typography.Text>{record?.sku}</Typography.Text>,
    },
    {
      key: "2",
      title: "DESCRIPTION",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "description",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.description}</Typography.Text>
      ),
      showOnResponse: true,
    },
    {
      key: "3",
      title: "Lot Code",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "lotcode",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.lotcode}</Typography.Text>
      ),
      showOnResponse: true,
    },
    {
      key: "4",
      title: "Exp Date",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      dataKey: "lotexp",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.lotexp}</Typography.Text>
      ),
      showOnResponse: true,
    },
    {
      key: "5",
      title: "Available Quantity",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "availbleQuantity",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.availbleQuantity}</Typography.Text>
      ),
      showOnResponse: true,
    },
    {
      key: "6",
      title: "Allocated",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "allocatedQuantity",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.allocatedQuantity}</Typography.Text>
      ),
      showOnResponse: true,
    },
    {
      key: "7",
      title: "On Hand",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "onHand",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.onHand}</Typography.Text>
      ),
      showOnResponse: true,
    },
  ];
  const locale = {
    emptyText: (
      <Space size="large">
        <Spin
          size="large"
          style={{ marginTop: "100px", marginBottom: "100px" }}
        />
      </Space>
    ),
  };
  return (
    <Container className="dashboard">
      <Row>
        <Col md={12} lg={12}>
          {contextHolder}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "-20px",
            }}
          >
            <h4>Lotcode Report</h4>
            <p>Lotcode Report / Inventory Reports</p>
          </div>
          <Card style={{ minHeight: "300px" }}>
            <CardBody>
              <Row>
                <Col className="mb-3 col-lg-3 col-xs-12">
                  <Label>Lot Code:</Label>
                  <Input
                    placeholder="enterLotCode"
                    onChange={getVal}
                    allowClear
                  />
                </Col>
                <Col
                  className="mt-4 col-lg-3 col-xs-12"
                  style={{ display: "flex" }}
                >
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{ marginRight: "10px", marginTop: "6px" }}
                    onClick={getLotData}
                  >
                   Search
                  </Button>

                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    style={{
                      background: "#ffcd05",
                      borderColor: "#ebe00b",
                      marginTop: "6px",
                    }}
                    // onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm={12} lg={12} md={12} xs={6} xl={12}>
                  <Table
                    columns={columns}
                    dataSource={lotReports ? lotReports : null}
                    bordered
                    size="small"
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "30", "50", "100"],
                    }}
                    style={{ marginTop: "15px", overflowX: "auto" }}
                    stripes="even"
                    locale={locale}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InventoryLotReports;
