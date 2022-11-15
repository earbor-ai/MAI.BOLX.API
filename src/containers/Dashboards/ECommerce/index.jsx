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
} from "@ant-design/icons";
import ViewModal from "./components/ViewModal";
import useGetReq from "../../../customHooks/useGetReq";

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
  const [getData, cancelRequests] = useGetReq();
  const [excelVal, setExcelVal] = useState([]);
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getData(
      "https://localhost:7039/api/Order?clientId=1029",
      setOrderDataSource
    );

    return cancelRequests;
  }, []);

  const info = (e, id) => {
    Modal.info({
      content: <ViewModal id={id} />,
      onOk() {},
      width: "1000px",
      keyboard: true,
      loading: true,
    });
  };

  // useEffect(() => {
  //   const api = "https://localhost:7039/api/Order?clientId=1029";
  //   axios
  //     .get(api, {
  //       Accept: "*/*",
  //     })
  //     .then((res) => {
  //       setOrderDataSource(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleCancel = (id) => {
    setOrderIds([...orderIds, id]);
    setCancel(true);
  };

  // const handlePrint = () => {
  //   const Doc = new jsPDF();
  //   Doc.text("Orders Details", 10, 10);
  //   Doc.autoTable({
  //     columns: filterColumns.map((col) => ({ ...col, dataKey: col.render })),
  //     body: orderDataSource,
  //   });
  //   Doc.save("Orders.pdf");
  // };

  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  // };
  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText("");
  // };

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //     close,
  //   }) => (
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: "block",
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90,
  //           }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: false,
  //             });
  //             setSearchText(selectedKeys[0]);
  //             setSearchedColumn(dataIndex);
  //           }}
  //         >
  //           Filter
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: true,
  //             });
  //           }}
  //         >
  //           close
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? "#1890ff" : undefined,
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     console.log(visible);
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  // });

  const columns = [
    {
      key: "1",
      title: "Order#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "orderId",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.orderId}</Typography.Text>
      ),
    },
    {
      key: "2",
      title: "Customer Order#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "customerOrderId",
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.customerOrderId}</Typography.Text>
      ),
      showOnResponse: true,
    },
    {
      key: "3",
      title: "Order Status",
      dataKey: "orderStatus",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <>
          {orderIds.includes(record?.orderId) ? (
            <Tag color="yellow">Cancelled</Tag>
          ) : (
            <Tag
              color={
                record.orderStatus === "NEW"
                  ? "blue"
                  : record.orderStatus === "Open"
                  ? "green"
                  : null
              }
            >
              <Typography.Text>{record?.orderStatus}</Typography.Text>
            </Tag>
          )}
        </>
      ),
      sorter: (a, b) => a.orderStatus - b.orderStatus,
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
          {record?.orderShipments[0]?.shipCustomerName}
        </Typography.Text>
      ),
      hidden: false,
    },
    {
      key: "5",
      title: "City/State",
      dataKey: "shipState",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <Typography.Text>
          {record?.orderShipments[0]?.shipCity}/
          {record?.orderShipments[0]?.shipState}
        </Typography.Text>
      ),
    },
    {
      key: "6",
      title: "Order Creation Date",
      dataKey: "orderDate",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.orderDate}</Typography.Text>
      ),
      sorter: (a, b) => a.sku1?.length - b.sku1?.length,
    },
    {
      key: "7",
      title: "Ship Cost",
      dataKey: "shipCost",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      render: (_, record) => (
        <Typography.Text>{record?.shipCost}</Typography.Text>
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
          {record?.orderStatus === "Cancel" ? (
            <Space size="small">
              <Tooltip title="View">
                <EyeOutlined
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    info(e, record?.orderId);
                  }}
                />
              </Tooltip>
            </Space>
          ) : (
            <Space size="small">
              <>
                {orderIds.includes(record?.orderId) ? (
                  <Tooltip title="View">
                    <EyeOutlined
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        info(e, record?.orderId);
                      }}
                    />
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title="Edit" color="#108ee9" key="#108ee9">
                      <Link to={`/editOrder/${record?.orderId}`}>
                        <EditOutlined
                          style={{ color: "blue", cursor: "pointer" }}
                        />
                      </Link>
                    </Tooltip>
                    <Popconfirm
                      title="Sure to cancel order?"
                      onConfirm={() => handleCancel(record?.orderId)}
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

  // console.log(orderDataSource);

  const onChange = (checkedValues) => {
    setDefaultValues(checkedValues);
  };
  console.log(defaultValue);

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

  // useEffect(() => {
  //   filterColumns.map((d) => {
  //     const keys = d?.dataKey;
  //     excelVal.push(keys);
  //   });

  //   items?.forEach((e) => {
  //     Object.keys(e).forEach(
  //       (key) => excelVal.includes(key) || delete e[key]
  //     );
  //   });

  //   console.log(items);
  // }, [items, filterColumns]);
  // console.log(items);

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

  return (
    <Container className="dashboard">
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
        <Link to="/createOrder">
          <Button type="primary">
            <PlusOutlined style={{ marginTop: "-3px" }} />
            Create New Order
          </Button>
        </Link>
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
                          <Tooltip placement="bottom" title="Export to Excel">
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
                        <RangePicker style={{ marginRight: "10px" }} />
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
    </Container>
  );
};
export default connect()(ECommerceDashboard);
