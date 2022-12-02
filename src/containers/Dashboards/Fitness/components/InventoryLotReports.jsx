import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Col, Card, CardBody, Row, Label, Container } from "reactstrap";
import { Button, Select, Input, message, Typography, Table, Space, Spin,DatePicker, InputNumber } from "antd";
import { SearchOutlined, CloseOutlined, CalendarOutlined} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const InventoryLotReports = () => {
  const [clients, setClients] = useState();
  const [lotReports, setLotReports] = useState();
  const [skuLoading, setSkuLoading] = useState(false);
  const [lot, setLot] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const numericalComparing = useRef(null);
  const myInputNumber = useRef("");
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

  //filters
  //filter string
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
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
// filter dates
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
          ? lotReports.filter(
              (field) =>
                field?.lotexp.substr(0, 10) >= dateString[0] &&
                field?.lotexp.substr(0, 10) <= dateString[1]
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
    return record?.lotexp.substr(0, 10) === value?.lotexp.substr(0, 10);
  },
  onFilterDropdownVisibleChange: (visible) => {
    console.log(visible);
  },
});

//filter numbers
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
              ? lotReports.filter(
                  (field) =>
                    field?.availbleQuantity <= numericalComparing?.current.value
                )
              : myInputNumber?.current === "GreaterThan" &&
                numericalComparing.current.value !== null
              ? lotReports.filter(
                  (field) =>
                    field?.availbleQuantity >= numericalComparing?.current.value
                )
              : myInputNumber?.current === "EqualTo" &&
                numericalComparing.current.value !== null
              ? lotReports.filter(
                  (field) =>
                    field?.availbleQuantity == numericalComparing?.current.value
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
                    ? lotReports.filter(
                        (field) =>
                          field?.availbleQuantity <= numericalComparing?.current
                      )
                    : myInputNumber?.current === "GreaterThan"
                    ? lotReports.filter(
                        (field) =>
                          field?.availbleQuantity >= numericalComparing?.current
                      )
                    : myInputNumber?.current === "EqualTo"
                    ? lotReports.filter(
                        (field) =>
                          field?.availbleQuantity === numericalComparing?.current
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
    return record?.availbleQuantity === value?.availbleQuantity;
  },
  onFilterDropdownVisibleChange: (visible) => {
    console.log(visible);
    if (visible) {
      setTimeout(() => numericalComparing.current?.select(), 100);
    }
  },
});
  const columns = [
    {
      key: "1",
      title: "SKU#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "sku",
      align: "left",
      sorter: (a, b) => a.sku - b.sku,
      render: (_, record) => <Typography.Text>{record?.sku}</Typography.Text>,
      ...getColumnSearchProps("sku")
    },
    {
      key: "2",
      title: "DESCRIPTION",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "description",
      align: "left",
      sorter: (a, b) => a.description - b.description,
      render: (_, record) => (
        <Typography.Text>{record?.description}</Typography.Text>
      ),
      showOnResponse: true,
      ...getColumnSearchProps("description")
    },
    {
      key: "3",
      title: "Lot Code",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "lotcode",
      align: "left",
      sorter: (a, b) => a.lotcode - b.lotcode,
      render: (_, record) => (
        <Typography.Text>{record?.lotcode}</Typography.Text>
      ),
      showOnResponse: true,
      ...getColumnSearchProps("lotcode")
    },
    {
      key: "4",
      title: "Exp Date",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      dataKey: "lotexp",
      align: "left",
      sorter: (a, b) => a.lotexp - b.lotexp,
      render: (_, record) => (
        <Typography.Text>{record?.lotexp?.substr(0, 10)}</Typography.Text>
      ),
      showOnResponse: true,
      ...getColumnsDate("lotexp")
    },
    {
      key: "5",
      title: "Available Quantity",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "availbleQuantity",
      align: "left",
      sorter: (a, b) => a.availbleQuantity - b.availbleQuantity,
      render: (_, record) => (
        <Typography.Text>{record?.availbleQuantity}</Typography.Text>
      ),
      showOnResponse: true,
      ...getColumnsNumber("availbleQuantity")
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
      sorter: (a, b) => a.onHand - b.onHand,
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
