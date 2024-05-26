import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { authProtectedRoutes, publicRoutes } from "./routes/index";
import AppRoute from "./routes/route";
import "./assets/scss/theme.scss";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

let VerticalLayout = require("./component/VerticalLayout").default;
let NonAuthLayout = require("./component/NonAuthLayout").default;

const App = (props) => {
  const [data, setData] = useState({});
  let history = useHistory();

  const getLayout = () => {
    let layoutCls = VerticalLayout;
    return layoutCls;
  };

  const Layout = getLayout();

  return (
    <React.Fragment>
      <Router basename="/admin">
        <Switch>
          {publicRoutes.map((route, idx) => (
            <AppRoute
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}
          {authProtectedRoutes.map((route, idx) => (
            <AppRoute
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

const mapStateToProps = (data) => {
  return {
    layout: data.Layout,
  };
};

export default connect(mapStateToProps, null)(App);