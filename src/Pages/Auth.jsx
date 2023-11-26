import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Constants.js";
import wallpaper from "../assets/4k_crm_wallpaper.jpg";
import "./Auth.css";

const Auth = () => {
    const [showSignUP, setSignUp] = useState(false);
    const [errorMessage, seterrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

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
            setIsProcessing(true);
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

            switch (data.userType) {
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
            toast.success("Logged in successfully!");
        } catch (ex) {
            toast.error(ex.response.data.message);
            seterrorMessage(ex.response.data.message);
        } finally {
            setIsProcessing(false);
        }
    };

    async function handleSignUp(event) {
        event.preventDefault();
        try {
            setIsProcessing(true);
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
        } finally {
            setIsProcessing(false);
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
            <div
                className="loginContainer d-flex justify-content-center align-item-center vh-100"
                style={{
                    background: `url(${wallpaper}) center/cover no-repeat`,
                }}>
                <div className="loginCard m-auto p-3">
                    <div className="row m-2">
                        <div className="col">
                            {!showSignUP ? (
                                <div>
                                    <h4
                                        className="text-center"
                                        style={{ color: "white" }}>
                                        Login to ClientFlow
                                    </h4>
                                    <form onSubmit={handleLogin}>
                                        <div className="input-group m-1 mt-4">
                                            <input
                                                type="text"
                                                name="userId"
                                                placeholder="Enter your user id"
                                                className="textField form-control"
                                                value={LoginFormValues.userId}
                                                onChange={handleLoginFromChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-1 mt-2">
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="textField form-control"
                                                onChange={handleLoginFromChange}
                                                value={LoginFormValues.password}
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-1 mt-2">
                                            <input
                                                type="submit"
                                                className="submitBtn form-control btn btn-primary"
                                                value={
                                                    isProcessing
                                                        ? "Logging in..."
                                                        : "Login"
                                                }
                                                disabled={isProcessing}
                                            />
                                        </div>
                                        <div
                                            className="signupPrompt signup-btn text-right"
                                            onClick={toggleSignUp}>
                                            Don't have an account? SignUp
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <h4
                                        className="text-center"
                                        style={{ color: "white" }}>
                                        Sign-up for ClientFlow
                                    </h4>
                                    <form onSubmit={handleSignUp}>
                                        <div className="input-group m-1 mt-4">
                                            <input
                                                type="text"
                                                name="userId"
                                                placeholder="Enter a user id"
                                                className="textField form-control"
                                                onChange={
                                                    handleSignUpFormChange
                                                }
                                                value={SignUpFormValues.userId}
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-1 mt-2">
                                            <input
                                                type="username"
                                                name="Username"
                                                placeholder="Enter a username"
                                                className="textField form-control"
                                                onChange={
                                                    handleSignUpFormChange
                                                }
                                                value={
                                                    SignUpFormValues.Username
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="input-group m-1 mt-2">
                                            <Form.Select
                                                className="textField"
                                                aria-label="user Type selection"
                                                value={
                                                    SignUpFormValues.userTypes
                                                }
                                                name="userTypes"
                                                onChange={
                                                    handleSignUpFormChange
                                                }>
                                                <option disabled value="">
                                                    Select a user type
                                                </option>
                                                <option
                                                    className="listOption"
                                                    value="CUSTOMER">
                                                    CUSTOMER
                                                </option>
                                                <option
                                                    className="listOption"
                                                    value="ENGINEER">
                                                    ENGINEER
                                                </option>
                                                <option
                                                    className="listOption"
                                                    value="ADMIN">
                                                    ADMIN
                                                </option>
                                            </Form.Select>
                                        </div>
                                        <div className="input-group m-1 mt-2">
                                            <input
                                                type="email"
                                                name="email"
                                                className="textField form-control"
                                                value={SignUpFormValues.email}
                                                onChange={
                                                    handleSignUpFormChange
                                                }
                                                placeholder="Enter an email"
                                            />
                                        </div>
                                        <div className="input-group m-1 mt-2">
                                            <input
                                                type="password"
                                                name="password"
                                                className="textField form-control"
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
                                        <div className="input-group m-1 mt-2 width-100px">
                                            <input
                                                type="submit"
                                                className="submitBtn form-control btn btn-primary"
                                                value={
                                                    isProcessing
                                                        ? "Signing up..."
                                                        : "Signup"
                                                }
                                                disabled={isProcessing}
                                            />
                                        </div>

                                        <div
                                            className="loginPrompt signup-btn text-right"
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
