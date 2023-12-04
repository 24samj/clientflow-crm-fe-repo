import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./Pages/Auth.jsx";
import Admin from "./Pages/Admin.jsx";
import Customer from "./Pages/Customer.jsx";
import Engineer from "./Pages/Engineer.jsx";
import { useEffect } from "react";

function App() {
    const location = useLocation();

    useEffect(() => {
        const pageTitle = getPageTitle(location.pathname);

        document.title = `ClientFlow | ${pageTitle}`;
    }, [location.pathname]);

    const getPageTitle = (pathname) => {
        switch (true) {
            case pathname === "/admin":
                return "Admin";
            case pathname === "/engineer":
                return "Engineer";
            case pathname === "/customer":
                return "Customer";

            default:
                return "Login";
        }
    };
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
