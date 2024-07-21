import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import left_chevron from "../../assets/images-new/left-chevron.svg";

export default function viewCar() {
  let { carId } = useParams();

  const [car, setCar] = useState([]);
  useEffect(() => {
    if (car.length == 0) {
      fetchCarDetails();
    }

    return () => {};
  }, []);

  const fetchCarDetails = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/car/fetch-Car/${carId}`)
      .then((response) => {
        const { success, car } = response.data;
        if (success) {
          setCar(car);
        }
      })
      .catch((err) => console.log("Error:::", err));
  };

  return (
    <div className="dashboard-wrapper">
      <Container fluid>
        <Row>
          <Col lg={12} className="padding-remove mb-3">
            <div className="breadcums-list">
              <ul className="margin-remove m-0">
                <li className="margin-remove padding-remove">
                  <Link to="/car-management" className="active-btn">
                    View car
                  </Link>
                </li>
              </ul>
            </div>
          </Col>

          <Col lg={12}>
            <div className="table-data-search mb-0 mt-0">
              <div className="total-record breadcums mt-3">
                <ul>
                  <li>
                    <Link to="/car-management">
                      <span>
                        <img src={left_chevron} alt="chevron" />
                      </span>
                      Back to List
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>

          <Col lg={12}>
            <div className="filter-card-form card-shadow responive-table mt-4">
              <table
                className="no-footer table table-bordered table-striped font-size-small"
                style={{ width: "100%" }}
              >
                <tbody>
                  <tr>
                    <th>Brand Name:</th>
                    <td>{car?.Brand?.brand_name}</td>
                  </tr>
                  <tr>
                    <th>Model Name:</th>
                    <td>{car?.model?.model_name}</td>
                  </tr>
                  <tr>
                    <th>Varient Name:</th>
                    <td>{car?.varient?.varient_name}</td>
                  </tr>
                  <tr>
                    <th>Manufacturing Year:</th>
                    <td>{car?.manufacturing_year}</td>
                  </tr>
                  <tr>
                    <th>Kms Driven:</th>
                    <td>{car?.kms_driven}</td>
                  </tr>
                  <tr>
                    <th>Ownership:</th>
                    <td>{car?.ownership}</td>
                  </tr>
                  <tr>
                    <th>Registration State:</th>
                    <td>{car?.registration_state}</td>
                  </tr>
                  <tr>
                    <th>Registration Number</th>
                    <td>{car?.registration_number}</td>
                  </tr>
                  <tr>
                    <th>Car Location</th>
                    <td>{car?.car_location}</td>
                  </tr>
                  <tr>
                    <th>Ex Showroom Price:</th>
                    <td>{car?.ex_showroom}</td>
                  </tr>
                  <tr>
                    <th>Asking Price:</th>
                    <td>{car?.price}</td>
                  </tr>
                  <tr>
                    <th>Car Description:</th>
                    <td>{car?.car_description}</td>
                  </tr>
                  <tr>
                    <th>Front View:</th>
                    <td>
                      {car?.front_view != "" ? (
                        <img
                          style={{ width: "100%", maxWidth: "200px" }}
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.front_view}`}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Front Right:</th>
                    <td>
                      {car?.front_right != "" ? (
                        <img
                          style={{ width: "100%", maxWidth: "200px" }}
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.front_right}`}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Left View:</th>
                    <td>
                      {car?.left_view != "" ? (
                        <img
                          style={{ width: "100%", maxWidth: "200px" }}
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.left_view}`}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Rear view:</th>
                    <td>
                      {car?.rear_view != "" ? (
                        <img
                          style={{ width: "100%", maxWidth: "200px" }}
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.rear_view}`}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Odometer:</th>
                    <td>
                      {car?.odometer != "" ? (
                        <img
                          style={{ width: "100%", maxWidth: "200px" }}
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.odometer}`}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Chessis:</th>
                    <td>
                      {car?.chessis != "" ? (
                        <img
                          style={{ width: "100%", maxWidth: "200px" }}
                          src={`https://usedcarautoscan.s3.ap-south-1.amazonaws.com/${car.chessis}`}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Created At:</th>
                    <td>
                      {moment(car?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
