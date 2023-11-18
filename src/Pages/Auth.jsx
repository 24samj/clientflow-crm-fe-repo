import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Constants.js";
const Auth = () => {
    const [showSignUP, setSignUp] = useState(false);
    const [errorMessage, seterrorMessage] = useState("");
    const navigate = useNavigate();
    const initialLoginFormValues = {
        userId: "",
        password: "",
    };
    const initialSignUpFormValues = {
        userId: "",
        Username: "",
        userTypes: "",
        email: "",
        password: "",
    };
    const [LoginFormValues, setLoginFormValues] = useState(
        initialLoginFormValues
    );
    const [SignUpFormValues, setSignUpFormValues] = useState(
        initialSignUpFormValues
    );

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                BASE_URL + "/crm/api/v1/auth/signin",
                {
                    userId: LoginFormValues.userId,
                    password: LoginFormValues.password,
                }
            );
            localStorage.setItem("name", data.name);
            localStorage.setItem("userid", data.userId);
            localStorage.setItem("email", data.email);
            localStorage.setItem("userTypes", data.userTypes);
            localStorage.setItem("userStatus", data.userStatus);
            localStorage.setItem("token", data.accessToken);

            toast.success("Welcome to the app!");
            switch (data.userTypes) {
                case "CUSTOMER":
                    navigate("/customer");
                    break;
                case "ENGINEER":
                    navigate("/engineer");
                    break;
                case "ADMIN":
                    navigate("/admin");
                    break;
                default:
            }
            toast.success("Login Successfull");
        } catch (ex) {
            toast.error(ex.response.data.message);
            seterrorMessage(ex.response.data.message);
        }
    };
    async function handleSignUp(event) {
        event.preventDefault();
        try {
            await axios.post(BASE_URL + "/crm/api/v1/auth/signup", {
                userId: SignUpFormValues.userId,
                password: SignUpFormValues.password,
                name: SignUpFormValues.Username,
                email: SignUpFormValues.email,
                userTypes: SignUpFormValues.userTypes,
            });
            window.location.reload();
            toast.success("Sign-up successful please login to continue");
        } catch (ex) {
            toast.error(ex.response.data.message);
            seterrorMessage(ex.response.data.message);
        }
    }

    const toggleSignUp = () => {
        setSignUp(!showSignUP);
    };
    function handleLoginFromChange(event) {
        setLoginFormValues({
            ...LoginFormValues,
            [event.target.name]: event.target.value,
        });
    }
    function handleSignUpFormChange(event) {
        setSignUpFormValues({
            ...SignUpFormValues,
            [event.target.name]: event.target.value,
        });
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            switch (localStorage.getItem("userTypes")) {
                case "CUSTOMER":
                    navigate("/customer");
                    break;
                case "ENGINEER":
                    navigate("/engineer");
                    break;
                case "ADMIN":
                    navigate("/admin");
                    break;
                default:
            }
        }
    }, []);

    return (
        <div id="login-page">
            <div className="bg-primary  d-flex justify-content-center align-item-center vh-100">
                <div className="card m-auto p-3">
                    <div className="row m-2">
                        <div className="col">
                            {!showSignUP ? (
                                <div>
                                    <h4 className="text-center">Login</h4>
                                    <form onSubmit={handleLogin}>
                                        <div className="input-group m-1">
                                            <input
                                                type="text"
                                                name="userId"
                                                placeholder="Enter your user id"
                                                className="form-control"
                                                value={LoginFormValues.userId}
                                                onChange={handleLoginFromChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-1">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="form-control"
                                                onChange={handleLoginFromChange}
                                                value={LoginFormValues.password}
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-1">
                                            <input
                                                type="submit"
                                                className="form-control btn btn-primary"
                                                value="login"
                                            />
                                        </div>
                                        <div
                                            className="signup-btn text-right"
                                            style={{ cursor: "pointer" }}
                                            onClick={toggleSignUp}>
                                            Don't have an account? SignUp
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="text-center">Sign-up</h4>
                                    <form onSubmit={handleSignUp}>
                                        <div className="input-group m-1">
                                            <input
                                                type="text"
                                                name="userId"
                                                placeholder="Enter a user id"
                                                className="form-control"
                                                onChange={
                                                    handleSignUpFormChange
                                                }
                                                value={SignUpFormValues.userId}
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-1">
                                            <input
                                                type="username"
                                                name="Username"
                                                placeholder="Enter a username"
                                                className="form-control"
                                                onChange={
                                                    handleSignUpFormChange
                                                }
                                                value={
                                                    SignUpFormValues.Username
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-1">
                                            <Form.Select
                                                aria-label="user Type selection"
                                                value={
                                                    SignUpFormValues.userTypes
                                                }
                                                name="userTypes"
                                                onChange={
                                                    handleSignUpFormChange
                                                }>
                                                <option value="CUSTOMER">
                                                    CUSTOMER
                                                </option>
                                                <option value="ENGINEER">
                                                    ENGINEER
                                                </option>
                                                <option value="ADMIN">
                                                    ADMIN
                                                </option>
                                            </Form.Select>
                                        </div>
                                        <div className="input-group m-1">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={SignUpFormValues.email}
                                                onChange={
                                                    handleSignUpFormChange
                                                }
                                                placeholder="Enter an email"
                                            />
                                        </div>
                                        <div className="input-group m-1">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                value={
                                                    SignUpFormValues.password
                                                }
                                                placeholder="Enter a password"
                                                onChange={
                                                    handleSignUpFormChange
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-2 width-100px">
                                            <input
                                                type="submit"
                                                className="form-control btn btn-primary"
                                                value="Signup"
                                            />
                                        </div>

                                        <div
                                            className="signup-btn text-right"
                                            style={{ cursor: "pointer" }}
                                            onClick={toggleSignUp}>
                                            Already have an account? Login
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
