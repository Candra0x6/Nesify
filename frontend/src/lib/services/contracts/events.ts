import { marketContract, signers } from "@/lib/contract/cont";
import { client } from "@/lib/thirdweb-dev";
import { Event } from "@/types/event";
import { ContractRes } from "@/utils/type";
import { BigNumber } from "ethers";
import { download } from "thirdweb/storage";

export async function getAllEvents(): Promise<ContractRes<Event[]>> {
  try {
    const data = await marketContract.getAllEvents();
    const allEvents = await Promise.all(
      data.map(
        async (i: {
          eventId: BigNumber;
          uri: string;
          ticketTotal: BigNumber;
          ticketsSold: BigNumber;
          owner: string;
        }) => {
          const eventUri = await i.uri;
          if (!eventUri) {
            throw new Error(
              `Event URI does not exist for Event Id ${i.eventId.toNumber()}`
            );
          }

          const response = await download({
            client: client,
            uri: eventUri,
          });
          const eventData = await response.json();
          const soldOut =
            i.ticketTotal.toNumber() - i.ticketsSold.toNumber() == 0;
          const currEvent = {
            eventId: i.eventId.toNumber(),
            name: eventData.name,
            description: eventData.description,
            imageUri: eventData.image,
            location: eventData.location,
            startDate: eventData.eventDate,
            soldOut,
            ticketTotal: i.ticketTotal.toNumber(),
            ticketSold: i.ticketsSold.toNumber(),
            owner: i.owner,
            ticketRemaining:
              i.ticketTotal.toNumber() - i.ticketsSold.toNumber(),
          };
          return currEvent;
        }
      )
    );

    return {
      data: allEvents,
      message: "Events loaded successfully",
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      message: "Error loading events",
      error: error as string,
    };
  }
}
export async function getEventById(
  eventId: string
): Promise<ContractRes<Event | null>> {
  try {
    if (!Number.isInteger(parseInt(eventId))) {
      throw new Error(`Event ID '${eventId}' is not valid`);
    }
    const data = await marketContract.getEvent(eventId);
    const eventUri = await data.uri;
    if (!eventUri) {
      throw new Error(`Could not find URI for the Event ID #${eventId}`);
    }
    const response = await download({
      client: client,
      uri: eventUri,
    });
    const eventData = await response.json();

    const currEvent = {
      eventId: data.eventId.toNumber(),
      name: eventData.name,
      description: eventData.description,
      imageUri: eventData.image,
      location: eventData.location,
      startDate: eventData.eventDate,
      owner: data.owner,
      soldOut: data.ticketTotal.toNumber() - data.ticketsSold.toNumber() == 0,
      ticketTotal: data.ticketTotal.toNumber(),
      ticketSold: data.ticketsSold.toNumber(),
      ticketRemaining:
        data.ticketTotal.toNumber() - data.ticketsSold.toNumber(),
    };
    return {
      data: currEvent,
      message: "Event loaded successfully",
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Error loading event",
      error: error as string,
    };
  }
}
export async function getUserEvents(): Promise<ContractRes<Event[]>> {
  try {
    const signedContracts = await signers();
    const { signedMarketContract } = signedContracts;

    const data = await signedMarketContract.getMyEvents();

    const allEvents = await Promise.all(
      data.map(
        async (i: {
          uri: string;
          ticketTotal: BigNumber;
          ticketsSold: BigNumber;
          owner: string;
          eventId: BigNumber;
        }) => {
          const eventUri = await i.uri;
          if (!eventUri) {
            throw new Error(
              `Event URI does not exist for Event Id ${i.eventId.toNumber()}`
            );
          }
          const response = await download({
            client: client,
            uri: eventUri,
          });
          const eventData = await response.json();
          const ticketRemaining =
            i.ticketTotal.toNumber() - i.ticketsSold.toNumber();
          const currEvent = {
            eventId: i.eventId.toNumber(),
            name: eventData.name,
            description: eventData.description,
            imageUri: eventData.image,
            location: eventData.location,
            startDate: eventData.eventDate,
            ticketTotal: i.ticketTotal.toNumber(),
            ticketRemaining,
            owner: i.owner,
          };
          return currEvent;
        }
      )
    );
    return {
      data: allEvents,
      message: "Events loaded successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error loading events",
      error: error as string,
    };
  }
}
