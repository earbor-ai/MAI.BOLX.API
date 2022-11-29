import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { CardBody } from "reactstrap";
import axios from "axios";
// import { mdiChartBar } from '@mdi/js';
function FitnessDashboard() {
  const [skuTableData, setSkuTableData] = useState();
  const [mySKus, setMySKus] = useState();
  const [tableShowing, setTableShowing] = useState(false);
  const [FilterSKu, setFilterSKu] = useState();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // http://216.230.74.17:8013/api/InventoryReport?clientId=1029
  const token = localStorage.getItem("myToken");
  useEffect(() => {
    // setShowTable(true)
    const accessToken = token;
    console.log(accessToken);
    const api2 = `http://216.230.74.17:8013/api/Sku?clientId=1029`;
    console.log(api2);
    axios
      .get(api2, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setMySKus(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const showDataTable = () => {
    const accessToken = token;
    console.log(accessToken);
    const api2 = `http://216.230.74.17:8013/api/InventoryReport?clientId=1029`;
    axios
      .get(api2, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res?.data?.data);
        setSkuTableData(res?.data?.data);
        setTableShowing(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = [
    {
      key: "1",
      title: "SKU",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "sku",
      sorter: (a, b) => a.sku - b.sku,
      render: (_, record) => <Typography.Text>{record?.sku}</Typography.Text>,
    },
    {
      key: "2",
      title: "Description",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      render: (_, record) => (
        <Typography.Text>{record?.description}</Typography.Text>
      ),
    },
    {
      key: "3",
      title: "AvailbleQuantity",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "availbleQuantity",
      sorter: (a, b) => a.availbleQuantity.length - b.availbleQuantity.length,
      render: (_, record) => (
        <Typography.Text>{record?.availbleQuantity}</Typography.Text>
      ),
    },
    {
      key: "4",
      title: "LotCode",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "lotcode",
      sorter: (a, b) => a.lotcode - b.lotcode,
      render: (_, record) => (
        <Typography.Text>{record?.lotcode}</Typography.Text>
      ),
    },
    {
      key: "5",
      title: "lotexp",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "lotexp",
      sorter: (a, b) => a.lotexp - b.lotexp,
      render: (_, record) => (
        <Typography.Text>{record?.lotexp}</Typography.Text>
      ),
    },
  ].filter((item) => !item.hidden);
  console.log(FilterSKu);
  const Finishing = (values) => {
    console.log(values);
  };
  const skuValues = (myValues) => {
    console.log(myValues);
    skuTableData.map((particularVlaues) => {
      console.log(particularVlaues?.sku);
    });
  };
  const selectedValues = (selectedValues) => {
    console.log(selectedValues);
  };
  return (
    <Col
      sm={12}
      md={12}
      lg={12}
      xl={12}
      style={{ paddingRight: "0px", paddingLeft: "20px", paddingTop: "40px" }}
    >
      <Card style={{ minHeight: "500px", minWidth: "100em" }}>
        <div>
          <mdiChartBar />
          <h5>Inventory Reports</h5>
          <hr />
        </div>

        <Form
          name="customized_form_controls"
          layout="inline"
          onFinish={Finishing}
          // labelCol={{
          //   span: 8,
          // }}
          wrapperCol={{
            span: 50,
          }}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item>
            <div>
              <strong>SKU</strong>
            </div>
            <Select
              placeholder="Select SKU's"
              optionFilterProp="children"
              style={{ width: "20em", marginBottom: "0px" }}
              onChange={skuValues}
              onSelect={selectedValues}
            >
              <option value="">Select SKU's</option>
              {mySKus?.map((ourskus) => {
                return <option value={ourskus?.sku1}>{ourskus?.sku1}</option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Col>
              <div>
                <strong>Description</strong>
              </div>
              <Input />
            </Col>
          </Form.Item>
          <Form.Item>
            <Col>
              <div>
                <strong>Lot Code</strong>
              </div>
              <Input />
            </Col>
          </Form.Item>
          <Form.Item>
            <Col style={{ paddingTop: "20px" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#20c997", borderColor: "#20c997" }}
                onClick={showDataTable}
              >
                search
              </Button>
            </Col>
          </Form.Item>
          <Form.Item>
            <Col style={{ paddingTop: "20px" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#20c997", borderColor: "#20c997" }}
              >
                clear
              </Button>
            </Col>
          </Form.Item>
        </Form>
        {tableShowing ? (
          <>
            <Table
              columns={columns}
              bordered
              scroll={{ x: true }}
              dataSource={skuTableData}
              sortDirections={["descend", "ascend"]}
              size="small"
              pagination={{
                defaultPageSize: 50,
                showSizeChanger: true,
                pageSizeOptions: ["50"],
              }}
              style={{ marginTop: "9px" }}
              stripes="even"
              // loading={myLoading}
            />
          </>
        ) : null}
      </Card>
    </Col>
  );
}

export default FitnessDashboard;
