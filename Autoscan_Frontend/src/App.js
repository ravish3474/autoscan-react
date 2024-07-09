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
import CalculateFinalValue from "./Pages/CalculateFinalValue";
import RequestCallBack from "./components/RequestCallBack";
import ThankYou from "./components/ThankYou";
import InspectionThankYou from "./components/InspectionThankYou";



function App() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDealerModal, setShowDealerModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginState = (state) => {
    setIsLoggedIn(state);
  };

  return (
    <Router>
      <Header
        setShowUserModal={setShowUserModal}
        setShowDealerModal={setShowDealerModal}
        updateLoginState={updateLoginState}
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
        <Route path="/finalValue" component={CalculateFinalValue} />
        <Route path="/RequestCallBack" component={RequestCallBack} />
        <Route path="/ThankYou" component={ThankYou} />
        <Route path="/InspectionThankYou" component={InspectionThankYou} />
      </Switch>
      <Footer />
      {showUserModal && (
        <LoginModal
          pathRoute={"/profile"}
          onClose={() => setShowUserModal(false)}
          onLogin={() => updateLoginState(true)}
        />
      )}
      {showDealerModal && (
        <DealerLoginModal
          onClose={() => setShowDealerModal(false)}
          onLogin={() => updateLoginState(true)}
        />
      )}
    </Router>
  );
}

export default App;
