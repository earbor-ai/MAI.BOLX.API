import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Input,
  Select,
  InputNumber,
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
  CalendarOutlined,
} from "@ant-design/icons";
import ViewModal from "./components/ViewModal";
import useGetReq from "../../../customHooks/useGetReq";
import UploadExcel from "./components/UploadExcel";
import { Excel, Pdf } from "antd-table-saveas-excel";
import { first, get } from "lodash";

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
    "7",
    // "8",
    // "9",
    "10",
  ]);
  const [filterColumns, setFilteredColumns] = useState([]);
  const [items, setItems] = useState();
  const [excelVal, setExcelVal] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [openUpload, setOpenUpload] = useState(false);
  const [excelToArray, setExcelToArray] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [newOrder, setNewOrder] = useState();
  const searchInput = useRef(null);
  const numericalComparing = useRef(null);
  const myInputNumber = useRef("");
  const [shippingColumn, setShippingColumn] = useState([]);
  const [excelFilters, setExcelFilters] = useState([]);

  const token = localStorage.getItem("myToken");
  const id = localStorage.getItem("clientId");
  useEffect(() => {
    axios
      .get(`http://216.230.74.17:8013/api/Order?clientId=1029`, {
        headers: { Authorization: `Bearer ${token}` },
        Accept: "*/*",
      })
      .then((res) => {
        // console.log(res?.data?.data);
        setOrderDataSource(res?.data?.data);
        setNewOrder(res?.data?.data);
      })
      .catch((error) => error.message);
  }, [token]);
  //array pushing new shipping data
  useEffect(() => {
    const array = [];
    orderDataSource?.forEach((item1) => {
      const data = Object.assign(item1, item1?.ordersshipments[0]);
      array.push(data);
    });
    setShippingColumn(array);
  }, [orderDataSource]);
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

  ///filter search
  ///column search --->string
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: true,
              });
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      console.log(visible);
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  //number filter search
  const handleResetting = (clearFilters) => {
    clearFilters();
    numericalComparing.current.value = 0;
  };
  const handleSearchNumber = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const getColumnsNumber = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => {
      const selectAfter = (
        <Select
          style={{
            width: 78,
          }}
          defaultValue=""
          // ref={myInputNumber}
          onSelect={(e) => {
            console.log(`selected values is ${e}`);
            myInputNumber.current = e;
            console.log(numericalComparing?.current.value);
            setSelectedKeys(
              myInputNumber?.current === "LessThan" &&
                numericalComparing.current.value !== null
                ? orderDataSource.filter(
                    (field) =>
                      field?.orderid <= numericalComparing?.current.value
                  )
                : myInputNumber?.current === "GreaterThan" &&
                  numericalComparing.current.value !== null
                ? orderDataSource.filter(
                    (field) =>
                      field?.orderid >= numericalComparing?.current.value
                  )
                : myInputNumber?.current === "EqualTo" &&
                  numericalComparing.current.value !== null
                ? orderDataSource.filter(
                    (field) =>
                      field?.orderid == numericalComparing?.current.value
                  )
                : null
            );
          }}
          onChange={(e) => {
            console.log(`changeSelect ${e}`);
            console.log(selectedKeys);
          }}
        >
          <option value="">select</option>
          <option value="LessThan">≤</option>
          <option value="GreaterThan">≥</option>
          <option value="EqualTo">=</option>
        </Select>
      );
      return (
        <>
          <div
            style={{
              padding: 8,
            }}
          >
            <Space direction="vertical">
              <InputNumber
                defaultValue={0}
                ref={numericalComparing}
                addonAfter={selectAfter}
                value={numericalComparing?.current?.value}
                onPressEnter={() =>
                  handleSearchNumber(selectedKeys, confirm, dataIndex)
                }
                onChange={(e) => {
                  numericalComparing.current = e;
                  console.log(numericalComparing);
                  // setZeroData(0)
                  setSelectedKeys(
                    myInputNumber?.current === "LessThan"
                      ? orderDataSource.filter(
                          (field) =>
                            field?.orderid <= numericalComparing?.current
                        )
                      : myInputNumber?.current === "GreaterThan"
                      ? orderDataSource.filter(
                          (field) =>
                            field?.orderid >= numericalComparing?.current
                        )
                      : myInputNumber?.current === "EqualTo"
                      ? orderDataSource.filter(
                          (field) =>
                            field?.orderid === numericalComparing?.current
                        )
                      : numericalComparing === null
                      ? null
                      : null
                  );
                  console.log(selectedKeys);
                }}
              />
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={(e) => {
                    handleSearchNumber(selectedKeys, confirm, dataIndex);
                  }}
                >
                  Filter
                </Button>
                <Button
                  onClick={() => {
                    clearFilters && handleResetting(clearFilters);
                  }}
                  size="small"
                  style={{
                    width: 90,
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={{
                    width: 110,
                  }}
                  onClick={() => {
                    confirm({
                      closeDropdown: true,
                    });
                  }}
                >
                  close
                </Button>
              </Space>
            </Space>
          </div>
        </>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      return record?.orderid === value?.orderid;
    },
    onFilterDropdownVisibleChange: (visible) => {
      console.log(visible);
      if (visible) {
        setTimeout(() => numericalComparing.current?.select(), 100);
      }
    },
  });
  ///column dates
  const handleDates = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const getColumnsDate = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => {
      const changingDate = (date, dateString) => {
        setSelectedKeys(
          dateString !== ""
            ? orderDataSource.filter(
                (field) =>
                  field?.orderdate.substr(0, 10) >= dateString[0] &&
                  field?.orderdate.substr(0, 10) <= dateString[1]
              )
            : null
        );
      };
      return (
        <>
          <div
            style={{
              padding: 8,
            }}
          >
            <Space direction="horizontal">
              <RangePicker onChange={changingDate} />
            </Space>
            <Space>
              <Button
                type="link"
                size="small"
                onClick={(e) => {
                  handleDates(selectedKeys, confirm, dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        </>
      );
    },
    filterIcon: (filtered) => (
      <CalendarOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      return record?.orderdate.substr(0, 10) === value?.orderdate.substr(0, 10);
    },
    onFilterDropdownVisibleChange: (visible) => {
      console.log(visible);
    },
  });
  ///destructure order shipments
  const columns = [
    {
      key: "1",
      title: "Order#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "orderid",
      sorter: (a, b) => a.orderid - b.orderid,
      align: "left",
      render: (_, record) =>
        // <Typography.Text>{record?.orderid}</Typography.Text>
        record?.orderid,
      ...getColumnsNumber("orderid"),
    },
    {
      key: "2",
      title: "Customer Order#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "custorderid",
      align: "left",
      sorter: (a, b) => a.custorderid.length - b.custorderid.length,
      render: (_, record) => record?.custorderid,
      showOnResponse: true,
      ...getColumnSearchProps("custorderid"),
    },
    {
      key: "3",
      title: "Order Status",
      dataKey: "orderstatus",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      sorter: (a, b) => a.orderstatus.length - b.orderstatus.length,
      render: (_, record) => (
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
          {record?.orderstatus}
        </Tag>
      ),
      // render: (_, record) => (
      //   <div>
      //     {orderIds.includes(record?.orderid) ? (
      //       <Tag color="yellow">Cancelled</Tag>
      //     ) : (
      //       <Tag
      //         color={
      //           record.orderstatus === "NEW"
      //             ? "blue"
      //             : record.orderstatus === "Open"
      //             ? "green"
      //             : record.orderstatus === "Cancel"
      //             ? "yellow"
      //             : null
      //         }
      //       >
      //         {record?.orderstatus}
      //       </Tag>
      //     )}
      //   </div>
      // ),
      filters: [
        {
          text: "NEW",
          value: "NEW",
        },
        {
          text: "OPEN",
          value: "Open",
        },
        {
          text: "Cancel",
          value: "Cancel",
        },
      ],
      onFilter: (value, record) => record.orderstatus.includes(value),
    },
    {
      key: "4",
      title: "Customer Name",
      dataKey: "shipcustomername",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      sorter: (a, b) => a.shipcustomername?.length - b.shipcustomername?.length,
      render: (_, record) => record?.shipcustomername,
      hidden: false,
      ...getColumnSearchProps("shipcustomername"),
    },
    {
      key: "5",
      title: "City",
      dataKey: "shipcity",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataIndex: "shipcity",
      sorter: (a, b) => a.shipcity - b.shipstate,
      render: (_, record) => record?.shipcity,
      ...getColumnSearchProps("shipcity"),
    },
    {
      key: "6",
      title: "State",
      dataKey: "shipstate",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataIndex: "shipstate",
      sorter: (a, b) => a.shipstate - b.shipstate,
      render: (_, record) => record?.shipstate,
      ...getColumnSearchProps("shipstate"),
    },
    {
      key: "7",
      title: "Order Creation Date",
      dataKey: "orderdate",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      sorter: (a, b) => a.orderdate - b.orderdate,
      render: (_, record) => record?.orderdate.substr(0, 10),
      ...getColumnsDate("orderdate"),
    },
    {
      key: "8",
      title: "Ship Cost",
      dataKey: "ordershipcost",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      sorter: (a, b) => a.ordershipcost - b.ordershipcost,
      render: (_, record) => record?.ordershipcost,
    },
    {
      key: "9",
      dataKey: "whid",
      title: "Warehouse#",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      sorter: (a, b) => a.whid - b.whid,
      render: (_, record) => record?.whid,
    },
    {
      key: "10",
      title: "Action",
      // dataKey: "action",
      width: 100,
      hidden: false,
      render: (_, record) => (
        <div>
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
        </div>
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
  const handlePrint = () => {
    const doc = new jsPDF("l", "pt", "a4");
    doc.text("SKU Details", 38, 50);
    const MyGreatValues = filterColumns?.filter((value) => value.key != 10);
    doc.autoTable(
      // filterColumns.map((col) => ({ ...col, dataKey: col.dataKey })),
      filterColumns.filter((value) => {
        return value?.key == 10;
      })
        ? MyGreatValues.map((col) => ({ ...col, dataKey: col.dataKey }))
        : null,
      shippingColumn,
      {
        startY: 60,
      }
    );
    doc.save();
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
              City
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="6" style={{ marginBottom: "7px" }}>
              State
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="7" style={{ marginBottom: "7px" }}>
              Order Creation Date
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="8" style={{ marginBottom: "7px" }}>
              Ship Cost
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="9" style={{ marginBottom: "7px" }}>
              Warehouse#
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="10" disabled style={{ marginBottom: "7px" }}>
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
  console.log(filterColumns?.filter((value) => value.key != 10));
  const handleClick = () => {
    alert("excel");
    const MyGreatValues = filterColumns?.filter((value) => value.key != 10);
    console.log(MyGreatValues);
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(
        filterColumns.filter((value) => {
          return value?.key == 10;
        })
          ? MyGreatValues
          : null
      )
      .addDataSource(shippingColumn, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
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
                    // filteredTable?.length > 0 ? filteredTable : orderDataSource
                    filteredTable?.length > 0 ? filteredTable : shippingColumn
                  }
                  size="small"
                  title={() => (
                    <>
                      {orderDataSource?.length > 0 ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <PdfIcon
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={handlePrint}
                            />
                            <FileExcelIcon
                              style={{ color: "green", cursor: "pointer" }}
                              onClick={handleClick}
                            />
                          </div>
                          <div>
                            <AutoComplete
                              style={{
                                width: "10em",
                                marginRight: "10px",
                              }}
                              enterButton="search"
                              onSearch={search}
                              placeholder="Search by ...."
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
                      ) : null}
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
// export default connect()(ECommerceDashboard);
export default React.memo(ECommerceDashboard);
