import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import DealerLoginModal from "./components/modals/DealerLoginModal"; // Import DealerLoginModal
import ExploreCar from "./Pages/ExploreCar";
import SellCar from "./Pages/SellCar";
import CarDetails from "./Pages/CarDetails";
import CarValuation from "./Pages/CarValuation";
import ListedCarsDetails from "./Pages/ListedCarsDetails";
import Profile from "./Pages/Profile";
import Inspection from "./Pages/Inspection";
import Footer from "./components/Footer";
import Home from "./components/Home";
import LoginModal from "./components/modals/LoginModal";

function App() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDealerModal, setShowDealerModal] = useState(false);

  return (
    <Router>
      <Header
        setShowUserModal={setShowUserModal}
        setShowDealerModal={setShowDealerModal}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/ExploreCar" component={ExploreCar} />
        <Route path="/inspection-car" component={Inspection} />
        <Route path="/sell-car" component={SellCar} />
        <Route path="/car-details/:carId" component={CarDetails} />
        <Route path="/car-valuation" component={CarValuation} />
        <Route path="/listedCardDetails" component={ListedCarsDetails} />
        <Route path="/profile" component={Profile} />
      </Switch>
      <Footer />
      {showUserModal && (
        <LoginModal
          pathRoute={"/profile"}
          onClose={() => setShowUserModal(false)}
        />
      )}
      {showDealerModal && (
        <DealerLoginModal onClose={() => setShowDealerModal(false)} />
      )}
     
    </Router>
  );
}

export default App;
