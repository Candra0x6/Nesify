import { download } from "thirdweb/storage";
import { marketContract, signers, tokenContract } from "@/lib/contract/cont";
import { client, NFTContract } from "@/lib/thirdweb-dev";
import { BigNumber, ethers } from "ethers";
import GdbConversion from "@/lib/conversion/gbp";
import { ContractRes } from "@/utils/type";
import { convertBigNumber } from "@/lib/utils";
import { Ticket } from "@/types/ticket";
import Matic from "@/lib/conversion/matic";

export type ResaleDetails = {
  maxPrice: {
    matic: number;
    gbp: number;
  };
  royaltyFee: number;
};

export type ResaleTicket = {
  resaleId: number;
  seller: string;
  price: string;
  gbpPrice: number;
  tokenId: number;
  ticket: Ticket;
};

export async function getResaleTicketsByTokenId(
  tokenId: string
): Promise<ContractRes<ResaleTicket[]>> {
  try {
    const data = await marketContract.getResaleTickets(tokenId);
    console.log(data);
    const ticket = await getTicketById(tokenId);
    const resaleTickets = await Promise.all(
      data.map(
        async (i: {
          resaleId: BigNumber;
          seller: string;
          resalePrice: BigNumber;
          tokenId: BigNumber;
        }) => {
          console.log(i);
          const price =
            i.resalePrice && i.resalePrice._isBigNumber
              ? ethers.utils.formatUnits(i.resalePrice.toString(), "ether")
              : "0";
          const gbpPrice = await GdbConversion(Number(price));
          const _ticket = {
            resaleId:
              i.resaleId && i.resaleId._isBigNumber ? i.resaleId.toNumber() : 0,
            seller: i.seller,
            price,
            gbpPrice,
            tokenId,
            ticket: ticket.data,
          };
          return _ticket;
        }
      )
    );
    return {
      data: resaleTickets,
      message: "Resale tickets loaded successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error loading resale tickets",
      error: error as string,
    };
  }
}

// IDK
export async function getResaleTicketDetails(
  ticketId: number
): Promise<ContractRes<ResaleDetails | null>> {
  try {
    const data = await marketContract.getResaleTickets(ticketId);
    console.log(data);
    if (!Number.isInteger(ticketId)) {
      throw new Error("Ticket ID was not valid");
    }
    const ticketUri = await tokenContract.uri(ticketId);
    const response = await download({
      client: client,
      uri: ticketUri,
    });
    const ticketData = await response.json();
    console.log(ticketData);
    const maxResalePrice = ticketData.properties.maxResalePrice;

    const gbpMaxPrice = await GdbConversion(
      Number(convertBigNumber(maxResalePrice))
    );
    return {
      data: {
        maxPrice: {
          matic: Number(convertBigNumber(maxResalePrice)),
          gbp: gbpMaxPrice,
        },
        royaltyFee: ticketData.properties.royaltyFee,
      },
      message: "Resale details loaded successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error loading resale details",
      error: error as string,
    };
  }
}

export async function getResaleTicketsById({
  tokenId,
}: {
  tokenId: number;
}): Promise<ContractRes<Ticket[]>> {
  try {
    const data = await marketContract.getResaleTickets(tokenId);
    console.log(data);
    const tickets = await Promise.all(
      data.map(
        async (i: {
          resaleId: BigNumber;
          seller: string;
          resalePrice: BigNumber;
          tokenId: BigNumber;
          eventId: BigNumber;
          eventName: string;
          imageUri: string;
          startDate: number;
          location: string;
          ticketName: string;
          quantity: BigNumber;
        }) => {
          const price = ethers.utils.formatUnits(
            i.resalePrice.toString(),
            "ether"
          );
          const gbpPrice = await GdbConversion(Number(price));
          const _ticket = {
            resaleId: i.resaleId.toNumber(),
            seller: i.seller,
            price,
            gbpPrice,
            tokenId,
            eventId: i.eventId.toNumber(),
            eventName: i.eventName,
            imageUri: i.imageUri,
            startDate: i.startDate,
            location: i.location,
            ticketName: i.ticketName,
            quantity: i.quantity.toNumber(),
          };
          return _ticket;
        }
      )
    );
    return {
      data: tickets,
      message: "Resale tickets loaded successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error loading resale tickets",
      error: error as string,
    };
  }
}

