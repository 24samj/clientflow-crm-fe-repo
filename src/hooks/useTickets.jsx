import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constants.js";

export default function useTickets() {
    const [ticketList, setTicketList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTickets = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${BASE_URL}/crm/api/v1/tickets`);
            setTicketList(data);
        } catch (ex) {
            toast.error("Error occured while fetching the list of tickets.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchTickets();
        }
    }, [localStorage.getItem("token")]);

    return [isLoading, ticketList, setTicketList, fetchTickets];
}
