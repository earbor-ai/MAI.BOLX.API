import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import {
  Switch,
  Spin,
  Space,
  Table,
  Typography,
  Select,
  Input,
  AutoComplete,
  Tag,
  Button,
  Form,
  InputNumber,
  ConfigProvider,
  Dropdown,
  Menu,
  Checkbox,
  Row,
  Slider,
} from "antd";
import SearchIcon from "mdi-react/SearchIcon";
import AddIcon from "mdi-react/AddIcon";
import axios from "axios";
import { Excel, Pdf } from "antd-table-saveas-excel";
// import { Pdf } from "antd-table-saveas-pdf";
import PdfIcon from "mdi-react/PdfIcon";
import FileExcelIcon from "mdi-react/MicrosoftExcelIcon";
import {
  Card,
  CardBody,
  Col,
  ButtonToolbar,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import SweetAlert from "react-bootstrap-sweetalert";
import { AvForm, AvField, AvFeedback } from "availity-reactstrap-validation";
import { Link, Router } from "react-router-dom";
import Cookies from "universal-cookie";
import "antd/dist/antd.css";
import { set } from "react-hook-form";
import {
  DollarCircleOutlined,
  UserOutlined,
  FullscreenOutlined,
  SettingOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";

const { Option } = Select;

const ABTestingAnalytics = ({ dir, themeName }) => {
  const [form] = Form.useForm();
  const [allskuData, setAllSkuData] = useState();
  const [tableSkuData, setTableSkuData] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [clientValue, setClientValue] = useState("");
  const [formErr, setFormErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [added, setAdded] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [MyfilterTable, setMyfilterTable] = useState();
  const [myLoading, setMyLoading] = useState(false);
  const [emptyData, setEmptyData] = useState();
  const [latestData, setLatestData] = useState({});
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [selectLoading, setSelectLoading] = useState(false);
  const [myButton, setMyButton] = useState(false);
  const [filterColumns, setFilteredColumns] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const numericalComparing = useRef(null);
  const [filteredInfo, setFilteredInfo] = useState({});
  // const [numericalComparing, setNumericalComparing] = useState(null);
  const searchInputNumber = useRef(null);
  // const [myInputNumber, setMyInputNumber] = useState({
  //   Symbol: "",
  // });
  const myInputNumber = useRef("");
  const [getTheValue, setGetTheValue] = useState(null);
  const [skuData, setSkuData] = useState({
    alternateitemcode: null,
    alternateitemdescription: null,
    clientId: "",
    cyclemonths: null,
    description: "",
    entryDate: "2022-07-07T12:53:41.46",
    entryuserId: 1002,
    expDays: 365,
    expyears: null,
    gtin: null,
    hazmat: null,
    hsnCode: null,
    imageurl: null,
    isExpDate: false,
    isSerialNo: false,
    iscyclecount: false,
    ishazmat: false,
    iskititem: false,
    islotCode: false,
    isoversize: false,
    itemType: "",
    itemcategory: null,
    manufacturervendor: null,
    maxorderQty: null,
    minorderQty: null,
    modifiedDate: "2022-07-07T12:53:41.46",
    modifiedUserId: 1002,
    mpnCode: null,
    originid: null,
    purchasecost: 0,
    reorderPoint: 0,
    safetystock: null,
    sellcost: null,
    sku1: "",
    status: "",
    storagetype: null,
    subitemcategory: null,
    uom: "",
    weight: 0,
  });
  const [Purchase, setPurchase] = useState();
  const [d, setD] = useState({
    alternateitemcode: null,
    alternateitemdescription: null,
    cyclemonths: null,
    entryDate: "2022-07-07T12:53:41.46",
    entryuserId: 1002,
    expDays: 365,
    expyears: null,
    gtin: null,
    hazmat: null,
    hsnCode: null,
    imageurl: null,
    isExpDate: false,
    isSerialNo: false,
    iscyclecount: false,
    ishazmat: false,
    islotCode: false,
    isoversize: false,
    itemcategory: null,
    manufacturervendor: null,
    maxorderQty: null,
    minorderQty: null,
    modifiedDate: "2022-07-07T12:53:41.46",
    modifiedUserId: 1002,
    mpnCode: null,
    originid: null,
    reorderPoint: 0,
    safetystock: null,
    sellcost: null,
    storagetype: null,
    subitemcategory: null,
    clientId: `${1029}`,
  });
  const [defaultValue, setDefaultValues] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    // "7",
    // "8",
    // "9",
  ]);
  const token =
    "eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImV4cCI6IjE2NTc2OTY1NDIiLCJuYmYiOiIxNjU3NjEwMTQyIn0";

    // const tok=document.cookie('')
  const handleSku = (e) => {
    const { name, value } = e.target;
    setSkuData((state) => ({
      ...state,
      [name]: value,
      clientId: clientValue,
    }));
  };
  // to get dataSource
  useEffect(() => {
    setShowTable(true);
    const accessToken = token;
    // const api = `http://216.230.74.17:7039/api/Sku?clientId=${value}`;
    const api = `https://localhost:7039/api/Sku?clientId=${1029}`;
    setMyLoading(true);
    setSelectLoading(true);
    axios
      .get(api, {
        headers: { Authorization: `Bearer ${accessToken}` },
        Accept: "*/*",
      })
      .then((res) => {
        setSkeletonLoading(false);
        setAllSkuData(res?.data);
        setTableSkuData(res?.data);
        setMyLoading(false);
        setSelectLoading(false);
      })
      .catch((error) => error.message);
  }, [added]);

  const onSelect = (value) => {
    setClientValue(value);
  };

  const clickToShow = () => {
    setShowTable(true);
  };

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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      console.log(visible);
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const handleResetting = (clearFilters) => {
    clearFilters();
    numericalComparing.current.value = 0;
  };
  const handleSearchNumber = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // numericalComparing.current.value = 0;
  };

  console.log(numericalComparing);
  console.log(myInputNumber);
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
                ? tableSkuData.filter(
                    (field) =>
                      field?.weight <= numericalComparing?.current.value
                  )
                : myInputNumber?.current === "GreaterThan" &&
                  numericalComparing.current.value !== null
                ? tableSkuData.filter(
                    (field) =>
                      field?.weight >= numericalComparing?.current.value
                  )
                : myInputNumber?.current === "EqualTo" &&
                  numericalComparing.current.value !== null
                ? tableSkuData.filter(
                    (field) =>
                      field?.weight == numericalComparing?.current.value
                  )
                : null
            );
          }}
          onChange={(e) => {
            console.log(`changeSelect ${e}`);
            // myInputNumber.current = e;
            console.log(selectedKeys);
          }}
        >
          <Option value="">select</Option>
          <Option value="LessThan">≤</Option>
          <Option value="GreaterThan">≥</Option>
          <Option value="EqualTo">=</Option>
        </Select>
      );
      return (
        <>
          <div
            style={{
              padding: 8,
              // display:'flex'
            }}
          >
            <Space direction="vertical">
              <InputNumber
                // value={numericalComparing}
                defaultValue={null}
                ref={numericalComparing}
                value={numericalComparing?.current}
                addonAfter={selectAfter}
                onPressEnter={() =>
                  handleSearchNumber(selectedKeys, confirm, dataIndex)
                }
                onChange={(e) => {
                  numericalComparing.current = e;
                  console.log(numericalComparing);
                  setSelectedKeys(
                    myInputNumber?.current === "LessThan"
                      ? tableSkuData.filter(
                          (field) =>
                            field?.weight <= numericalComparing?.current
                        )
                      : myInputNumber?.current === "GreaterThan"
                      ? tableSkuData.filter(
                          (field) =>
                            field?.weight >= numericalComparing?.current
                        )
                      : myInputNumber?.current === "EqualTo"
                      ? tableSkuData.filter(
                          (field) =>
                            field?.weight === numericalComparing?.current
                        )
                      : null
                  );
                  // console.log(selectedKeys);
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
                  onClick={() => clearFilters && handleResetting(clearFilters)}
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
      return record?.weight === value?.weight;
    },
    onFilterDropdownVisibleChange: (visible) => {
      console.log(visible);
      if (visible) {
        setTimeout(() => numericalComparing.current?.select(), 100);
      }
    },
  });

  useEffect(() => {
    // const api = 'http://216.230.74.17:7039/api/Client';
    const api = "https://localhost:7039/api/Client";
    axios
      .get(api, {
        Accept: "*/*",
      })
      .then((res) => {
        setClientList(res?.data);
      })
      .catch((error) => {});
  }, []);

  const columns = [
    {
      key: "1",
      title: "SKU",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "sku1",
      sorter: (a, b) => a.sku1 - b.sku1,
      ...getColumnSearchProps("sku1"),
      render: (_, record) => (
        <Link to={`/edit-sku/${record?.skuId}`}>{record?.sku1}</Link>
      ),
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
      ...getColumnSearchProps("description"),
    },
    {
      key: "3",
      title: "Status",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      render: (_, record) => (
        <Tag
          color={
            record?.status === "Active"
              ? "green"
              : record?.status === "Discontinue"
              ? "warning"
              : record?.status === "Hold"
              ? "lightgrey"
              : record?.status === "Defective"
              ? "red"
              : null
          }
        >
          {record?.status}
        </Tag>
      ),
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Hold",
          value: "Hold",
        },
        {
          text: "Discontinue",
          value: "Discontinue",
        },
        {
          text: "Defective",
          value: "Defective",
        },
      ],
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      key: "4",
      title: "Item Type",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "itemType",
      sorter: (a, b) => a.itemType.length - b.itemType.length,
      render: (_, record) => (
        <Typography.Text>{record?.itemType}</Typography.Text>
      ),
      ...getColumnSearchProps("itemType"),
    },
    {
      key: "5",
      title: "UOM",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "uom",
      sorter: (a, b) => a.uom.length - b.uom.length,
      render: (_, record) => {
        return <Typography.Text>{record?.uom}</Typography.Text>;
      },
      ...getColumnSearchProps("uom"),
    },
    {
      key: "6",
      title: "Weight",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "weight",
      sorter: (a, b) => a.weight - b.weight,
      render: (_, record) => {
        return record?.weight;
      },
      ...getColumnsNumber("weight"),
    },
    {
      key: "7",
      title: "maxorderQty",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "maxorderQty",
      sorter: (a, b) => a.maxorderQty - b.maxorderQty,
      render: (_, record) => record?.maxorderQty,
    },
    {
      key: "8",
      title: "minorderQty",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "minorderQty",
      sorter: (a, b) => a.minorderQty - b.minorderQty,
      render: (_, record) => record?.minorderQty,
    },
    {
      key: "9",
      title: "purchasecost",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "purchasecost",
      sorter: (a, b) => a.purchasecost - b.purchasecost,
      render: (_, record) => record?.purchasecost,
    },
    {
      key: "10",
      title: "iskititem",
      responsive: ["xs", "sm", "md", "lg"],
      align: "left",
      dataKey: "iskititem",
      sorter: (a, b) => a.iskititem - b.iskititem,
      render: (_, record) => record?.iskititem,
      ...getColumnSearchProps("maxorderQty"),
    },
  ].filter((item) => !item.hidden);
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
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
  }, [tableSkuData, defaultValue]);
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
    const filterTable = tableSkuData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setMyfilterTable(filterTable);
  };
  const onFinish = (values) => {
    Object.assign(d, values);
    const authToken = token;
    setShowTable(false);
    setMyButton(true);
    axios({
      method: "POST",
      url: "https://localhost:7039/api/Sku",
      // url: "http://216.230.74.17:8013/api/Sku",
      data: d,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setAdded(response.data);
        setSuccessModal(true);
        setShowTable(true);
        setMyButton(false);
        form.resetFields();
        setSkuData({
          alternateitemcode: null,
          alternateitemdescription: null,
          clientId: "",
          cyclemonths: null,
          description: "",
          entryDate: "2022-07-07T12:53:41.46",
          entryuserId: 1002,
          expDays: 365,
          expyears: null,
          gtin: null,
          hazmat: null,
          hsnCode: null,
          imageurl: null,
          isExpDate: false,
          isSerialNo: false,
          iscyclecount: false,
          ishazmat: false,
          iskititem: false,
          islotCode: false,
          isoversize: false,
          itemType: "",
          itemcategory: null,
          manufacturervendor: null,
          maxorderQty: null,
          minorderQty: null,
          modifiedDate: "2022-07-07T12:53:41.46",
          modifiedUserId: 1002,
          mpnCode: null,
          originid: null,
          purchasecost: 0,
          reorderPoint: 0,
          safetystock: null,
          sellcost: null,
          sku1: "",
          status: "",
          storagetype: null,
          subitemcategory: null,
          uom: "",
          weight: 0,
        });
        setMyLoading(false);
      })
      .catch((error) => {
        setShowTable(true);
        setMyButton(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleClick = () => {
    alert("excel");
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(filterColumns)
      .addDataSource(tableSkuData, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };
  const PdfClick = () => {
    const doc = new jsPDF("l", "pt", "a4");
    doc.text("SKU Details", 38, 50);
    doc.autoTable(
      filterColumns.map((col) => ({ ...col, dataKey: col.dataKey })),
      tableSkuData,
      {
        startY: 60,
      }
    );
    doc.save();
  };
  const gettingValues = (mainChanges) => {
    console.log(mainChanges);
  };
  const hidingChange = (checkedValues) => {
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
          onChange={(event) => hidingChange(event)}
        >
          <Col span={8}>
            <Checkbox disabled value="1" style={{ marginBottom: "7px" }}>
              sku1
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="2" disabled style={{ marginBottom: "7px" }}>
              description
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="3" style={{ marginBottom: "7px" }}>
              status
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="4" style={{ marginBottom: "7px" }}>
              Item Type
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="5" style={{ marginBottom: "7px" }}>
              uom
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="6" style={{ marginBottom: "7px" }}>
              weight
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="7" style={{ marginBottom: "7px" }}>
              maxorderQty
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="8" style={{ marginBottom: "7px" }}>
              minorderQty
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="9" style={{ marginBottom: "7px" }}>
              Purchase Cost
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox value="10" style={{ marginBottom: "7px" }}>
              iskititem
            </Checkbox>
          </Col>
        </Checkbox.Group>
      </Menu.Item>
    </Menu>
  );
  return (
    <Col
      sm={12}
      md={12}
      lg={12}
      xl={12}
      style={{ paddingRight: "0px", paddingLeft: "0px" }}
    >
      {successModal ? (
        <SweetAlert
          title="Success"
          success
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setSuccessModal(false);
            setShowTable(true);
            setEmptyData("Select a Person...");
          }}
          onCancel={() => {
            setSuccessModal(false);
          }}
        >
          SKU Added Successfully
        </SweetAlert>
      ) : null}
      <Card style={{ minHeight: "500px" }}>
        <CardBody className="tabs tabs--bordered-top">
          <Col sm={12} md={12} lg={12} xl={12}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => toggle("1")}
                >
                  <SearchIcon />
                  Search
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => toggle("2")}
                >
                  <AddIcon />
                  Add SKU
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ paddingRight: "0px", paddingLeft: "0px" }}
                >
                  <div
                    className="table__header"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {myLoading ? null : (
                      <>
                        <Col
                          sm={4}
                          lg={6}
                          md={4}
                          xs={4}
                          xl={6}
                          style={{ paddingRight: "0px", paddingLeft: "0px" }}
                        >
                          <div>
                            <PdfIcon
                              style={{
                                color: "red",
                                cursor: "pointer",
                                paddingRight: "3px",
                              }}
                              onClick={PdfClick}
                            />
                            <FileExcelIcon
                              style={{ color: "green", cursor: "pointer" }}
                              onClick={handleClick}
                            />
                          </div>
                        </Col>
                        <Col
                          sm={8}
                          lg={6}
                          md={8}
                          xs={8}
                          xl={6}
                          style={{ paddingRight: "0px", paddingLeft: "0px" }}
                        >
                          <div
                            className="d-flex"
                            style={{
                              display: "flex",
                              justifyContent: "right",
                              margin: "0px",
                            }}
                          >
                            <AutoComplete
                              style={{
                                width: "18em",
                                paddingRight: "6px",
                                // paddingLeft: "2px",
                              }}
                              placeholder="Search by..."
                              enterButton
                              onSearch={search}
                              // size="medium"
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
                        </Col>
                      </>
                    )}
                  </div>
                  <Table
                    columns={filterColumns}
                    bordered
                    scroll={{ x: true }}
                    dataSource={
                      MyfilterTable == null ? tableSkuData : MyfilterTable
                    }
                    sortDirections={["descend", "ascend"]}
                    size="small"
                    pagination={{
                      defaultPageSize: 50,
                      showSizeChanger: true,
                      pageSizeOptions: ["50"],
                    }}
                    style={{ marginTop: "9px" }}
                    stripes="even"
                    loading={myLoading}
                  />
                </Col>
              </TabPane>
              <TabPane tabId="2">
                <Col sm={12} md={12} lg={12} xl={12}>
                  <Form
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 10,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={(values) => onFinish(values)}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                    onChange={gettingValues}
                  >
                    <Col sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label=" SKU/ITEM Code:"
                        name="sku1"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input
                          // onChange={ChangingValidation}
                          placeholder="Enter SKU/ITEM Code"
                        />
                      </Form.Item>
                      <Form.Item
                        label=" Description:"
                        name="description"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Description!",
                          },
                        ]}
                        value={skuData?.description}
                      >
                        <Input
                          // onChange={ChangingValidation}
                          placeholder="Enter Description"
                          onInput={(e) => {
                            e.target.value =
                              e.target.value.charAt(0).toUpperCase() +
                              e.target.value.slice(1);
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Item Type:"
                        name="itemType"
                        rules={[
                          {
                            required: true,
                            message: "Please Select itemType!",
                          },
                        ]}
                        value={skuData?.itemType}
                      >
                        <Select
                          placeholder="Select Item/Type"
                          optionFilterProp="children"
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          style={{ width: "100%", marginBottom: "0px" }}
                        >
                          <option value="">Select Item Type</option>
                          <option value="Item">Item</option>
                          <option value="Prebuild KIT">Prebuild KIT</option>
                          <option value="Dynamic KIT">Dynamic KIT</option>
                          <option value="Non Inventory Item">
                            Non Inventory Item
                          </option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Weight:"
                        type="text"
                        name="weight"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Your Weight",
                            pattern: "^[0-9.]*$",
                          },
                        ]}
                        // value={skuData?.weight}
                        value={skuData?.weight}
                      >
                        <Input
                          // onChange={ChangingValidation}
                          addonBefore="Ibs"
                          placeholder="Enter Weight"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Primary UOM:"
                        name="uom"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Your Uom!",
                          },
                        ]}
                        value={skuData?.uom}
                      >
                        <Select
                          placeholder="Select Uom"
                          optionFilterProp="children"
                          // onSearch={onSearch}
                          value={skuData?.uom}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          style={{ width: "100%", marginBottom: "0px" }}
                        >
                          <option value="">Select UOM</option>
                          <option value="UNIT">UNIT</option>
                          <option value="CASE">CASE</option>
                          <option value="PACK">PACK</option>
                          <option value="LPN">LPN</option>
                          <option value="OTHER">OTHER</option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="Purchase Cost"
                        // type="text"
                        name="purchasecost"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Your Purchase cost",
                            pattern: "^[0-9.]*$",
                          },
                        ]}
                        value={skuData?.purchasecost}
                      >
                        <Input
                          type="text"
                          addonBefore="$"
                          placeholder="Enter Purchase cost"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Status:"
                        name="status"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Your Status!",
                          },
                        ]}
                        value={skuData?.status}
                      >
                        <Select
                          placeholder="Select Status"
                          optionFilterProp="children"
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          style={{ width: "100%", marginBottom: "0px" }}
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Defective">Inactive</option>
                          <option value="Hold">Hold</option>
                          <option value="Discontinue">Discontinue</option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        label="kit Item"
                        name="iskititem"
                        value={skuData?.iskititem}
                        valuePropName="checked"
                      >
                        <Switch />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16,
                        }}
                      >
                        {myButton ? (
                          <>
                            <Button
                              type="primary"
                              htmlType="submit"
                              shape="round"
                              disabled
                            >
                              Submitting...
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              type="primary"
                              htmlType="submit"
                              shape="round"
                              style={{
                                backgroundColor: "#20c997",
                                borderColor: "#20c997",
                              }}
                            >
                              Submit
                            </Button>
                          </>
                        )}
                      </Form.Item>
                    </Col>
                  </Form>
                </Col>
              </TabPane>
            </TabContent>
          </Col>
        </CardBody>
      </Card>
    </Col>
  );
};
ABTestingAnalytics.propTypes = {
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};
// export default connect((state) => ({ themeName: state.theme.className }))(
//   ABTestingAnalytics
// );
export default React.memo(ABTestingAnalytics);