type EventTicket = {
  buyQty: number;
  description: string;
  gbpPrice: string;
  gdbMaxPrice: string;
  limit: number;
  maxResalePrice: string;
  myQty: number;
  name: string;
  price: string;
  purcesLimit: string;
  quantity: number;
  resaleAvail: boolean;
  royaltyFee: string;
  tokenId: number;
  tokenSupply: string;
};
export async function getEventTickets(
  eventId: number
): Promise<ContractRes<EventTicket[]>> {
  try {
    const contract = await signers();
    const { signer } = contract;
    const address = await signer.getAddress();
    const data = await marketContract.getEventTickets(eventId);
    console.log("event tickets", data);
    const eventTickets = await Promise.all(
      data.map(
        async (i: {
          tokenId: BigNumber;
          price: BigNumber;
          purchaseLimit: BigNumber;
          totalSupply: BigNumber;
          royaltyFee: BigNumber;
          maxResalePrice: BigNumber;
        }) => {
          const tokenId = i.tokenId.toNumber();
          const tokenUri = await tokenContract.uri(tokenId);
          const response = await download({
            client: client,
            uri: tokenUri,
          });
          const ticketData = await response.json();

          const resaleTickets = await marketContract.getResaleTickets(tokenId);
          const resaleAvail = resaleTickets.length > 0 ? true : false;
          const price = ethers.utils.formatUnits(i.price.toString(), "ether");
          const gbpPrice = await GdbConversion(Number(price));
          const qty = await tokenContract.balanceOf(address, tokenId);
          const myQty = await tokenContract.balanceOf(address, tokenId);
          const ticketCompareData = {
            tokenId,
            name: ticketData.name,
            description: ticketData.description,
            price,
            gbpPrice,
            limit: i.purchaseLimit.toNumber(),
            quantity: qty.toNumber(),
            resaleAvail,
            buyQty: 0,
            myQty: myQty.toNumber(),
            tokenSupply: convertBigNumber(i.totalSupply),
            purcesLimit: convertBigNumber(i.purchaseLimit),
            royaltyFee: convertBigNumber(i.royaltyFee),
            maxResalePrice: convertBigNumber(i.maxResalePrice),
            gdbMaxPrice: await GdbConversion(
              Number(convertBigNumber(i.maxResalePrice))
            ),
          };
          return ticketCompareData;
        }
      )
    );
    return {
      data: eventTickets,
      message: "Event tickets loaded successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error loading event tickets",
      error: error as string,
    };
  }
}

export type MyTicket = Ticket & {
  maxPrice: {
    matic: number;
    gbp: number;
  };
  royaltyFee: number;
};
export async function getMyTickets(): Promise<ContractRes<MyTicket[]>> {
  try {
    const signedContracts = await signers();
    const { signedMarketContract, signer } = signedContracts;
    const userAddress = await signer.getAddress();
    const ticketContractData = await signedMarketContract.getMyTickets(
      NFTContract
    );
    console.log(ticketContractData);
    const myTickets = await Promise.all(
      ticketContractData.map(
        async (i: {
          tokenId: BigNumber;
          eventId: BigNumber;
          price: BigNumber;
          quantity: BigNumber;
          maxResalePrice: BigNumber;
          royaltyFee: BigNumber;
        }) => {
          console.log(i);
          const tokenId = i.tokenId.toNumber();
          const tokenUri = await tokenContract.uri(tokenId);
          console.log(tokenUri);
          const respose = await download({
            client: client,
            uri: tokenUri,
          });
          const ticketData = await respose.json();

          const eventId = i.eventId.toNumber();
          const eventContractData = await signedMarketContract.getEvent(
            eventId
          );
          const eventUri = await eventContractData.uri;
          console.log(eventUri);
          const response = await download({
            client: client,
            uri: eventUri,
          });
          const eventData = await response.json();

          const price = ethers.utils.formatUnits(i.price.toString(), "ether");
          const gbpPrice = await GdbConversion(Number(price));
          const qty = await tokenContract.balanceOf(userAddress, tokenId);
          const maxPrice = convertBigNumber(i.maxResalePrice);
          const maxPriceMatic = await Matic(Number(maxPrice));
          const royaltyFee = await Matic(
            Number(convertBigNumber(i.royaltyFee))
          );
          const gdbMaxPrice = await GdbConversion(Number(maxPrice));
          const _ticket: MyTicket = {
            eventId: i.eventId.toString(),
            eventName: eventData.name,
            imageUri: eventData.image,
            startDate: eventData.eventDate,
            location: eventData.location,
            tokenId,
            ticketName: ticketData.name,
            price,
            gbpPrice,
            eventDescription: eventData.description,
            ticketDescription: ticketData.description,
            maxPrice: {
              matic: maxPriceMatic,
              gbp: gdbMaxPrice,
            },
            royaltyFee: royaltyFee,
            quantity: qty.toNumber(),
          };
          return _ticket;
        }
      )
    );
    return {
      data: myTickets,
      message: "Tickets loaded successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error loading tickets",
      error: error as string,
    };
  }
}

