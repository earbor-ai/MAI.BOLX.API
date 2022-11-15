import React, { useState } from "react";
import { Button, Table, Modal, Input, Typography, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableEdit = ({
  tableData,
  setTableData,
  orderItems,
  setOrderItems,
  availableQty,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSku, setEditingSku] = useState(null);
  const [editingItems, setEditingItems] = useState(null);
  const [inputVal, setInputVal] = useState();
  const [showErr, setShowErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState();


  const onDeleteSku = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Item?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTableData((pre) => {
          return pre.filter((elem) => elem.id !== record.id);
        });
        setOrderItems((pre) => {
          return pre.filter((elem) => elem.skuId !== record.skuId);
        });
      },
    });
  };
  const onEditSku = (record) => {
    setIsEditing(true);
    setEditingSku({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingSku(null);
  };

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "skuId",
    },
    {
      key: "2",
      title: "Description",
      render: (record) => (
        <Typography.Text>{record?.description}</Typography.Text>
      ),
    },
    {
      key: "3",
      title: "Quantity",
      render: (record) => <Typography.Text>{record?.orderQty}</Typography.Text>,
    },
    {
      key: "4",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Tooltip title="Edit" color="cyan">
              <EditOutlined
                onClick={() => {
                  onEditSku(record);
                }}
                style={{ color: "#074de5", fontSize: 18 }}
              />
            </Tooltip>
            <Tooltip title="Delete" color="red">
              <DeleteOutlined
                onClick={() => {
                  onDeleteSku(record);
                }}
                style={{ color: "red", marginLeft: 15, fontSize: 18 }}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={orderItems} size="small" bordered />
      <Modal
        title="Update Sku Quantity"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          if (inputVal >= availableQty || inputVal === "") {
            setShowErr(true);
          } else {
            setTableData((pre) => {
              return pre.map((elm) => {
                if (elm.skuId === editingSku.skuId) {
                  return editingSku;
                } else {
                  return elm;
                }
              });
            });
            setOrderItems((pre) => {
              return pre.map((elm) => {
                if (elm.skuId === editingSku.skuId) {
                  return editingSku;
                } else {
                  return elm;
                }
              });
            });
            resetEditing();
            setShowErr(false);
          }
        }}
        style={{ width: "50%", margin: "auto" }}
      >
        <Input
          value={editingSku?.orderQty}
          onChange={(e) => {
            setEditingSku((pre) => {
              return { ...pre, orderQty: e.target.value };
            });
            setInputVal(e.target.value);
            if (e.target.value < availableQty) {
              setShowErr(false);
            }
            if (e.target.value >= availableQty) {
              setErrorMsg("Value should be less than available quantity"); 
            }
            if (e.target.value === "") {
              setErrorMsg("Please enter quantity");
            }
          }}
        />
        {showErr ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
      </Modal>
    </div>
  );
};

export default TableEdit;
