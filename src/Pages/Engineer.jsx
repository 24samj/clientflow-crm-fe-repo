import { useState } from "react";
// import { BASE_URL } from "../Constans";
// import axios from "axios";
import MaterialTable from "@material-table/core";

// import { Button, Form, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import Sidebar from "../Component/SideBar.jsx";
//import StatusCard from "../Component/StatusCard";

// import { useNavigate } from "react-router-dom";
import Loader from "../Component/loder.jsx";
import StatusRow from "../Component/statusRow.jsx";
import useTickets from "../hooks/useTickets.jsx";
import useAuth from "../hooks/useAuth.jsx";
import WelcomeMsg from "../Component/Welcomemsg.jsx";
import UpdateTicketModal from "../Component/UpdateTicketModal.jsx";

const Enginner = () => {
    const [showModal, setShowModal] = useState(false);
    const [ticketDetail, setTicketDetail] = useState({});
    useAuth();
    const [isLoading, ticketList, setTicketList] = useTickets();

    // const navigate = useNavigate();

    // const FetchTicket = async () => {
    //   try {
    //     setTicketAssignLoading(true);
    //     const { data } = await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
    //       headers: {
    //         "x-access-token": localStorage.getItem("token"),
    //       },
    //     });
    //     SetTicketList(data);
    //   } catch (ex) {
    //   } finally {
    //     setTicketAssignLoading(false);
    //   }
    // };

    const handdleRowClick = (event, rowData) => {
        setShowModal(true);
        setTicketDetail(rowData);
    };
    const changeTicketDetails = (event) => {
        setTicketDetail({
            ...ticketDetail,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <div className="row bg-light vh-100">
                <Sidebar unfoldable={true} />
                <div className="col my-4">
                    <div className="container">
                        <div>
                            <WelcomeMsg
                                name={localStorage.getItem("name")}
                                userType="engineer"
                            />
                            <StatusRow ticketList={ticketList} />
                            <hr />
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <MaterialTable
                                    onRowClick={handdleRowClick}
                                    title="Ticket assigned to me "
                                    data={ticketList}
                                    columns={[
                                        { title: "Track id ", field: "id" },
                                        {
                                            title: "Title",
                                            field: "title",
                                        },
                                        {
                                            title: "Description",
                                            field: "description",
                                        },
                                        {
                                            title: "Reporter",
                                            field: "reporter",
                                        },
                                        {
                                            title: "TicketPriority",
                                            field: "ticketPriority",
                                        },
                                        {
                                            title: "Assignee",
                                            field: "assignee",
                                        },
                                        {
                                            title: "Status",
                                            field: "status",
                                        },
                                    ]}
                                />
                            )}
                            <UpdateTicketModal
                                showModal={showModal}
                                setShowModal={setShowModal}
                                ticketDetail={ticketDetail}
                                changeTicketDetails={changeTicketDetails}
                                ticketList={ticketList}
                                setTicketList={setTicketList}
                                statusOptions={[
                                    "OPEN",
                                    "CLOSED",
                                    "IN_PROGRESS",
                                    "BLOCKED",
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Enginner;
