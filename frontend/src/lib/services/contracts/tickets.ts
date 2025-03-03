import {
  prepareContractCall,
  PrepareTransactionOptions,
  PreparedTransaction,
  prepareEvent,
} from "thirdweb";
import { NFTTicketContract } from "@/lib/contract";
import type { Abi } from "abitype";

type PreparedCreateMarketTicket = PreparedTransaction<
  Abi,
  {
    readonly name: "createMarketTicket";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "uint256";
        readonly name: "eventId";
      },
      {
        readonly type: "uint256";
        readonly name: "tokenId";
      },
      {
        readonly type: "address";
        readonly name: "nftContract";
      },
      {
        readonly type: "uint256";
        readonly name: "purchaseLimit";
      },
      {
        readonly type: "uint256";
        readonly name: "totalSupply";
      },
      {
        readonly type: "uint256";
        readonly name: "price";
      },
      {
        readonly type: "uint256";
        readonly name: "royaltyFee";
      },
      {
        readonly type: "uint256";
        readonly name: "maxResalePrice";
      }
    ];
    readonly outputs: readonly [];
  },
  PrepareTransactionOptions
>;

type CreateMarketTicketResult = {
  success: boolean;
  message: string;
  transaction?: PreparedCreateMarketTicket;
};

export const createMarketTicket = async ({
  eventId,
  tokenId,
  nftContract,
  purchaseLimit,
  totalSupply,
  price,
  royaltyFee,
  maxResalePrice,
}: {
  eventId: bigint;
  tokenId: bigint;
  nftContract: string;
  purchaseLimit: bigint;
  totalSupply: bigint;
  price: bigint;
  royaltyFee: bigint;
  maxResalePrice: bigint;
}): Promise<CreateMarketTicketResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function createMarketTicket(uint256 eventId, uint256 tokenId, address nftContract, uint256 purchaseLimit, uint256 totalSupply, uint256 price, uint256 royaltyFee, uint256 maxResalePrice)",
      params: [
        eventId,
        tokenId,
        nftContract,
        purchaseLimit,
        totalSupply,
        price,
        royaltyFee,
        maxResalePrice,
      ],
    });

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

type PreparedAddMoreTickets = PreparedTransaction<
  Abi,
  {
    readonly name: "addMoreTicketsToMarket";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "address";
        readonly name: "nftContract";
      },
      {
        readonly type: "uint256";
        readonly name: "tokenId";
      },
      {
        readonly type: "uint256";
        readonly name: "amount";
      }
    ];
    readonly outputs: readonly [];
  },
  PrepareTransactionOptions
>;

type AddMoreTicketsResult = {
  success: boolean;
  message: string;
  transaction?: PreparedAddMoreTickets;
};

