export interface Event {
  eventId: number;
  name: string;
  description: string;
  imageUri: string;
  location: string;
  startDate: string;
  soldOut: boolean;
  ticketTotal: number;
  ticketSold: number;
  owner: string;
  ticketRemaining: number;
}
