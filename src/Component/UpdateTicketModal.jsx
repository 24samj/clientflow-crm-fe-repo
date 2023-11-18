import { BASE_URL } from "../Constans";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal, Button, ModalBody, ModalFooter } from "react-bootstrap";

const UpdateTicketModal = ({
    showModal,
    setShowModal,
    ticketDetail,
    changeTicketDetails,
    ticketList,
    setTicketList,
    statusOptions,
}) => {
    const updateTicketDetail = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.put(
                `${BASE_URL}/crm/api/v1/tickets/${ticketDetail.id}`,
                ticketDetail
            );

            setShowModal(false);
            toast.success("Successfully updated the ticket details.");
            setTicketList(
                ticketList.map((ticket) =>
                    ticket.id === ticketDetail.id ? data : ticket
                )
            );
        } catch (ex) {
            toast.error("Error while updating the ticket details.");
        }
    };
    return (
        <>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                backdrop="static"
                keyboard>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Ticket Details</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <form onSubmit={updateTicketDetail}>
                        <div className="p-1">
                            <h5 className="card-subtitle mb-2 text-primary lead">
                                Ticket Id: {ticketDetail.id}
                            </h5>
                            <hr />
                            <div className="input-group mb-3">
                                <span className="input-group-text">Title</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={ticketDetail.title}
                                    required
                                    onChange={changeTicketDetails}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    Assignee
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={ticketDetail.assignee}
                                    disabled
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    Priority
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ticketPriority"
                                    value={ticketDetail.ticketPriority}
                                    onChange={changeTicketDetails}
                                    required
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Status</span>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={ticketDetail.status}
                                    onChange={changeTicketDetails}>
                                    {statusOptions.map((status) => (
                                        <option value={status} key={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="md-form amber-textarea active-amber-textarea-2">
                            <textarea
                                name="description"
                                rows="3"
                                className="md-textarea form-control"
                                value={ticketDetail.description}
                                onChange={changeTicketDetails}
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateTicketDetail}>
                        Update
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default UpdateTicketModal;
