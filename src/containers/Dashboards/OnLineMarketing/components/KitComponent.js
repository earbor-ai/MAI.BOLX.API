import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import {
  Table,
  Select,
  Button,
  Typography,
  Popconfirm,
  InputNumber,
  Input,
  Form,
} from "antd";
import { useParams } from "react-router";
import "antd/dist/antd.css";
import axios from "axios";
import UserIcon from "mdi-react/UserIcon";
import Cookies from "universal-cookie";
import SweetAlert from "react-bootstrap-sweetalert";
import "./KitComponent.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import ClientId from "../ClientId";

const { Option } = Select;

const KitComponent = ({ data, list }) => {
  const { SKUId } = useParams();
  const [form] = Form.useForm();
  const [mainForm] = Form.useForm();
  const [selectedValue, setSelectedValue] = useState();
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [creatingData, setCreatingData] = useState();
  const [tableData, setTableData] = useState();
  const [deletedData, setDeltedData] = useState();
  const [editedSuccess, setEditedSuccess] = useState(false);
  const [deletedSuccess, setDeletedSuccess] = useState(false);
  const [concValues, setConcValues] = useState();
  const [myButton, setMyButton] = useState(false);
  const [createData, setCreateData] = useState({
    uniqueid: 0,
    iteminclude: 0,
    entrydate: "2022-09-09T07:07:11.836Z",
    entryuserid: 1002,
    modifieduserid: 1002,
    modifieddate: "2022-09-09T07:07:11.836Z",
  });
  const [editingKey, setEditingKey] = useState("");
  const [expectedData, setExpectedData] = useState({
    uniqueid: 0,
    kitskuid: `${SKUId}`,
    iteminclude: 0,
    entrydate: "2022-09-28T06:52:47.730Z",
    entryuserid: 1002,
    modifieduserid: 1002,
    modifieddate: "2022-09-28T06:52:47.730Z",
  });
  const isEditing = (record) => record.uniqueid === editingKey;
  const FilteredItems = list?.filter((obj) => obj?.itemType === "Item");
  const edit = (record) => {
    mainForm.setFieldsValue({
      componentskuid: "",
      quantiy: "",
      ...record,
    });
    setEditingKey(record.uniqueid);
  };
  const delte = (record) => {
    axios({
      method: "DELETE",
      // url: `http://216.230.74.17:7039/api/SkuKitMapping?skuKitMappingId=${record}`,
      url: `https://localhost:7039/api/SkuKitMapping?skuKitMappingId=${record}`,
      headers: {
        Accept: "*/*",
      },
    })
      .then((response) => {
        setDeletedSuccess(true);
        setDeltedData(response.data);
      })
      .catch((error) => console.log(error));
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await mainForm.validateFields();
      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item.key);
      console.log("new Data", newData);
      console.log("index", index);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setTableData(newData);
        setEditingKey("");
        axios({
          method: "PUT",
          // url: "http://216.230.74.17:7039/api/SkuKitMapping",
          url: "https://localhost:7039/api/SkuKitMapping",
          data: {
            uniqueid: `${editingKey}`,
            kitskuid: `${SKUId}`,
            componentskuid: `${newData[index].componentskuid}`,
            quantity: `${newData[index].quantity}`,
            iteminclude: 0,
            entrydate: "2022-09-15T08:51:53.220Z",
            entryuserid: 1002,
            modifieduserid: 1002,
            modifieddate: "2022-09-15T08:51:53.220Z",
          },
          headers: {
            Accept: "*/*",
          },
        })
          .then((response) => {
            setEditedSuccess(true);
            console.log(response.data);
          })
          .catch((error) => console.log(error));
      } else {
        newData.push(row);
        setTableData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please fill this Input`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const columns = [
    {
      title: "SKU-Description",
      dataIndex: ["sku1", "description"],
      key: "sku1",
      render: (text, row) => (
        <span>
          {row?.sku1}-{row?.description}
        </span>
      ),
      editable: false,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "qty",
      editable: true,
    },
    {
      title: "Action",
      width: 100,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record?.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <EditOutlined style={{ color: "rgb(32, 201, 151)" }} />
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              className="p-3"
              onConfirm={() => delte(record?.uniqueid)}
            >
              <a>
                <DeleteOutlined style={{ color: "#cf1322" }} />
              </a>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  // const cookies = new Cookies();
  // const SingleClientID = cookies.get("clientId");
  // console.log(SingleClientID);
  const token =
    "eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImV4cCI6IjE2NTc2OTY1NDIiLCJuYmYiOiIxNjU3NjEwMTQyIn0";
  useEffect(() => {
    const accessToken = token;
    // const api = `http://216.230.74.17:7039/api/SkuKitMapping?clientId=${SingleClientID}`;
    // const api = `https://localhost:7039/api/SkuKitMapping?clientId=${SingleClientID}`;
    const api = `https://localhost:7039/api/SkuKitMapping?clientId=${1029}`;

    axios
      .get(api, {
        headers: { Authorization: `Bearer ${accessToken}` },
        Accept: "*/*",
      })
      .then((res) => {
        setTableData(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [creatingData, deletedData]);

  const mergedColumns = columns.map((col) => {
    console.log(col);
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "quantiy" ? "number" : "text",
        dataIndex: col.dataIndex,
        // title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const ChangingValidation = (values) => {
    console.log(values);
  };
  const onFinish = (values) => {
    setConcValues(values);
    Object.assign(expectedData, values);
    setMyButton(true);
    axios({
      method: "POST",
      // url: "http://216.230.74.17:7039/api/SkuKitMapping",
      url: "https://localhost:7039/api/SkuKitMapping",
      data: expectedData,
      headers: {
        Accept: "*/*",
      },
    })
      .then((response) => {
        if (response?.status === 200) {
          setSuccessModal(true);
          setMyButton(false);
          setCreatingData(response.data);
          form.resetFields();
          setExpectedData({
            uniqueid: 0,
            kitskuid: `${SKUId}`,
            iteminclude: 0,
            entrydate: "2022-09-28T06:52:47.730Z",
            entryuserid: 1002,
            modifieduserid: 1002,
            modifieddate: "2022-09-28T06:52:47.730Z",
            componentskuid: "",
            quantity: 0,
          });
        } else if (values?.componentskuid === expectedData?.componentskuid) {
          setMyButton(false);
          setErrorModal(true);
          form.resetFields();
        } else {
          setMyButton(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onFinishFailed = (error) => {
    console.log(error);
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      {successModal ? (
        <SweetAlert
          title="Success"
          success
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setSuccessModal(false);
            setSelectedValue("Select a Client...");
            setCreateData({
              componentskuid: "",
              quantity: 0,
              uniqueid: 0,
              iteminclude: 0,
              entrydate: "2022-09-09T07:07:11.836Z",
              entryuserid: 1002,
              modifieduserid: 1002,
              modifieddate: "2022-09-09T07:07:11.836Z",
            });
          }}
          onCancel={() => {
            setSuccessModal(false);
          }}
        >
          KIT Added Successfully
        </SweetAlert>
      ) : null}
      {editedSuccess ? (
        <SweetAlert
          title="Success"
          success
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setEditedSuccess(false);
          }}
          onCancel={() => {
            setEditedSuccess(false);
          }}
        >
          kit Edited Successfully
        </SweetAlert>
      ) : null}
      {deletedSuccess ? (
        <SweetAlert
          title="Success"
          success
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setDeletedSuccess(false);
          }}
          onCancel={() => {
            setDeletedSuccess(false);
          }}
        >
          kit Deleted Successfully
        </SweetAlert>
      ) : null}
      {errorModal ? (
        <SweetAlert
          title={<span>Already Exists!</span>}
          warning
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            setErrorModal(false);
          }}
        >
          <span>Please Select Another SKU-Description</span>
        </SweetAlert>
      ) : null}
      {data?.map((d) => (
        <>
          <div key={d?.uniqueid}>
            <div className="kitComponent_header">
              <h5
                style={{
                  color: "#5b73e8",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <UserIcon />
                KIT Components
              </h5>
            </div>
            <hr />
            <h4>{d?.description}</h4>
            <Row
              className="gy-2"
              style={{ justifyContent: "space-around", padding: "15px" }}
            >
              <div
                className="col-lg-5"
                style={{
                  boxShadow: "grey 0px 0px 1px 0px",
                  borderRadius: "10px",
                  padding: "15px",
                }}
              >
                <h5
                  style={{
                    backgroundColor: "rgb(159 137 68 / 1)",
                    color: "white",
                    padding: "13px",
                    borderRadius: "10px",
                  }}
                >
                  Add KIT Components
                </h5>
                <Form
                  style={{ marginTop: "25px" }}
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 50,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={(values) => onFinish(values)}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  form={form}
                >
                  <Col>
                    <Row>
                      <Col lg="6">
                        <span style={{ color: "black", fontWeight: "500" }}>
                          SKU-Description:
                          <span style={{ color: "red" }}>*</span>
                        </span>
                        <Form.Item
                          name="componentskuid"
                          rules={[
                            {
                              required: true,
                              message: "Please select your sku-desc",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select a Client..."
                            optionFilterProp="children"
                            onChange={ChangingValidation}
                            style={{
                              width: "100%",
                              height: "30px",
                              marginRight: "10px",
                            }}
                          >
                            {FilteredItems?.map((opt) => (
                              <>
                                <Option value={opt?.skuId}>
                                  {opt?.sku1}-{opt?.description}
                                </Option>
                              </>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col lg="6">
                        <div className="mb-3">
                          <span
                            className="form__form-group-label"
                            style={{ color: "black", fontWeight: "500" }}
                          >
                            Quantity:<span style={{ color: "red" }}>*</span>
                          </span>
                          <Form.Item
                            name="quantity"
                            type="number"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Quantity!",
                                pattern: "^[0-9.]*$",
                              },
                            ]}
                          >
                            <Input
                              onChange={ChangingValidation}
                              placeholder="Enter Quantity"
                            />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <hr />
                  <Form.Item>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {myButton ? (
                          <>
                            <Button
                              type="danger"
                              htmlType="button"
                              onClick={onReset}
                              shape="round"
                              disabled
                            >
                              Clear
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              type="danger"
                              htmlType="button"
                              onClick={onReset}
                              shape="round"
                              style={{
                                backgroundColor: "rgb(159 137 68 / 1)",
                                borderColor: "rgb(159 137 68 / 1)",
                              }}
                            >
                              Clear
                            </Button>
                          </>
                        )}
                      </div>
                      <div>
                        {myButton ? (
                          <>
                            <Button
                              type="primary"
                              htmlType="submit"
                              shape="round"
                              disabled
                            >
                              Add KIT Components...
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
                              Add KIT Components
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              </div>
              <div
                className="col-lg-6"
                style={{
                  boxShadow: "grey 0px 0px 1px 0px",
                  borderRadius: "10px",
                  padding: "15px",
                }}
              >
                <h5
                  style={{
                    backgroundColor: "rgb(32, 201, 151)",
                    color: "white",
                    padding: "13px",
                    borderRadius: "10px",
                  }}
                >
                  KIT Components
                </h5>
                <Form form={mainForm} component={false}>
                  <Table
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    columns={mergedColumns}
                    dataSource={tableData}
                    size="small"
                    bordered
                    rowClassName="editable-row"
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "15", "20", "30", "50"],
                    }}
                    stripes="even"
                  />
                </Form>
              </div>
            </Row>
          </div>
          ;
        </>
      ))}
    </>
  );
};
export default KitComponent;
