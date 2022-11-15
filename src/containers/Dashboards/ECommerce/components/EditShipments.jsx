import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Row, Button } from "reactstrap";
import { Select, Alert, Empty } from "antd";
import TruckDeliveryIcon from "mdi-react/TruckDeliveryIcon";
import NoteIcon from "mdi-react/NoteIcon";

const { Option } = Select;

const EditShipments = ({
  onSubmit,
  previousPage,
  shippingData,
  update,
  data,
  resData,
  countries,
}) => {
  console.log(shippingData);
  console.log(data);
  const { customerOrderId } = resData;
  const [filterStates, setFilterStates] = useState();

  console.log(filterStates);

  useEffect(() => {
    if (data?.shipCountryCode === "USA") {
      setFilterStates(
        countries?.filter((obj) => obj?.country === "USA")
      );
    } else if (data?.shipCountryCode === "CANADA") {
      setFilterStates(
        countries?.filter((obj) => obj?.country === "CANADA")
      );
    } else {
      setFilterStates(null);
    }
  }, [data]);
  return (
    <div style={{ marginTop: "20px" }}>
      <h4 style={{ color: "#0b0c71", display: "flex" }}>
        <TruckDeliveryIcon style={{ marginRight: "5px" }} />
        Shipping Details
      </h4>
      <hr />
      <Form onSubmit={onSubmit}>
        <Row>
          <Form.Group className="mb-3 col-lg-4">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Ship Method:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              as="select"
              className="form-select state-select"
              name="shipMethod"
            >
              <option value="">Select Ship Method</option>
              <option value="FedEx First Overnight">
                FedEx First Overnight
              </option>
              <option value="FedEx Freight">FedEx Freight</option>
              <option value="FedEx Ground">FedEx Ground</option>
              <option value="FedEx International Economy">
                FedEx International Economy
              </option>
              <option value="FedEx Overnight">FedEx Overnight</option>
              <option value="FedEx Priority Overnight">
                FedEx Priority Overnight
              </option>
              <option value="UPS 2nd Day Air">UPS 2nd Day Air</option>
              <option value="UPS 3rd Day">UPS 3rd Day</option>
              <option value="UPS Collect">UPS Collect</option>
              <option value="UPS Commercial Ground Service (UPSG)">
                UPS Commercial Ground Service (UPSG)
              </option>
              <option value="UPS Expedited">UPS Expedited</option>
              <option value="UPS Freight">UPS Freight</option>
              <option value="UPS Ground">UPS Ground</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Company Name:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipCompanyName"
              placeholder="Enter Company Name...."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={data?.shipCompanyName}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Customer Name:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipCustomerName"
              placeholder="Enter customer name .."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.shipCustomerName}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Address 1:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipAddress1"
              placeholder="Enter Adress lane 1"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.shipAddress1}
              onChange={update}
            />
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Address 2:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipAddress2"
              placeholder="Enter Adress lane 2"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.shipAddress2}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Address 3:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipAddress3"
              placeholder="Enter Adress lane 3"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.shipAddress3}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                City:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipCity"
              placeholder="Enter City .."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.shipCity}
              onChange={update}
            />
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Country:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              className="state-select"
              name="shipCountryCode"
              defaultValue={shippingData[0]?.shipCountryCode}
              required
              onChange={update}
            >
              <option value={shippingData[0]?.shipCountryCode}>
                {shippingData[0]?.shipCountryCode}
              </option>
              {shippingData[0]?.shipCountryCode === "USA" ? (
                <option value="CANADA">CANADA</option>
              ) : (
                <option value="USA">USA</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                State:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              as="select"
              className="form-select state-select"
              name="shipState"
              required
              defaultValue={shippingData[0]?.shipState}
              onChange={update}
            >
              <option value={shippingData[0]?.shipState}>
                {shippingData[0]?.shipState}
              </option>
              {filterStates?.map((val) => (
                <option value={val?.statename}>{val?.statename}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Postal Code/ Zip Code:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipPostalCode"
              placeholder="Enter Zip/Postal Code.."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.shipPostalCode}
              onChange={update}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Customer Order No:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="customerOrderId"
              type="number"
              placeholder="Enter Order No..."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={customerOrderId}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Phone No:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipPhone"
              type="number"
              placeholder="Enter Phone No..."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.shipPhone}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Email:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipEmail"
              placeholder="Enter Email...."
              size="sm"
              type="email"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.shipEmail}
              onChange={update}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Billing Details same as Shipping Details"
          />
        </Form.Group>
        <hr />

        <h4 style={{ color: "#2728a5", display: "flex" }}>
          <NoteIcon style={{ marginRight: "5px" }} />
          Billing Details
        </h4>
        <hr />
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Company Name:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Company Name...."
              name="billCompanyName"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.billCompanyName}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Customer Name:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter customer name .."
              name="billCustomerName"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.billCustomerName}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Address 1:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Adress lane 1"
              name="billAddress1"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.billAddress1}
              onChange={update}
            />
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Address 2:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Adress lane 2"
              size="sm"
              name="billAddress2"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.billAddress2}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Country:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              className="state-select"
              defaultValue={shippingData[0]?.shipCountryCode}
              name="billCountry"
              required
              onChange={update}
            >
              <option value={shippingData[0]?.shipCountryCode}>
                {shippingData[0]?.shipCountryCode}
              </option>
              {shippingData[0]?.shipCountryCode === "USA" ? (
                <option value="CANADA">CANADA</option>
              ) : (
                <option value="USA">USA</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                State:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              className="state-select"
              defaultValue={shippingData[0]?.billState}
              name="billState"
              required
              onChange={update}
            >
              <option value={shippingData[0]?.billState}>
                {shippingData[0]?.billState}
              </option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                City:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter City .."
              name="billCity"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.billCity}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Postal Code/ Zip Code:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Zip/Postal Code.."
              type="number"
              size="sm"
              name="billPostalCode"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.billPostalCode}
              onChange={update}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Phone No:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Phone No..."
              type="number"
              size="sm"
              name="billPhone"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.billPhone}
              onChange={update}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label>
              <span style={{ fontWeight: "500" }}>
                Email:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Email...."
              type="email"
              name="billEmail"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              required
              defaultValue={shippingData[0]?.billEmail}
              onChange={update}
            />
          </Form.Group>
        </Row>
        <hr />
        <Button
          outline
          onClick={previousPage}
          color="secondary"
          type="button"
          className="previous"
        >
          <b>{`<<`}Back</b>
        </Button>
        <Button
          outline
          color="primary"
          type="submit"
          style={{ float: "right" }}
        >
          <b> Next {`>>`}</b>
        </Button>
      </Form>
    </div>
  );
};

export default EditShipments;