export async function getTicketById(
  tokenId: string
): Promise<ContractRes<Ticket | null>> {
  try {
    if (!Number.isInteger(parseInt(tokenId))) {
      throw new Error(`Ticket ID '${tokenId}' is not valid`);
    }
    const signedContracts = await signers();
    const { signer } = signedContracts;
    const address = await signer.getAddress();
    let myBalance = await tokenContract.balanceOf(address, tokenId);
    myBalance = myBalance.toNumber();
    // if (myBalance < 1) {
    //   throw new Error(`You do not own the Ticket ID #${tokenId}`);
    // }
    const ticketUri = await tokenContract.uri(tokenId);
    if (!ticketUri) {
      throw new Error("Could not find Token URI");
    }
    const response = await download({
      client: client,
      uri: ticketUri,
    });
    const ticketData = await response.json();
    const eventId = ticketData.properties.eventId;

    const eventContractData = await marketContract.getEvent(eventId);
    const eventUri = await eventContractData.uri;
    const eventResponse = await download({
      client: client,
      uri: eventUri,
    });
    const eventData = await eventResponse.json();

    const price = ticketData.properties.price;
    const gbpPrice = await GdbConversion(Number(price));

    const _ticket = {
      eventId,
      eventName: eventData.name,
      eventDescription: eventData.description,
      imageUri: eventData.image,
      startDate: eventData.eventDate,
      location: eventData.location,
      tokenId: Number(tokenId),
      ticketName: ticketData.name,
      ticketDescription: ticketData.description,
      price,
      gbpPrice,
      quantity: myBalance,
    };
    return {
      data: _ticket,
      message: "Ticket loaded successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error loading ticket",
      error: error as string,
    };
  }
}

// POST METHOD
export async function listForResale(
  ticketId: number,
  resalePrice: {
    gbp: number;
    matic: number;
  },
  maxPrice: {
    gbp: number;
    matic: number;
  }
) {
  try {
    if (!resalePrice.gbp || !(resalePrice.gbp >= 0)) {
      throw new Error("Please enter a postive price");
    }

    if (resalePrice.gbp > maxPrice.gbp) {
      throw new Error("Resale price must be less than the max price");
    }
    const contracts = await signers();
    const { signedMarketContract, signedTokenContract } = contracts;

    const price = ethers.utils.parseUnits(
      resalePrice.matic.toString(),
      "ether"
    );
    const approvalTransaction = await signedTokenContract.giveResaleApproval(
      ticketId
    );
    await approvalTransaction.wait();
    const resaleTransaction = await signedMarketContract.listOnResale(
      NFTContract,
      ticketId,
      price
    );
    await resaleTransaction.wait();
    return {
      data: [],
      message: "Tickets listed for resale successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error listing tickets for resale",
      error: error as string,
    };
  }
}

export async function buyResaleTicket(resaleId: number, price: number) {
  try {
    const signedContracts = await signers();
    const { signedMarketContract } = signedContracts;

    const ticketPrice = ethers.utils.parseUnits(price.toString(), "ether");
    const transaction = await signedMarketContract.buyResaleTicket(
      NFTContract,
      resaleId,
      {
        value: ticketPrice,
      }
    );
    await transaction.wait();
    return {
      data: [],
      message: "Ticket bought successfully",
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error buying ticket",
      error: error as string,
    };
  }
}

export async function buyTicket(id: number, price: string, qty: number) {
  try {
    const signedContracts = await signers();
    const { signedMarketContract } = signedContracts;
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    /* user will be prompted to pay the asking proces to complete the transaction */
    const ticketPrice = ethers.utils.parseUnits(price, "ether");
    const transaction = await signedMarketContract.buyTicket(
      NFTContract,
      id,
      qty,
      {
        value: ticketPrice.mul(qty),
      }
    );
    await transaction.wait();
  } catch (error) {
    console.log(error);
  }
}
