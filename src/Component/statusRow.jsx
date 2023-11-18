import { getTicketCount } from "../utils/utils.js";
import StatusCard from "./StatusCard.jsx";

const StatusRow = ({ ticketList }) => {
    return (
        <>
            <div className="row my-5 mx-2 text-center">
                <StatusCard
                    cardColor="warning"
                    cardText="OPEN"
                    cardValue={getTicketCount(ticketList, "OPEN")}
                />
                <StatusCard
                    cardColor="primary"
                    cardText="In PROGRESS"
                    cardValue={getTicketCount(ticketList, "IN_PROGRESS")}
                />
                <StatusCard
                    cardColor="secondary"
                    cardText=" BLOCKED"
                    cardValue={getTicketCount(ticketList, "BLOCKED")}
                />
                <StatusCard
                    cardColor="success"
                    cardText="CLOSED"
                    cardValue={getTicketCount(ticketList, "CLOSED")}
                />
            </div>
        </>
    );
};

export default StatusRow;
