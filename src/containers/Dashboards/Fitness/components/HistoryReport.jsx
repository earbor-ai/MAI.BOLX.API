import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Col, Card, CardBody, Row, Label, Container } from "reactstrap";
import { Select, DatePicker, Button, Table, Typography, message, Input, Space, InputNumber } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const HistoryReport = () => {
  const [mySKus, setMySKus] = useState();
  const [skuLoading, setSkuLoading] = useState(false);
  const [sku, setSku] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tableData, setTableData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [showError, setShowError] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const numericalComparing = useRef(null);
  const myInputNumber = useRef("");
  const token = localStorage.getItem("myToken");
  const id = localStorage.getItem("clientId");
  useEffect(() => {
    setSkuLoading(true);
    const accessToken = token;
    const skuApi = `http://216.230.74.17:8013/api/Sku?clientId=${id}`;
    axios
      .get(skuApi, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setMySKus(res?.data?.data);
        console.log(res?.data?.data);
        setSkuLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Start Date and End Date is required",
    });
  };

  const onChange = (value) => {
    setSku(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const startDateChange = (date, dateString) => {
    setStartDate(dateString);
  };
  const endDateChange = (date, dateString) => {
    setEndDate(dateString);
  };

  const onCancel = () => {
    setCancel(true);
    setEndDate(null);
    setSku(null);
    setStartDate(null);
  };

  const reportSearch = () => {
    if (startDate && endDate) {
      setButtonLoading(true);
      const postData = {
        clientid: id,
        skuid: sku,
        sdate: startDate,
        edate: endDate,
      };

      axios({
        method: "POST",
        url: "http://216.230.74.17:8013/api/InventoryReport/GetConsolidatedHistoryReports",
        data: postData,
        headers: {
          accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data.data);
          setTableData(response.data.data);
          setButtonLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setShowError(true);
    }
  };

  //filters
  ///filter for string

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    <div
           style={{
             padding: 8,
           }}
         >
    <Input
             ref={searchInput}
             placeholder={`Search ${dataIndex}`}
             value={selectedKeys[0]}
             onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
             onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
             style={{
               marginBottom: 8,
               display: 'block',
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
                 close();
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
             color: filtered ? '#1890ff' : undefined,
           }}
         />
       ),
     onFilter: (value, record) =>
         record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
     onFilterDropdownOpenChange: (visible) => {
         if (visible) {
           setTimeout(() => searchInput.current?.select(), 100);
         }
       },
   });
   

//filters
//filter column number 
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
              ? tableData.filter(
                  (field) =>
                    field?.qachange <= numericalComparing?.current.value
                )
              : myInputNumber?.current === "GreaterThan" &&
                numericalComparing.current.value !== null
              ? tableData.filter(
                  (field) =>
                    field?.qachange >= numericalComparing?.current.value
                )
              : myInputNumber?.current === "EqualTo" &&
                numericalComparing.current.value !== null
              ? tableData.filter(
                  (field) =>
                    field?.qachange== numericalComparing?.current.value
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
                    ?tableData.filter(
                        (field) =>
                          field?.qachange <= numericalComparing?.current
                      )
                    : myInputNumber?.current === "GreaterThan"
                    ? tableData.filter(
                        (field) =>
                          field?.qachange >= numericalComparing?.current
                      )
                    : myInputNumber?.current === "EqualTo"
                    ? tableData.filter(
                        (field) =>
                          field?.qachange === numericalComparing?.current
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
    return record?.qachange === value?.qachange;
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
      dataKey: "skuid",
      align: "left",
      sorter: (a, b) => a.skuid - b.skuid,
      render: (_, record) => <Typography.Text>{record?.skuid}</Typography.Text>,
      ...getColumnSearchProps('skuid'),
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
      ...getColumnSearchProps('description'),
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
      ...getColumnSearchProps('lotcode'),

    },
    {
      key: "4",
      title: "Date",
      responsive: ["xs", "sm", "md", "lg", "xl"],
      dataKey: "date",
      align: "left",
      sorter: (a, b) => a.date - b.date,
      render: (_, record) => <Typography.Text>{record?.date}</Typography.Text>,
      showOnResponse: true,
      // ...getColumnSearchProps('skuid'),

    },
    {
      key: "5",
      title: "Transaction",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "transaction",
      align: "left",
      sorter: (a, b) => a.transaction - b.transaction,
      render: (_, record) => (
        <Typography.Text>{record?.transaction}</Typography.Text>
      ),
      showOnResponse: true,
      ...getColumnSearchProps('transaction'),

    },
    {
      key: "6",
      title: "Ref#",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "refnumber",
      align: "left",
      sorter: (a, b) => a.refnumber - b.refnumber,
      render: (_, record) => (
        <Typography.Text>{record?.refnumber}</Typography.Text>
      ),
      showOnResponse: true,
      ...getColumnSearchProps('refnumber'),

    },
    {
      key: "7",
      title: "Quantity Change",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "qachange",
      align: "left",
      sorter: (a, b) => a.qachange - b.qachange,
      render: (_, record) => (
        <Typography.Text>{record?.qachange}</Typography.Text>
      ),
      showOnResponse: true,
      ...getColumnsNumber('qachange'),

    },
    {
      key: "8",
      title: "Inventory",
      responsive: ["xs", "sm", "md", "lg"],
      dataKey: "inventory",
      align: "left",
      sorter: (a, b) => a.inventory - b.inventory,
      render: (_, record) => (
        <Typography.Text>{record?.inventory}</Typography.Text>
      ),
      showOnResponse: true,
      // ...getColumnSearchProps('inventory'),

    },
  ];

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
            <h4>History Reports</h4>
            <p>History Reports / Inventory Reports</p>
          </div>
          <Card style={{ minHeight: "300px" }}>
            <CardBody>
              <Row>
                <Col className="mb-3 col-lg-3 col-xs-12">
                  <Label>Select SKU:</Label>
                  <Select
                    showSearch
                    placeholder="Select a SKU"
                    optionFilterProp="children"
                    onChange={onChange}
                    scroll={{ x: true }}
                    onSearch={onSearch}
                    loading={skuLoading}
                    allowClear
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: "100%" }}
                  >
                    {mySKus?.map((ourskus) => {
                      return (
                        <option value={ourskus?.skuid}>{ourskus?.sku1}</option>
                      );
                    })}
                  </Select>
                </Col>
                <Col className="mb-3 col-lg-3 col-xs-12">
                  <Label>
                    Start Date: <span style={{ color: "red" }}>*</span>
                  </Label>
                  <DatePicker
                    onChange={startDateChange}
                    style={{ width: "100%" }}
                    format="MM/DD/YYYY"
                  />
                </Col>
                <Col className="mb-3 col-lg-3 col-xs-12">
                  <Label>
                    End Date: <span style={{ color: "red" }}>*</span>
                  </Label>
                  <DatePicker
                    onChange={endDateChange}
                    style={{ width: "100%" }}
                    format="MM/DD/YYYY"
                  />
                </Col>
                <Col className="mt-4 col-lg-3 col-xs-12">
                  {!startDate || !endDate ? (
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      style={{ marginRight: "10px" }}
                      onClick={warning}
                    >
                      Search
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      style={{ marginRight: "10px" }}
                      onClick={reportSearch}
                      loading={buttonLoading}
                    >
                      {buttonLoading ? <>Please Wait</> : <>Search</>}
                    </Button>
                  )}

                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    style={{ background: "#ffcd05", borderColor: "#ebe00b" }}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col sm={12} lg={12} md={12} xs={6} xl={12}>
                  {tableData?.length > 0 ? (
                    <Table
                      columns={columns}
                      dataSource={tableData ? tableData : null}
                      rowClassName={(record, index) =>
                        record?.description?.length > 0
                          ? "table-row-dark"
                          : "table-row-light"
                      }
                      bordered
                      size="small"
                      pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "30", "50", "100"],
                      }}
                      style={{ marginTop: "15px", overflowX: "auto" }}
                      stripes="even"
                    />
                  ) : null}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HistoryReport;