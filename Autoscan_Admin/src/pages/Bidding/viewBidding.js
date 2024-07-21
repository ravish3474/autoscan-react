import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import left_chevron from "../../assets/images-new/left-chevron.svg";

export default function viewInspection() {
  let { inspectionId } = useParams();

  const [inspection, setInspection] = useState([]);
  useEffect(() => {
    if (inspection.length == 0) {
      fetchInspectionDetails();
    }

    return () => {};
  }, []);

  const fetchInspectionDetails = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/inspection/fetch-Inspection/${inspectionId}`
      )
      .then((response) => {
        const { success, inspection } = response.data;
        if (success) {
          setInspection(inspection);
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
                  <Link to="/inspection-management" className="active-btn">
                    View Inspection
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
                    <Link to="/inspection-management">
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
            <div className="filter-inspectiond-form inspectiond-shadow responive-table mt-4">
              <table
                className="no-footer table table-bordered table-striped font-size-small"
                style={{ width: "100%" }}
              >
                <tbody>
                  <tr>
                    <th>Brand Name:</th>
                    <td>{inspection?.Brand?.brand_name}</td>
                  </tr>
                  <tr>
                    <th>Model Name:</th>
                    <td>{inspection?.model?.model_name}</td>
                  </tr>
                  <tr>
                    <th>Varient Name:</th>
                    <td>{inspection?.varient?.varient_name}</td>
                  </tr>
                  <tr>
                    <th>Current Location:</th>
                    <td>{inspection?.current_location}</td>
                  </tr>
                  <tr>
                    <th>Pincode:</th>
                    <td>{inspection?.pincode}</td>
                  </tr>
                  <tr>
                    <th>Manufacturing Year:</th>
                    <td>{inspection?.manufacturing_year}</td>
                  </tr>
                  <tr>
                    <th>Kms Driven:</th>
                    <td>{inspection?.kms_driven}</td>
                  </tr>
                  <tr>
                    <th>Ownership:</th>
                    <td>{inspection?.ownership}</td>
                  </tr>
                  <tr>
                    <th>Registration State:</th>
                    <td>{inspection?.registration_state}</td>
                  </tr>
                  <tr>
                    <th>Registration Year</th>
                    <td>{inspection?.registration_year}</td>
                  </tr>
                  <tr>
                    <th>Registration Number</th>
                    <td>{inspection?.registration_number}</td>
                  </tr>
                  <tr>
                    <th>Car Location</th>
                    <td>{inspection?.car_location}</td>
                  </tr>
                  <tr>
                    <th>EX Showroom Price:</th>
                    <td>{inspection?.ex_showroom}</td>
                  </tr>
                  <tr>
                    <th>Asking Price:</th>
                    <td>{inspection?.price}</td>
                  </tr>
                  <tr>
                    <th>Insurance Validity:</th>
                    <td>{inspection?.insurance_validity}</td>
                  </tr>
                  <tr>
                    <th>Car Description:</th>
                    <td>{inspection?.car_description}</td>
                  </tr>
                  <tr>
                    <th>Inspection Address:</th>
                    <td>{inspection?.inspection_address}</td>
                  </tr>
                  <tr>
                    <th>Inspection Area:</th>
                    <td>{inspection?.inspection_area}</td>
                  </tr>
                  <tr>
                    <th>Inspection Landmark:</th>
                    <td>{inspection?.inspection_landmark}</td>
                  </tr>
                  <tr>
                    <th>Inspection Date:</th>
                    <td>{inspection?.inspection_date}</td>
                  </tr>
                  <tr>
                    <th>Inspection Time:</th>
                    <td>{inspection?.inspection_time}</td>
                  </tr>
                  <tr>
                    <th>Whatsapp Update:</th>
                    <td>{inspection?.whatsapp_update == "0" ? "No" : "Yes"}</td>
                  </tr>

                  <tr>
                    <th>Created At:</th>
                    <td>
                      {moment(inspection?.createdAt).format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
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
