// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import ExploreCar from "./components/ExploreCar";
import SellCar from "./Pages/SellCar";
import CarDetails from "./Pages/CarDetails";
import CarValuation from "./Pages/CarValuation";
import Inspection from "./components/Inspection";
import Footer from "./components/Footer";
import Home from "./components/Home";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/ExploreCar" component={ExploreCar} />
        <Route path="/inspection-car" component={Inspection} />
        <Route path="/sell-car" component={SellCar} />
        <Route path="/car-details/:carId" component={CarDetails} />
        <Route path="/car-valuation" component={CarValuation} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
