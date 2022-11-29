import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Button } from "reactstrap";
import TruckDeliveryIcon from "mdi-react/TruckDeliveryIcon";
import NoteIcon from "mdi-react/NoteIcon";

const ShippingDetails = ({
  onSubmit,
  values,
  handleChange,
  handleCheck,
  isChecked,
  filterCountries,
  filterBillCountries,
  previousPage,
  handleCustomerOrderNo
}) => {
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
            <Form.Label style={{ float: 'left' }}>
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
              <option value="FedEx First Overnight">FedEx First Overnight</option>
              <option value="FedEx Freight">FedEx Freight</option>
              <option value="FedEx Ground">FedEx Ground</option>
              <option value="FedEx International Economy">FedEx International Economy</option>
              <option value="FedEx Overnight">FedEx Overnight</option>
              <option value="FedEx Priority Overnight">FedEx Priority Overnight</option>
              <option value="UPS 2nd Day Air">UPS 2nd Day Air</option>
              <option value="UPS 3rd Day">UPS 3rd Day</option>
              <option value="UPS Collect">UPS Collect</option>
              <option value="UPS Commercial Ground Service (UPSG)">UPS Commercial Ground Service (UPSG)</option>
              <option value="UPS Expedited">UPS Expedited</option>
              <option value="UPS Freight">UPS Freight</option>
              <option value="UPS Ground">UPS Ground</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Company Name:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipCompanyName"
              placeholder="Enter Company Name...."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipCompanyName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Customer Name:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipCustomerName"
              placeholder="Enter customer name .."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipCustomerName}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Address 1:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipAddress1"
              placeholder="Enter Adress lane 1"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipAddress1}
              required
            />
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Address 2:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipAddress2"
              placeholder="Enter Adress lane 2"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipAddress2}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Address 3:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipAddress3"
              placeholder="Enter Adress lane 3"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipAddress3}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                City:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipCity"
              placeholder="Enter City .."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipCity}
              required
            />
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Country:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              className="state-select"
              name="shipCountryCode"
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipCountryCode}
              required
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="CANADA">Canada</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                State:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              as="select"
              className="form-select state-select"
              name="shipState"
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipState}
              required
            >
              <option value="">Select State</option>
              {filterCountries?.map((opt) => (
                <option value={opt?.statename}>{opt?.statename}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Postal Code/ Zip Code:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="shipPostalCode"
              placeholder="Enter Zip/Postal Code.."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipPostalCode}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Customer Order No:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              name="customerOrderId"
              placeholder="Enter Order No..."
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              onChange={handleCustomerOrderNo}
              defaultValue={values?.customerOrderId}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
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
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipPhone}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
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
              onChange={handleChange}
              defaultValue={values?.orderShipments[0]?.shipEmail}
              required
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Billing Details same as Shipping Details"
            value={isChecked}
            onChange={handleCheck}
            // style={{ float: 'left' }}
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
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Company Name:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Company Name...."
              name="billCompanyName"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipCompanyName
                  : values?.orderShipments[0]?.billCompanyName
              }
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Customer Name:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter customer name .."
              name="billCustomerName"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipCustomerName
                  : values?.orderShipments[0]?.billCustomerName
              }
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Address 1:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Adress lane 1"
              name="billAddress1"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipAddress1
                  : values?.orderShipments[0]?.billAddress1
              }
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Address 2:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter Adress lane 2"
              size="sm"
              name="billAddress2"
              style={{ borderColor: "#70bbfd" }}
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipAddress2
                  : values?.orderShipments[0]?.billAddress2
              }
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                Country:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              className="state-select"
              name="billCountry"
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipCountryCode
                  : values?.orderShipments[0]?.billCountry
              }
              onChange={handleChange}
              required
            >
              {isChecked ? (
                <option value={values?.orderShipments[0]?.shipCountryCode}>
                  {values?.orderShipments[0]?.shipCountryCode}
                </option>
              ) : (
                <>
                  {" "}
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="CANADA">Canada</option>
                </>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                State:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Select
              className="state-select"
              name="billState"
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipState
                  : values?.orderShipments[0]?.billState
              }
              onChange={handleChange}
              required
            >
              {isChecked ? (
                <option value={values?.orderShipments[0]?.shipState}>
                  {values?.orderShipments[0]?.shipState}
                </option>
              ) : (
                <>
                  <option value="">Select State</option>
                  {filterBillCountries?.map((opt) => (
                    <option value={opt?.statename}>{opt?.statename}</option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "space-around" }}>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
              <span style={{ fontWeight: "500" }}>
                City:<span style={{ color: "red" }}>*</span>
              </span>
            </Form.Label>
            <Form.Control
              placeholder="Enter City .."
              name="billCity"
              size="sm"
              style={{ borderColor: "#70bbfd" }}
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipCity
                  : values?.orderShipments[0]?.billCity
              }
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
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
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipPostalCode
                  : values?.orderShipments[0]?.billPostalCode
              }
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicPassword">
            <Form.Label style={{ float: 'left' }}>
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
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipPhone
                  : values?.orderShipments[0]?.billPhone
              }
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col-lg-4" controlId="formBasicEmail">
            <Form.Label style={{ float: 'left' }}>
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
              defaultValue={
                isChecked
                  ? values?.orderShipments[0]?.shipEmail
                  : values?.orderShipments[0]?.billEmail
              }
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <hr />
        <Button
          outline
          color="secondary"
          type="button"
          className="previous"
          onClick={previousPage}
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

export default ShippingDetails;
