<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import moment from "moment";
import RemotePagination from "../../../component/RemotePagination";
import Select from "react-select";
import { Spinner } from "reactstrap";
import { getUserInfo } from "../../../helpers/authHelper";
import { toast } from "react-toastify";
import { isEmpty } from "../../../helpers/utils";
import { CSVLink } from "react-csv";

import search_icon from "../../../assets/images-new/search-icon.svg";
import eyes_icon from "../../../assets/images-new/eyes.svg";
import download_icon from "../../../assets/images-new/download-icon.svg";
import plus_icon from "../../../assets/images-new/plus-icon.svg";
import delete_icon from "../../../assets/images-new/delete-icon.svg";
import edit_icon from "../../../assets/images-new/edit.svg";
const inspectionManagement = () => {
  const [inspectionsData, setInspectionsData] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [csvData, setCSVData] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchInspectionsList(currentPage, sizePerPage);
    document.title = "Usedcarwale - Inspection Management";
  }, [currentPage]);
  const handleToggleStatus = async (inspectionId) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/inspection/toggle-status/${inspectionId}`
      )
      .then((response) => {
        const { inspection } = response?.data;
        setInspectionsData((previnspections) =>
          previnspections.map((inspection) =>
            inspection.id === inspectionId
              ? { ...inspection, status: inspection.status == "0" ? "1" : "0" } // Toggle status
              : inspection
          )
        );
        fetchInspectionsList(1, sizePerPage);
        toast.success("Inspection status updated successfully");
      })
      .catch((err) => {
        console.log("Error while deleting the inspection list:::", err);
        toast.error("Error while deleting the inspection list", err);
      });
  };

  const handleInspectionDelete = (inspectionId) => {
    if (window.confirm("Are you sure you want to delete this Inspection?")) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/inspection/delete-inspection/${inspectionId}`
        )
        .then((response) => {
          let { success } = response.data;
          if (success) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error while deleting the inspection list:::", err);
        });
    }
  };

  const fetchInspectionsList = async (page, size) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/inspection/list?page=${page}&pageSize=${size}`
      );
      const { inspection, total_counts } = response?.data;
      setInspectionsData(inspection);
      setTotalCounts(total_counts);
    } catch (error) {
      console.error("Error fetching role data:", error);
    }
  };

  const columns = [
    { dataField: "Brand.brand_name", text: "Brand Name" },
    { dataField: "model.model_name", text: "Model Name" },
    { dataField: "varient.varient_name", text: "Varient Name" },
    { dataField: "current_location", text: "Current Location" },
    { dataField: "pincode", text: "Pincode" },
    { dataField: "car_location", text: "Car location" },
    { dataField: "manufacturing_year", text: "Manufacturing Year" },
    { dataField: "user_fullname", text: "User Name" },
    { dataField: "email", text: "User Email" },
    { dataField: "phone", text: "User Phone No" },
    {
      dataField: "updatedAt",
      text: "Date",
      formatter: (cell, row) => {
        return moment(row?.updatedAt).format("DD-MM-YYYY");
      },
    },
    {
      dataField: "Status",
      text: "Status",
      classes: "total text-center",
      headerClasses: "text-center",
      formatter: (cell, row) => {
        //  console.log('cell',row);
        return (
          <div className="job-status-toggle">
            {row.status == "1" ? <span>Active</span> : <span>Inactive</span>}
            <label className="switch">
              <input
                type="checkbox"
                checked={row.status == "1"}
                onChange={() => handleToggleStatus(row.id)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        );
      },
    },
    {
      dataField: "Actions",
      text: "Actions",
      classes: "total text-center",
      headerClasses: "text-center",
      formatter: (cell, row) => {
        //  console.log('cell',row);
        return (
          <div className="action-application">
            <div className="action-one">
              <Link to={`/view-inspection/${row.id}`}>
                <img src={eyes_icon} alt="eyes" />
                <span>View Details</span>
              </Link>
            </div>
            <div className="action-one">
              <Link
                to={`/edit-inspection-management/${row.id}`}
                title="Edit"
                data-placement="bottom"
                data-toggle="tooltip"
              >
                <img src={edit_icon} alt="" />
                <span>Edit Inspection</span>
              </Link>
            </div>
            <div
              className="action-one"
              onClick={() => handleInspectionDelete(row.id)}
              style={{ cursor: "pointer" }}
              title="Delete Inspection"
            >
              <Link to="#">
                <img src={delete_icon} alt="" />
                <span>Delete Inspection</span>
              </Link>
            </div>
          </div>
        );
      },
    },
  ];

  const [, setData] = useState([]);

  const rowClasses = (row, rowIndex) => {
    return rowIndex % 2 === 0 ? "even-row" : "odd-row";
  };

  const handleTableChange = (type, { page, sizePerPage }) => {
    setTimeout(() => {
      fetchInspectionsList(page, sizePerPage);
      setCurrentPage(page);
    }, 500);
  };

  const handleCSVDownload = async (e) => {
    e.preventDefault();

    let csvInspectionData = [];
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/inspection/inspection-list`
      );
      csvInspectionData = response?.data?.inspection;
    } catch (error) {
      console.error("Error fetching role data:", error);
    }

    if (csvInspectionData?.length === 0) {
      toast.error("No Data Available");
      return;
    }

    let allData = JSON.parse(JSON.stringify(csvInspectionData)) || [];
    allData = allData?.map((el) => {
      return el;
    });

    try {
      setCSVData(allData || []);
      setTimeout(() => {
        let element = document.getElementById("downloadCSV");
        element.click();
      }, 1000);
    } catch (err) {}
  };

  const renderCheck = (el) => {
    if (!query) {
      return true;
    }

    let query_text = query?.toLowerCase();
    let searchItem = JSON.stringify({
      brand_name: el?.Brand.brand_name?.toLowerCase(),
      model_name: el?.model.model_name?.toLowerCase() || "",
      varient_name: el?.varient.varient_name?.toLowerCase() || "",
    });
    if (searchItem?.includes(query_text)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <Container fluid>
          <Row>
            <div className="table-inspectiond">
              <div className="table-data-search">
                <div className="total-record">
                  <h5 className="mb-0">
                    Total Records: <span>{totalCounts}</span>
                  </h5>
                </div>
                <div className="total-serachbar d-flex gap-3 align-items-center">
                  <div className="serach-bar-top">
                    <form className="form-inline">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by Brand Name,Model Name"
                        aria-label="Search"
                      />
                      <span>
                        <img src={search_icon} alt="search" />
                      </span>
                    </form>
                  </div>

                  <div className="inspectiond-filters">
                    <Link
                      to="/add-inspection-management"
                      className="btn btn-primary blue-btn d-flex gap-1 align-items-center"
                    >
                      <span>
                        <img src={plus_icon} alt="download icon" />
                      </span>
                      Add Inspection
                    </Link>
                  </div>

                  <div className="inspectiond-filters">
                    <div className="inspectiond-filters">
                      <CSVLink
                        data={csvData}
                        headers={[
                          {
                            key: "Brand.brand_name",
                            label: "Brand Name",
                          },
                          {
                            key: "model.model_name",
                            label: "Model Name",
                          },
                          {
                            key: "varient.varient_name",
                            label: "Varient Name",
                          },
                          {
                            key: "car_location",
                            label: "Car location",
                          },
                          {
                            key: "manufacturing_year",
                            label: "Manufacturing Year",
                          },
                          {
                            key: "user_fullname",
                            label: "User Name",
                          },
                          {
                            key: "email",
                            label: "User Email",
                          },
                          {
                            key: "phone",
                            label: "User Phone No",
                          },
                        ]}
                        filename={`inspectionsList.csv`}
                        id="downloadCSV"
                      >
                        <Button
                          className="blue-btn d-flex gap-1 align-items-center"
                          variant="primary"
                          onClick={(e) => handleCSVDownload(e)}
                        >
                          <span>
                            <img src={download_icon} alt="download icon" />
                          </span>{" "}
                          Download CSV
                        </Button>
                      </CSVLink>
                    </div>
                  </div>
                </div>
              </div>

              <RemotePagination
                // data={leadsData}
                data={inspectionsData?.filter(renderCheck)}
                columns={columns}
                page={currentPage}
                sizePerPage={sizePerPage}
                totalSize={totalCounts}
                onTableChange={handleTableChange}
                rowClasses={rowClasses}
              />
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default inspectionManagement;
=======
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import moment from "moment";
import RemotePagination from "../../../component/RemotePagination";
import Select from "react-select";
import { Spinner } from "reactstrap";
import { getUserInfo } from "../../../helpers/authHelper";
import { toast } from "react-toastify";
import { isEmpty } from "../../../helpers/utils";
import { CSVLink } from "react-csv";

import search_icon from "../../../assets/images-new/search-icon.svg";
import eyes_icon from "../../../assets/images-new/eyes.svg";
import download_icon from "../../../assets/images-new/download-icon.svg";
import plus_icon from "../../../assets/images-new/plus-icon.svg";
import delete_icon from "../../../assets/images-new/delete-icon.svg";
import edit_icon from "../../../assets/images-new/edit.svg";
const inspectionManagement = () => {
  const [inspectionsData, setInspectionsData] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [csvData, setCSVData] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchInspectionsList(currentPage, sizePerPage);
    document.title = "Usedcarwale - Inspection Management";
  }, [currentPage]);
  const handleToggleStatus = async (inspectionId) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/inspection/toggle-status/${inspectionId}`
      )
      .then((response) => {
        const { inspection } = response?.data;
        setInspectionsData((previnspections) =>
          previnspections.map((inspection) =>
            inspection.id === inspectionId
              ? { ...inspection, status: inspection.status == "0" ? "1" : "0" } // Toggle status
              : inspection
          )
        );
        fetchInspectionsList(1, sizePerPage);
        toast.success("Inspection status updated successfully");
      })
      .catch((err) => {
        console.log("Error while deleting the inspection list:::", err);
        toast.error("Error while deleting the inspection list", err);
      });
  };

  const handleInspectionDelete = (inspectionId) => {
    if (window.confirm("Are you sure you want to delete this Inspection?")) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/inspection/delete-inspection/${inspectionId}`
        )
        .then((response) => {
          let { success } = response.data;
          if (success) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error while deleting the inspection list:::", err);
        });
    }
  };

  const fetchInspectionsList = async (page, size) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/inspection/list?page=${page}&pageSize=${size}`
      );
      const { inspection, total_counts } = response?.data;
      setInspectionsData(inspection);
      setTotalCounts(total_counts);
    } catch (error) {
      console.error("Error fetching role data:", error);
    }
  };

  const columns = [
    { dataField: "Brand.brand_name", text: "Brand Name" },
    { dataField: "model.model_name", text: "Model Name" },
    { dataField: "varient.varient_name", text: "Varient Name" },
    { dataField: "current_location", text: "Current Location" },
    { dataField: "pincode", text: "Pincode" },
    { dataField: "car_location", text: "Car location" },
    { dataField: "manufacturing_year", text: "Manufacturing Year" },
    { dataField: "user_fullname", text: "User Name" },
    { dataField: "email", text: "User Email" },
    { dataField: "phone", text: "User Phone No" },
    {
      dataField: "updatedAt",
      text: "Date",
      formatter: (cell, row) => {
        return moment(row?.updatedAt).format("DD-MM-YYYY");
      },
    },
    {
      dataField: "Status",
      text: "Status",
      classes: "total text-center",
      headerClasses: "text-center",
      formatter: (cell, row) => {
        //  console.log('cell',row);
        return (
          <div className="job-status-toggle">
            {row.status == "1" ? <span>Active</span> : <span>Inactive</span>}
            <label className="switch">
              <input
                type="checkbox"
                checked={row.status == "1"}
                onChange={() => handleToggleStatus(row.id)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        );
      },
    },
    {
      dataField: "Actions",
      text: "Actions",
      classes: "total text-center",
      headerClasses: "text-center",
      formatter: (cell, row) => {
        //  console.log('cell',row);
        return (
          <div className="action-application">
            <div className="action-one">
              <Link to={`/view-inspection/${row.id}`}>
                <img src={eyes_icon} alt="eyes" />
                <span>View Details</span>
              </Link>
            </div>
            <div className="action-one">
              <Link
                to={`/edit-inspection-management/${row.id}`}
                title="Edit"
                data-placement="bottom"
                data-toggle="tooltip"
              >
                <img src={edit_icon} alt="" />
                <span>Edit Inspection</span>
              </Link>
            </div>
            <div
              className="action-one"
              onClick={() => handleInspectionDelete(row.id)}
              style={{ cursor: "pointer" }}
              title="Delete Inspection"
            >
              <Link to="#">
                <img src={delete_icon} alt="" />
                <span>Delete Inspection</span>
              </Link>
            </div>
          </div>
        );
      },
    },
  ];

  const [, setData] = useState([]);

  const rowClasses = (row, rowIndex) => {
    return rowIndex % 2 === 0 ? "even-row" : "odd-row";
  };

  const handleTableChange = (type, { page, sizePerPage }) => {
    setTimeout(() => {
      fetchInspectionsList(page, sizePerPage);
      setCurrentPage(page);
    }, 500);
  };

  const handleCSVDownload = async (e) => {
    e.preventDefault();

    let csvInspectionData = [];
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/inspection/inspection-list`
      );
      csvInspectionData = response?.data?.inspection;
    } catch (error) {
      console.error("Error fetching role data:", error);
    }

    if (csvInspectionData?.length === 0) {
      toast.error("No Data Available");
      return;
    }

    let allData = JSON.parse(JSON.stringify(csvInspectionData)) || [];
    allData = allData?.map((el) => {
      return el;
    });

    try {
      setCSVData(allData || []);
      setTimeout(() => {
        let element = document.getElementById("downloadCSV");
        element.click();
      }, 1000);
    } catch (err) {}
  };

  const renderCheck = (el) => {
    if (!query) {
      return true;
    }

    let query_text = query?.toLowerCase();
    let searchItem = JSON.stringify({
      brand_name: el?.Brand.brand_name?.toLowerCase(),
      model_name: el?.model.model_name?.toLowerCase() || "",
      varient_name: el?.varient.varient_name?.toLowerCase() || "",
    });
    if (searchItem?.includes(query_text)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="dashboard-wrapper">
        <Container fluid>
          <Row>
            <div className="table-inspectiond">
              <div className="table-data-search">
                <div className="total-record">
                  <h5 className="mb-0">
                    Total Records: <span>{totalCounts}</span>
                  </h5>
                </div>
                <div className="total-serachbar d-flex gap-3 align-items-center">
                  <div className="serach-bar-top">
                    <form className="form-inline">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by Brand Name,Model Name"
                        aria-label="Search"
                      />
                      <span>
                        <img src={search_icon} alt="search" />
                      </span>
                    </form>
                  </div>

                  <div className="inspectiond-filters">
                    <Link
                      to="/add-inspection-management"
                      className="btn btn-primary blue-btn d-flex gap-1 align-items-center"
                    >
                      <span>
                        <img src={plus_icon} alt="download icon" />
                      </span>
                      Add Inspection
                    </Link>
                  </div>

                  <div className="inspectiond-filters">
                    <div className="inspectiond-filters">
                      <CSVLink
                        data={csvData}
                        headers={[
                          {
                            key: "Brand.brand_name",
                            label: "Brand Name",
                          },
                          {
                            key: "model.model_name",
                            label: "Model Name",
                          },
                          {
                            key: "varient.varient_name",
                            label: "Varient Name",
                          },
                          {
                            key: "car_location",
                            label: "Car location",
                          },
                          {
                            key: "manufacturing_year",
                            label: "Manufacturing Year",
                          },
                          {
                            key: "user_fullname",
                            label: "User Name",
                          },
                          {
                            key: "email",
                            label: "User Email",
                          },
                          {
                            key: "phone",
                            label: "User Phone No",
                          },
                        ]}
                        filename={`inspectionsList.csv`}
                        id="downloadCSV"
                      >
                        <Button
                          className="blue-btn d-flex gap-1 align-items-center"
                          variant="primary"
                          onClick={(e) => handleCSVDownload(e)}
                        >
                          <span>
                            <img src={download_icon} alt="download icon" />
                          </span>{" "}
                          Download CSV
                        </Button>
                      </CSVLink>
                    </div>
                  </div>
                </div>
              </div>

              <RemotePagination
                // data={leadsData}
                data={inspectionsData?.filter(renderCheck)}
                columns={columns}
                page={currentPage}
                sizePerPage={sizePerPage}
                totalSize={totalCounts}
                onTableChange={handleTableChange}
                rowClasses={rowClasses}
              />
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default inspectionManagement;
>>>>>>> 58d9d4567d085e43404dfcc6763df284c8ffea58
