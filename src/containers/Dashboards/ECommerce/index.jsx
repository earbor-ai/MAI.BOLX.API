import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Container, Row, Card } from "reactstrap";
import jsPDF from "jspdf";
import * as XLSX from "xlsx/xlsx.mjs";
import "jspdf-autotable";
import {
  Table,
  Tooltip,
  Space,
  Typography,
  Tag,
  Modal,
  Spin,
  Popconfirm,
  AutoComplete,
  Button,
  Dropdown,
  Menu,
  Checkbox,
  DatePicker,
} from "antd";
import "antd/dist/antd.css";
import PdfIcon from "mdi-react/PdfIcon";
import FileExcelIcon from "mdi-react/MicrosoftExcelIcon";
import {
  EditOutlined,
  DownOutlined,
  EyeOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import ViewModal from "./components/ViewModal";
import useGetReq from "../../../customHooks/useGetReq";
import UploadExcel from "./components/UploadExcel";

const { RangePicker } = DatePicker;

const ECommerceDashboard = () => {
  const [orderDataSource, setOrderDataSource] = useState();
  const [orderNewList, setOrdersNewList] = useState([]);
  const [orderIds, setOrderIds] = useState([]);
  const [cancel, setCancel] = useState(false);
  const [filteredTable, setFilteredTable] = useState();
  const [defaultValue, setDefaultValues] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "9",
  ]);
  const [filterColumns, setFilteredColumns] = useState([]);
  const [items, setItems] = useState();
  const [excelVal, setExcelVal] = useState([]);
  const searchInput = useRef(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [openUpload, setOpenUpload] = useState(false);
  const [excelToArray, setExcelToArray] = useState();

  const token = localStorage.getItem("myToken");
  useEffect(() => {
    axios
      .get(`http://216.230.74.17:8013/api/Order?clientId=1029`, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "*/*",
      })
      .then((res) => {
        console.log(res?.data?.data);
        setOrderDataSource(res?.data?.data);
      })
      .catch((error) => error.message);
  }, [token]);

  const info = (e, id) => {
    Modal.info({
      content: <ViewModal id={id} />,
      onOk() {},
      width: "1000px",
      keyboard: true,
      loading: true,
    });
  };

  const handleCancel = (id) => {
    setOrderIds([...orderIds, id]);
    setCancel(true);
  };


  const columns = [
    {
      key: "1",
      title: "Order#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "orderid",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.orderid}</Typography.Text>
      ),
    },
    {
      key: "2",
      title: "Customer Order#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "custorderid",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.custorderid}</Typography.Text>
      ),
      showOnResponse: true,
    },
    {
      key: "3",
      title: "Order Status",
      dataKey: "orderstatus",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <>
          {orderIds.includes(record?.orderid) ? (
            <Tag color="yellow">Cancelled</Tag>
          ) : (
            <Tag
              color={
                record.orderstatus === "NEW"
                  ? "blue"
                  : record.orderstatus === "Open"
                  ? "green"
                  : record.orderstatus === "Cancel"
                  ? "yellow"
                  : null
              }
            >
              <Typography.Text>{record?.orderstatus}</Typography.Text>
            </Tag>
          )}
        </>
      ),
      sorter: (a, b) => a.orderstatus - b.orderstatus,
      // ...getColumnSearchProps("orderStatus"),
    },
    {
      key: "4",
      title: "Customer Name",
      dataKey: "shipCustomerName",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <Typography.Text>
          {record?.ordersshipments[0]?.shipcustomername}
        </Typography.Text>
      ),
      hidden: false,
    },
    {
      key: "5",
      title: "City/State",
      dataKey: "shipstate",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <Typography.Text>
          {record?.ordersshipments[0]?.shipcity}/
          {record?.ordersshipments[0]?.shipstate}
        </Typography.Text>
      ),
    },
    {
      key: "6",
      title: "Order Creation Date",
      dataKey: "orderdate",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.orderdate}</Typography.Text>
      ),
      // sorter: (a, b) => a.sku1?.length - b.sku1?.length,
    },
    {
      key: "7",
      title: "Ship Cost",
      dataKey: "ordershipcost",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.ordershipcost}</Typography.Text>
      ),
    },
    {
      key: "8",
      dataKey: "whid",
      title: "Warehouse#",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => <Typography.Text>{record?.whid}</Typography.Text>,
    },
    {
      key: "9",
      title: "Action",
      width: 100,
      hidden: false,
      render: (_, record) => (
        <>
          {record?.orderstatus === "Cancel" ? (
            <Space size="small">
              <Tooltip title="View">
                <EyeOutlined
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    info(e, record?.orderid);
                  }}
                />
              </Tooltip>
            </Space>
          ) : (
            <Space size="small">
              <>
                {orderIds.includes(record?.orderid) ? (
                  <Tooltip title="View">
                    <EyeOutlined
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        info(e, record?.orderid);
                      }}
                    />
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title="Edit" color="#108ee9" key="#108ee9">
                      <Link to={`/editOrder/${record?.orderid}`}>
                        <EditOutlined
                          style={{ color: "blue", cursor: "pointer" }}
                        />
                      </Link>
                    </Tooltip>
                    <Popconfirm
                      title="Sure to cancel order?"
                      onConfirm={() => handleCancel(record?.orderid)}
                    >
                      <CloseCircleOutlined
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </>
                )}
              </>
            </Space>
          )}
        </>
      ),
    },
  ];

  function processExcel(data) {
    const workbook = XLSX.read(data, { type: "binary" });
    const firstSheet = workbook.SheetNames[0];
    const excelRows = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[firstSheet]
    );

    const result = Object.values(
      excelRows.reduce(
        (
          c,
          {
            PONumber,
            ShiptoCity,
            Qty,
            ItemNo,
            ClientID,
            ShipVia,
            ShiptoAddress1,
            ShiptoCountry,
            ShiptoName,
            ShiptoPhone,
            ShiptoState,
            ShiptoZip,
            Shiptoemail,
          }
        ) => {
          c[PONumber] = c[PONumber] || {
            PONumber,
            ShiptoCity,
            ClientID,
            ShipVia,
            ShiptoAddress1,
            ShiptoCountry,
            ShiptoName,
            ShiptoPhone,
            ShiptoState,
            ShiptoZip,
            Shiptoemail,
            orderitems: [],
          };
          c[PONumber].orderitems = c[PONumber].orderitems.concat({
            skuid: 3141,
            orderqty: Qty,
            bkoqty: 0,
            shipqty: 0,
            cancelqty: 0,
            itemcost: 0,
            extitemcost: 0,
            manifestid: null,
            locationid: null,
            returnqty: null,
            sku: {
              skuid: 3141,
              sku1: "WF-418",
              description:
                "CATOLICISMO: GUIA PARA FACILITADORES Y HOJA DE RESPUESTAS",
              status: "Active",
            },
          });
          return c;
        },
        {}
      )
    );
    setExcelToArray(result);
  }

  function excelUpload() {
    const fileUpload = document.getElementById("fileUpload");
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload?.value.toLowerCase())) {
      if (typeof FileReader !== "undefined") {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            processExcel(reader.result);
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        }
      } else {
        console.log("This browser does not support HTML5.");
      }
    } else {
      console.log("Please upload a valid Excel file.");
    }
  }

  useEffect(() => {
    let groupedSubItems = [];
    orderDataSource?.forEach((item) => {
      if (item.orderShipments) {
        groupedSubItems = groupedSubItems.concat(
          Object.assign(item, item.orderShipments[0])
        );
      }
    });
    setItems(groupedSubItems);
  }, [orderDataSource]);

  const handlePrint = () => {
    const Doc = new jsPDF();
    Doc.text("Orders Details", 15, 10);
    Doc.autoTable({
      columns: filterColumns.map((col) => ({ ...col, dataKey: col.dataKey })),
      body: items,
      theme: "grid",
    });
    Doc.save("Orders.pdf");
  };

  const onChange = (checkedValues) => {
    setDefaultValues(checkedValues);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Checkbox.Group
          style={{
            width: "100%",
          }}
          defaultValue={defaultValue}
          onChange={(event) => onChange(event)}
        >
          <Col span={8}>
            <Checkbox disabled value="1" style={{ marginBottom: "7px" }}>
              Order Id
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="2" disabled style={{ marginBottom: "7px" }}>
              Customer Order #
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="3" style={{ marginBottom: "7px" }}>
              Order Status
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="4" style={{ marginBottom: "7px" }}>
              Customer Name
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="5" style={{ marginBottom: "7px" }}>
              City/State
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="6" style={{ marginBottom: "7px" }}>
              Order Creation Date
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="7" style={{ marginBottom: "7px" }}>
              Ship Cost
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="8" style={{ marginBottom: "7px" }}>
              Warehouse#
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="9" disabled style={{ marginBottom: "7px" }}>
              Action
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    const clmns = [];
    columns.forEach((e1) => {
      defaultValue.forEach((e2) => {
        if (e1.key.toString() === e2.toString()) {
          clmns.push(e1);
        }
      });
    });
    setFilteredColumns(clmns);
  }, [orderDataSource, defaultValue]);


  const getDateRange = (date, dateString) => {
    console.log(date, dateString);
    date.map((sd) => setStartDate(sd?._d));
    dateString.map((sd) => setEndDate(sd?._d));
    console.log(startDate, endDate);

    const resultProductData = orderDataSource.filter((d) => {
      const time = new Date(d.orderDate).getTime();
      return startDate < time && time < endDate;
    });
    console.log(resultProductData);
  };

  const handleClick = () => {
    const workSheet = XLSX.utils.json_to_sheet(items);
    const workBook = { Sheets: { data: workSheet }, SheetNames: ["data"] };

    XLSX.utils.book_append_sheet(workBook, workSheet, "students");
    const buf = XLSX.write(workBook, { bookType: "xlsx", type: "array" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Data.xlsx");
    setExcelVal(filterColumns);
  };

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

  const search = (value) => {
    const filterTable = orderDataSource.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredTable(filterTable);
  };

  const openFileUpload = () => {
    setOpenUpload(true);
  };
  const onBackClick = () => {
    setOpenUpload(false);
  };

  return (
    <Container className="dashboard">
      {openUpload ? (
        <UploadExcel
          excelUpload={excelUpload}
          excelToArray={excelToArray}
          onBackClick={onBackClick}
        />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "-15px",
              marginBottom: "6px",
            }}
          >
            <h3 className="page-title">Order Management</h3>
            <div>
              <Button
                type="button"
                onClick={openFileUpload}
                style={{ marginRight: "10px" }}
              >
                <CloudUploadOutlined />
                Upload File
              </Button>
              <Link to="/createOrder">
                <Button type="primary">
                  <PlusOutlined style={{ marginTop: "-3px" }} />
                  Create New Order
                </Button>
              </Link>
            </div>
          </div>
          <Row>
            <Col md={12} xl={12} lg={6} sm={12} xs={12}>
              <Card style={{ backgroundColor: "white", padding: "10px" }}>
                {/* <div ref={componentRef}> */}
                <Table
                  columns={filterColumns}
                  dataSource={
                    filteredTable?.length > 0 ? filteredTable : orderDataSource
                  }
                  size="small"
                  title={() => (
                    <>
                      <div className="header__section">
                        <div>
                          {orderDataSource?.length > 0 ? (
                            <Space>
                              <Tooltip placement="bottom" title="Export to PDF">
                                <PdfIcon
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={handlePrint}
                                />
                              </Tooltip>
                              <Tooltip
                                placement="bottom"
                                title="Export to Excel"
                              >
                                <FileExcelIcon
                                  style={{ color: "green", cursor: "pointer" }}
                                  onClick={handleClick}
                                />
                              </Tooltip>
                              <AutoComplete
                                style={{
                                  width: "10em",
                                  marginRight: "10px",
                                }}
                                enterButton="search"
                                onSearch={search}
                                placeholder="Search by ...."
                              />
                            </Space>
                          ) : null}
                        </div>
                        <div className="search__input">
                          <div>
                            <RangePicker
                              style={{ marginRight: "10px" }}
                              onChange={getDateRange}
                            />
                            <Dropdown overlay={menu} arrow>
                              <Button>
                                <Space>
                                  Columns
                                  <DownOutlined />
                                </Space>
                              </Button>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  bordered
                  pagination={{
                    defaultPageSize: 15,
                    showSizeChanger: true,
                    pageSizeOptions: ["15", "20", "30", "50", "100"],
                  }}
                  style={{ marginTop: "15px" }}
                  stripes="even"
                  locale={locale}
                />
                {/* </div> */}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
export default connect()(ECommerceDashboard);
