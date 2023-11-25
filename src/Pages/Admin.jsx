import { useEffect, useState } from "react";

import axios from "axios";
import MaterialTable from "@material-table/core";

import { Button, Form, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import Sidebar from "../Component/SideBar.jsx";
import Loader from "../Component/Loader.jsx";
import { BASE_URL } from "../Constants.js";
import StatusRow from "../Component/StatusRow.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { toast } from "react-toastify";
import WelcomeMsg from "../Component/WelcomeMsg.jsx";

const Admin = () => {
    const [userList, setUsersList] = useState([]);
    const [isUserListLoading, setIsUserslistLoading] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const [ticketList, setTicketList] = useState([]);
    useAuth();

    const FetchUsers = async () => {
        try {
            setIsUserslistLoading(true);
            const { data } = await axios.get(BASE_URL + "/crm/api/v1/users/");
            setUsersList(data);
        } catch (ex) {
            toast.error("Error occured while fetching the list of users.");
        } finally {
            setIsUserslistLoading(false);
        }
    };

    const fetchTickets = async () => {
        try {
            const { data } = await axios.get(
                `${BASE_URL}/crm/api/v1/tickets/all`
            );
            console.log(data);
            setTicketList(data);
        } catch (ex) {
            toast.error("Error occured while fetching the ticket counts.");
        }
    };

    const updateUserDetail = async (event) => {
        event.preventDefault();

        try {
            await axios.put(
                `${BASE_URL}/crm/api/v1/users/${userDetail.userId}`,
                {
                    userType: userDetail.userType,
                    userStatus: userDetail.userStatus,
                    name: userDetail.name,
                    email: userDetail.email,
                }
            );

            toast.success("User detail updated successfully");

            setUsersList(
                userList.map((user) =>
                    user.userId === userDetail.userId ? userDetail : user
                )
            );
            setShowUserModal(false);
        } catch (ex) {
            toast.error(
                "Error occured while updating user details. Please try again in a minute."
            );
        }
    };

    const handdleRowClick = (event, rowData) => {
        setShowUserModal(true);
        setUserDetail({
            name: rowData.name,
            userId: rowData.userId,
            email: rowData.email,
            userStatus: rowData.userStatus,
            userType: rowData.userType,
        });
    };
    const changeUsersDetail = (event) => {
        setUserDetail({
            ...userDetail,
            [event.target.name]: event.target.value,
        });
    };
    useEffect(() => {
        FetchUsers();
    }, []);

    return (
        <>
            <div className="row bg-light vh-100">
                <Sidebar />
                <div className="col my-4">
                    <div className="container">
                        <div>
                            <WelcomeMsg
                                name={localStorage.getItem("name")}
                                userType="admin"
                            />
                            <StatusRow ticketList={ticketList} />
                            <hr />
                            {isUserListLoading ? (
                                <Loader />
                            ) : (
                                <MaterialTable
                                    onRowClick={handdleRowClick}
                                    title="USER RECORDS"
                                    data={userList}
                                    columns={[
                                        { title: "User ID", field: "userId" },
                                        {
                                            title: "Name",
                                            field: "name",
                                        },
                                        {
                                            title: "Email",
                                            field: "email",
                                        },
                                        {
                                            title: "Role",
                                            field: "userType",
                                        },
                                        {
                                            title: "Status",
                                            field: "userStatus",
                                        },
                                    ]}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showUserModal}
                onHide={() => setShowUserModal(false)}
                centered
                backdrop="static"
                keyboard>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <form>
                        <h5 className="card-subtitle mb-2 text-primary lead">
                            User ID: {userDetail.userId}
                        </h5>
                        <hr />
                        <div className="input-group mb-3">
                            <span className="input-group-text">Name</span>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={userDetail.name}
                                onChange={changeUsersDetail}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Email</span>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={userDetail.email}
                                onChange={changeUsersDetail}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Type</span>
                            <Form.Select
                                aria-label="User Type Selection"
                                value={userDetail.userType}
                                onChange={changeUsersDetail}
                                name="userType">
                                <option value="CUSTOMER">CUSTOMER</option>
                                <option value="ENGINEER">ENGINEER</option>
                                <option value="ADMIN">ADMIN</option>
                            </Form.Select>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Status</span>
                            <Form.Select
                                aria-label="User Status Selection"
                                value={userDetail.userStatus}
                                onChange={changeUsersDetail}
                                name="userStatus">
                                <option value="APPROVED">APPROVED</option>
                                <option value="REJECTED">REJECTED</option>
                                <option value="PENDING">PENDING</option>
                            </Form.Select>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="secondary"
                        onClick={() => setShowUserModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateUserDetail}>
                        Update
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Admin;
