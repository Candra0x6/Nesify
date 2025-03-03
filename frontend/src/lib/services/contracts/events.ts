import {
  prepareContractCall,
  PrepareTransactionOptions,
  PreparedTransaction,
  prepareEvent,
} from "thirdweb";
import { TicketMarketContract } from "@/lib/contract";
import type { Abi } from "abitype";

export type PreparedCreateEvent = PreparedTransaction<
  Abi,
  {
    readonly name: "createEvent";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "string";
        readonly name: "uri";
      },
      {
        readonly type: "uint64";
        readonly name: "startDate";
      }
    ];
    readonly outputs: readonly [
      {
        readonly type: "uint256";
      }
    ];
  },
  PrepareTransactionOptions
>;

type CreateEventResult = {
  success: boolean;
  message: string;
  transaction?: PreparedCreateEvent;
};

export const createEventFn = async ({
  uri,
  startDate,
}: {
  uri: string;
  startDate: bigint;
}): Promise<CreateEventResult> => {
  try {
    const transaction = prepareContractCall({
      contract: TicketMarketContract,
      method:
        "function createEvent(string uri, uint64 startDate) returns (uint256)",
      params: [uri, startDate],
    }) as PreparedCreateEvent;

    return {
      success: true,
      message: "Event Created Successfully",
      transaction,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create token",
    };
  }
};

// Event Functions

export const getAllEventsFn = () => {
  return {
    contract: TicketMarketContract,
    method:
      "function getAllEvents() view returns ((uint256 eventId, string uri, uint64 startDate, uint256 ticketTotal, uint256 ticketsSold, address owner)[])",
    params: [],
  };
};

export const getEventByIdFn = (_eventId: bigint) => {
  return {
    contract: TicketMarketContract,
    method:
      "function getEvent(uint256 _eventId) view returns ((uint256 eventId, string uri, uint64 startDate, uint256 ticketTotal, uint256 ticketsSold, address owner))",
    params: [_eventId],
  };
};

export const getEventTicketsFn = (_eventId: bigint) => {
  return {
    contract: TicketMarketContract,
    method:
      "function getEventTickets(uint256 _eventId) view returns ((uint256 tokenId, uint256 eventId, uint256 price, uint256 purchaseLimit, uint256 totalSupply, uint256 royaltyFee, uint256 maxResalePrice)[])",
    params: [_eventId],
  };
};

export const getUserEventsFn = () => {
  return {
    contract: TicketMarketContract,
    method:
      "function getMyEvents() view returns ((uint256 eventId, string uri, uint64 startDate, uint256 ticketTotal, uint256 ticketsSold, address owner)[])",
    params: [],
  };
};

export const getUserEventListingsFn = () => {
  return {
    contract: TicketMarketContract,
    method:
      "function getMyResaleListings() view returns ((uint256 resaleId, uint256 tokenId, address seller, uint256 resalePrice, bool sold)[])",
    params: [],
  };
};
export const marketEventCreated = prepareEvent({
  signature:
    "event MarketEventCreated(uint256 indexed eventId, string uri, uint64 startDate, uint256 ticketTotal, uint256 ticketsSold, address owner)",
});
