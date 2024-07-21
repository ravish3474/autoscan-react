import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import arrow from "../../assets/images/icon/arrow.svg";
import total_icon from "../../assets/images/total-app-ico.svg";

const Card = ({ imageSrc, title, value, units, link }) => (
  <div className="tabBox-wrapper">
    <Link to={link}>
      <div className="tab-details">
        <div className="d-flex align-items-center">
          <div className="tab-value">{value}</div>
          <div className="tab-ico ms-auto">
            <img src={imageSrc} alt={title} />
          </div>
        </div>
        <h2 className="tab-title">{title}</h2>
      </div>
    </Link>
  </div>
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState("");
  const [tabType, setTabType] = useState("current");
  useEffect(() => {
    setDashboardData("");
  }, [tabType]);

  //hide-showw-in mobile-view
  const [showDetails, setShowDetails] = useState(false);


  useEffect(() => {
    // Add class to body element when component mounts
    document.body.classList.add("dashboard-body");

    // Remove class from body element when component unmounts
    return () => {
      document.body.classList.remove("dashboard-body");
    };
  }, []);

  return (
    <div className="dashboard-wrapper dasboard-container">
      <Container fluid>
        <Row>
          <div className="inner-wrapper">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="outerTab-box-wrapper">
                  <Row>
                    <Col xl={4} lg={6} md={6}>
                      {/* Pending Applications */}
                      <Card
                        imageSrc={total_icon}
                        title={
                          <>
                            Total Leads{" "}
                            {
                              <img
                                src={arrow}
                                alt="Chevron Icon"
                                className="right-chevron"
                              />
                            }
                          </>
                        }
                        value={dashboardData?.counts?.pendingCount || 0}
                        link={"/car-management"}
                      />
                    </Col>

                    <Col xl={4} lg={6} md={6}>
                      {/* Screening Test */}
                      <Card
                        imageSrc={total_icon}
                        title={
                          <>
                            Total Dealers{" "}
                            {
                              <img
                                src={arrow}
                                alt="Chevron Icon"
                                className="right-chevron"
                              />
                            }
                          </>
                        }
                        value={dashboardData?.counts?.screeningUsers || 0}
                        link={"/car-management"}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
