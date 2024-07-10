import { createRoot } from "react-dom/client"; // Import createRoot from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./style/footer.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
