import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth.jsx";
import Admin from "./Pages/Admin.jsx";
import Customer from "./Pages/Customer.jsx";
import Engineer from "./Pages/Engineer.jsx";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/engineer" element={<Engineer />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/customer" element={<Customer />}></Route>
                <Route path="/" element={<Auth />}></Route>
            </Routes>
        </div>
    );
}

export default App;