export const addMoreTicketsFn = async ({
  nftContract,
  tokenId,
  amount,
}: {
  nftContract: string;
  tokenId: bigint;
  amount: bigint;
}): Promise<AddMoreTicketsResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function addMoreTicketsToMarket(address nftContract, uint256 tokenId, uint256 amount)",
      params: [nftContract, tokenId, amount],
    });
    return {
      success: true,
      message: "Tickets Added Successfully",
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

type PreparedBuyTicket = PreparedTransaction<
  Abi,
  {
    readonly name: "buyTicket";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [
      {
        readonly type: "address";
        readonly name: "nftContract";
      },
      {
        readonly type: "uint256";
        readonly name: "tokenId";
      },
      {
        readonly type: "uint256";
        readonly name: "amount";
      }
    ];
    readonly outputs: readonly [];
  },
  PrepareTransactionOptions
>;

type BuyTicketResult = {
  success: boolean;
  message: string;
  transaction?: PreparedBuyTicket;
};

export const buyTicketFn = async ({
  nftContract,
  tokenId,
  amount,
}: {
  nftContract: string;
  tokenId: bigint;
  amount: bigint;
}): Promise<BuyTicketResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function buyTicket(address nftContract, uint256 tokenId, uint256 amount) payable",
      params: [nftContract, tokenId, amount],
    });
    return {
      success: true,
      message: "Tickets Added Successfully",
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

type PreparedBuyResaleTicket = PreparedTransaction<
  Abi,
  {
    readonly name: "buyResaleTicket";
    readonly type: "function";
    readonly stateMutability: "payable";
    readonly inputs: readonly [
      {
        readonly type: "address";
        readonly name: "nftContract";
      },
      {
        readonly type: "uint256";
        readonly name: "_resaleId";
      }
    ];
    readonly outputs: readonly [];
  },
  PrepareTransactionOptions
>;

type BuyResaleTicketResult = {
  success: boolean;
  message: string;
  transaction?: PreparedBuyResaleTicket;
};

export const buyResaleTicketFn = async ({
  nftContract,
  _resaleId,
}: {
  nftContract: string;
  _resaleId: bigint;
}): Promise<BuyResaleTicketResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function buyResaleTicket(address nftContract, uint256 _resaleId) payable",
      params: [nftContract, _resaleId],
    });
    return {
      success: true,
      message: "Tickets Added Successfully",
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

type PreparedListOnResale = PreparedTransaction<
  Abi,
  {
    readonly name: "listOnResale";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "address";
        readonly name: "nftContract";
      },
      {
        readonly type: "uint256";
        readonly name: "_tokenId";
      },
      {
        readonly type: "uint256";
        readonly name: "price";
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

type ListOnResaleResult = {
  success: boolean;
  message: string;
  transaction?: PreparedListOnResale;
};

export const listOnResaleFn = async ({
  nftContract,
  _tokenId,
  price,
}: {
  nftContract: string;
  _tokenId: bigint;
  price: bigint;
}): Promise<ListOnResaleResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function listOnResale(address nftContract, uint256 _tokenId, uint256 price) returns (uint256)",
      params: [nftContract, _tokenId, price],
    });
    return {
      success: true,
      message: "Tickets Listed Successfully",
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

export type PreparedValidateTicket = PreparedTransaction<
  Abi,
  {
    readonly name: "validateTicket";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [
      {
        readonly type: "address";
        readonly name: "nftContract";
      },
      {
        readonly type: "uint256";
        readonly name: "tokenId";
      },
      {
        readonly type: "bytes32";
        readonly name: "hash";
      },
      {
        readonly type: "uint8";
        readonly name: "v";
      },
      {
        readonly type: "bytes32";
        readonly name: "r";
      },
      {
        readonly type: "bytes32";
        readonly name: "s";
      }
    ];
    readonly outputs: readonly [
      {
        readonly type: "address";
      }
    ];
  },
  PrepareTransactionOptions
>;

type ValidateTicketResult = {
  success: boolean;
  message: string;
  transaction?: PreparedValidateTicket;
};

export const validateTicketFn = async ({
  nftContract,
  tokenId,
  hash,
  v,
  r,
  s,
}: {
  nftContract: string;
  tokenId: bigint;
  hash: `0x${string}`;
  v: number;
  r: `0x${string}`;
  s: `0x${string}`;
}): Promise<ValidateTicketResult> => {
  try {
    const transaction = prepareContractCall({
      contract: NFTTicketContract,
      method:
        "function validateTicket(address nftContract, uint256 tokenId, bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address)",
      params: [nftContract, tokenId, hash, v, r, s],
    });
    return {
      success: true,
      message: "Tickets Validated Successfully",
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
export const marketTicketCreated = prepareEvent({
  signature:
    "event MarketTicketCreated(uint256 indexed tokenId, uint256 indexed eventId, uint256 price, uint256 purchaseLimit, uint256 totalSupply, uint256 royaltyFee, uint256 maxResalePrice)",
});

export const resaleTicketCreated = prepareEvent({
  signature:
    "event ResaleTicketCreated(uint256 indexed resaleId, uint256 indexed tokenId, address seller, uint256 resalePrice, bool sold)",
});

export const ticketValidated = prepareEvent({
  signature:
    "event TicketValidated(uint256 indexed tokenId, address ownerAddress)",
});

// Get Functions
export const getEventTicketsFn = (nftContract: string) => {
  return {
    contract: NFTTicketContract,
    method:
      "function getMyTickets(address nftContract) view returns ((uint256 tokenId, uint256 eventId, uint256 price, uint256 purchaseLimit, uint256 totalSupply, uint256 royaltyFee, uint256 maxResalePrice)[])",
    params: [nftContract],
  };
};

export const getResaleTicketsFn = (_tokenId: bigint) => {
  return {
    contract: NFTTicketContract,
    method:
      "function getResaleTickets(uint256 _tokenId) view returns ((uint256 resaleId, uint256 tokenId, address seller, uint256 resalePrice, bool sold)[])",
    params: [_tokenId],
  };
};

export const supportsInterfaceFn = (interfaceId: `0x${string}`) => {
  return {
    contract: NFTTicketContract,
    method:
      "function supportsInterface(bytes4 interfaceId) view returns (bool)",
    params: [interfaceId],
  };
};
