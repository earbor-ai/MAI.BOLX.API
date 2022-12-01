import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Row, Col, Label } from "reactstrap";
import { Button, Select } from "antd";

const ClientSelect = () => {
    const history = useHistory();
  const [clients, setClients] = useState();
  const [loading, setLoading] = useState();
  const [id, setId] = useState();
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setId(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const token = localStorage.getItem("myToken");
  useEffect(() => {
    setLoading(true);
    const accessToken = token;
    const skuApi = `http://216.230.74.17:8013/api/Client`;
    axios
      .get(skuApi, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setClients(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = () => {
    localStorage.setItem("clientId", id);
    history.push("/finance_dashboard");
  };
  return (
    <Col
      md={6}
      lg={6}
      style={{
        margin: "auto",
        minHeight: "300px",
        boxShadow: "0px 0px 20px grey",
        borderRadius: "10px",
        marginTop: "10em",
      }}
    >
      <Card className="mt-8 col-lg-12">
        <CardBody>
          <h3 style={{ textAlign: "center" }}>Select Client</h3>
          <hr />
          <Row>
            <Col className="mb-3 col-lg-12">
              {/* <Label>Client:</Label> */}
              <Select
                showSearch
                placeholder="Select Client"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                loading={loading}
                allowClear
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                style={{ width: "100%" }}
              >
                {clients?.map((d) => {
                  return <option value={d?.uniqueid}>{d?.clientname}</option>;
                })}
              </Select>
            </Col>
          </Row>
         <Col className="mb-3 col-lg-3" style={{ margin: 'auto' }}>
          <Button type="primary" onClick={onSubmit}>
            Submit
          </Button>
         </Col>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ClientSelect;
