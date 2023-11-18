export const getTicketCount = (ticketList, status) =>
  ticketList.filter((ticket) => ticket.status === status).length;
