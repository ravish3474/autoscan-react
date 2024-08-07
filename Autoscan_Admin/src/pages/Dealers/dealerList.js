import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import axios from "axios";
import RemotePagination from "../../component/RemotePagination";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import search_icon from "../../assets/images-new/search-icon.svg";
import download_icon from "../../assets/images-new/download-icon.svg";
import plus_icon from "../../assets/images-new/plus-icon.svg";
import delete_icon from "../../assets/images-new/delete-icon.svg";
import edit_icon from "../../assets/images-new/edit.svg";
const dealerList = () => {
  const [dealersData, setDealersData] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [csvData, setCSVData] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchDealersList(currentPage, sizePerPage);
    document.title = "Usedcarwale - Dealer Management";
  }, [currentPage]);

  const handleDealerDelete = (dealerId) => {
    if (window.confirm("Are you sure you want to delete this Dealer?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/dealer/delete-dealer/${dealerId}`)
        .then((response) => {
          let { success } = response.data;
          if (success) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error while deleting the dealer list:::", err);
        });
    }
  };

  const fetchDealersList = async (page, size) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dealer/list?page=${page}&pageSize=${size}`
      );
      const { dealer, total_counts } = response?.data;
      setDealersData(dealer);
      setTotalCounts(total_counts);
    } catch (error) {
      console.error("Error fetching Dealer data:", error);
    }
  };

  const columns = [
    { dataField: "name", text: "Name" },
    { dataField: "username", text: "Username" },
    { dataField: "email", text: "Email" },
    { dataField: "phone", text: "Contact No" },
    { dataField: "address", text: "Address" },
    {
      dataField: "id",
      text: "Actions",
      formatter: (cell) => {
        return (
          <div className="action-application">
            <div className="action-one">
              <Link to={`/edit-dealer/${cell}`} title="Edit Dealer">
                <img src={edit_icon} alt="" />
                <span>Edit Dealer</span>
              </Link>
            </div>

            {/* <Link className="text-success" to="#" title="Disapprove Dealer">
              <i
                className="mdi mdi-thumb-up-outline font-size-18"
                id="edittooltip"
                style={{ color: "black" }}
              ></i>
            </Link> */}

            <div
              className="action-one"
              onClick={() => handleDealerDelete(cell)}
              style={{ cursor: "pointer" }}
              title="Delete Dealer"
            >
              <Link to="#">
                <img src={delete_icon} alt="" />
                <span>Delete Dealer</span>
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
      fetchDealersList(page, sizePerPage);
      setCurrentPage(page);
    }, 500);
  };

  const handleCSVDownload = async (e) => {
    e.preventDefault();

    let csvDealerData = [];
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/dealer/fetch-dealer`
      );
      csvDealerData = response?.data?.dealerList;
    } catch (error) {
      console.error("Error fetching dealer data:", error);
    }

    if (csvDealerData?.length === 0) {
      toast.error("No Data Available");
      return;
    }

    let allData = JSON.parse(JSON.stringify(csvDealerData)) || [];
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
      name: el?.name?.toLowerCase(),
      username: el?.username?.toLowerCase() || "",
      phone: el?.phone?.toLowerCase() || "",
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
            <Col lg={12} className="padding-remove">
              <div className="breadcums-list">
                <ul className="margin-remove m-0">
                  <li className="margin-remove padding-remove">
                    <Link to="/dealer-list" className="active-btn">
                      Manage Dealer
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <div className="table-card">
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
                        placeholder="Search by Name,Username,Role,Contact No..."
                        aria-label="Search"
                      />
                      <span>
                        <img src={search_icon} alt="search" />
                      </span>
                    </form>
                  </div>

                  <div className="card-filters">
                    <Link
                      to="/create-dealer"
                      className="btn btn-primary blue-btn d-flex gap-1 align-items-center"
                    >
                      <span>
                        <img src={plus_icon} alt="download icon" />
                      </span>
                      Create Dealer
                    </Link>
                  </div>

                  <div className="card-filters">
                    <div className="card-filters">
                      <CSVLink
                        data={csvData}
                        headers={[
                          {
                            key: "name",
                            label: "Name",
                          },
                          {
                            key: "username",
                            label: "Username",
                          },
                          {
                            key: "email",
                            label: "Email",
                          },
                          {
                            key: "phone",
                            label: "Phone",
                          },
                        ]}
                        filename={`dealersList.csv`}
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
                data={dealersData?.filter(renderCheck)}
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

export default dealerList;
